import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import prisma from "@/utils/db";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    // إنشاء مجلد public/uploads إذا لم يكن موجود
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // جلب الصور الحالية من قاعدة البيانات
    const customer = await prisma.customer.findUnique({
      where: { id: parseInt(params.id) },
      select: { photo: true },
    });

    // إذا كان هناك صور سابقة استخدمها، وإلا أنشئ array جديد
   const photos: string[] = Array.isArray(customer?.photo)
  ? customer.photo.filter((p): p is string => typeof p === "string")
  : [];

    // التعامل مع كل الملفات
    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // اسم ملف آمن
      const safeName = file.name
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "");

      const filePath = path.join(uploadDir, safeName);
      await writeFile(filePath, buffer);

      photos.push(`/uploads/${safeName}`);
    }

    // تحديث قاعدة البيانات بالقائمة الجديدة
    await prisma.customer.update({
      where: { id: parseInt(params.id) },
      data: { photo: photos },
    });

    // إرجاع كل الصور
    return NextResponse.json({ photos });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
