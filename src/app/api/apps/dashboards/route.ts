import { CreateCustomerDto } from "@/utils/dio";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { customer_PER_PAGE } from "@/utils/constants";
/**
 *  @method  POST
 *  @route   ~/api/users/login
 *  @desc    Login User [(Log In) (Sign In) (تسجیل الدخول)]
 *  @access  public
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // بيانات العميل
    const customerData = JSON.parse(formData.get("customer") as string);

    // الملفات
    const files = formData.getAll("files") as File[];

    // مجلد الرفع
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    // مسارات الملفات
    const uploadedFiles: string[] = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // اسم آمن
      const safeName = file.name
        .replace(/\s+/g, "_")
        .replace(/[^a-zA-Z0-9._-]/g, "");
      const filePath = path.join(uploadDir, safeName);

      await writeFile(filePath, buffer);

      uploadedFiles.push(`/uploads/${safeName}`);
    }

    const newCustomer = await prisma.customer.create({
      data: {
        customer: customerData,
        photo: uploadedFiles.length > 0 ? uploadedFiles : [], // تخزن الاسم مبدئياً (أو ترفعه لسيرفر/Cloud Storage)
        website: customerData.website ?? undefined,
        apps: customerData.apps ?? undefined,
        marketing: customerData.marketing ?? undefined,
        seo: customerData.seo ?? undefined,
        ai: customerData.ai ?? undefined,
        website_ai_complate: customerData.website_ai_complate ?? undefined,
        apps_ai_complate: customerData.apps_ai_complate ?? undefined,
        markiting_ai_complate: customerData.markiting_ai_complate ?? undefined,
        seo_ai_complate: customerData.seo_ai_complate ?? undefined,
        ai_complate: customerData.ai_complate ?? undefined,
        notes: customerData.notes ?? undefined,
      },
    });

    return NextResponse.json(
      { message: `created customer ${newCustomer.id}` },
      { status: 200 }
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { message: `internal server error: ${message}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateCustomerDto;

    const updateCustomer = await prisma.customer.update({
      where: { id: body.id },
      data: {
        website: body.website ?? undefined,
        apps: body.apps ?? undefined,
        marketing: body.marketing ?? undefined,
        seo: body.seo ?? undefined,
        ai: body.ai ?? undefined,
      },
    });

    return NextResponse.json(
      { message: `Updated customer ${updateCustomer}` },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error : ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = (await request.json()) as { id: number };

    const deletedCustomer = await prisma.customer.delete({
      where: { id: body.id },
    });

    return NextResponse.json(
      { message: `Deleted customer with id ${deletedCustomer.id}` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const customers = await prisma.customer.findMany({
      skip: customer_PER_PAGE * (parseInt(pageNumber) - 1),
      take: customer_PER_PAGE,
      orderBy: { created_at: "desc" },
    });

    //return Response.json(customers, { status: 200 })
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `internal server error ${error}` },
      { status: 500 }
    );
  }
}
