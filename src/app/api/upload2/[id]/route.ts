import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import prisma from "@/utils/db";

// نوع دقيق لـ photoSection
type PhotoSection = Record<string, { urls: string[]; notes?: string }>;

export async function POST(
  req: Request,
  context: any
) {
  try {
    const formData = await req.formData();

    // 🖼️ الملفات من الفرونت
    const files = formData.getAll("files") as File[];
    const columnId = formData.get("columnId")?.toString() || "default";

    // 📝 معالجة الملاحظات
    let notes = "";
    const rawNote = formData.get("note");
    if (rawNote) {
      try {
        const parsed = JSON.parse(rawNote.toString());
        notes = typeof parsed === "string" ? parsed : JSON.stringify(parsed);
      } catch {
        notes = rawNote.toString();
      }
    }

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No files uploaded" },
        { status: 400 }
      );
    }

    // 📂 مجلد التخزين
    const uploadDir = path.join(process.cwd(), "public", "uploads", columnId);
    await mkdir(uploadDir, { recursive: true });

    // 👤 جلب العميل من قاعدة البيانات
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(context.params.id) },
      select: { photoSection: true },
    });

    // 📦 تجهيز الكائن photos بدون استخدام any
    let photos: PhotoSection = {};
    if (customer?.photoSection) {
      if (typeof customer.photoSection === "string") {
        try {
          photos = JSON.parse(customer.photoSection) as PhotoSection;
        } catch {
          photos = {}; // fallback إذا JSON غير صالح
        }
      } else {
        photos = customer.photoSection as PhotoSection;
      }
    }

    // إنشاء entry جديد إذا لم يكن موجود
    if (!photos[columnId]) photos[columnId] = { urls: [], notes: "" };

    // 📥 رفع الملفات وإضافة روابطها
    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const safeName = file.name
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "");
      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);

      photos[columnId].urls.push(`/uploads/${columnId}/${safeName}`);
    }

    // 📝 حفظ الملاحظات
    photos[columnId].notes = notes;

    // 💾 تحديث قاعدة البيانات
    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(params.id) },
      data: {
        photoSection:
          typeof customer?.photoSection === "string"
            ? JSON.stringify(photos)
            : photos,
      },
    });

    return NextResponse.json({ photos: updatedCustomer.photoSection });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
