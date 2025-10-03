import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { CustomerDto, ValueObject } from "@/utils/dio";

type CustomerJsonFields = Pick<
  CustomerDto,
  "website" | "apps" | "marketing" | "seo" | "ai"
>;

export async function GET(
  request: NextRequest,
   { params }: { params: { id: string } } // params هنا تأتي من App Router
) {
  try {
    const id = parseInt(params.id); // تحويل string إلى number
    const customers = await prisma.customer.findMany({
      where: { id },
      orderBy: { created_at: "desc" },
    });

    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = parseInt(context.params.id);
    const body = await request.json();
    const { obj, columnId, subkey } = body;

    const fieldKey = obj as keyof CustomerJsonFields;

    const existingCustomer = await prisma.customer.findUnique({ where: { id } });
    if (!existingCustomer) {
      return NextResponse.json({ message: "Customer not found" }, { status: 404 });
    }

    const oldData: ValueObject =
      typeof existingCustomer[fieldKey] === "object" && existingCustomer[fieldKey] !== null
        ? (existingCustomer[fieldKey] as ValueObject)
        : {};

    const updatedObj: ValueObject = { ...oldData };

    if (subkey) {
      const columnObj = (updatedObj[columnId] as ValueObject) ?? {};
      const currentVal: [boolean, number] = (columnObj[subkey] as [boolean, number]) ?? [true, 0];
      updatedObj[columnId] = { ...columnObj, [subkey]: [true, currentVal[1] === 0 ? 1 : 0] };
    } else {
      const currentVal: number = (updatedObj[columnId] as number) ?? 0;
      updatedObj[columnId] = currentVal === 0 ? 1 : 0;
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: { [fieldKey]: updatedObj },
    });

    return NextResponse.json({ message: "Updated successfully", customer }, { status: 200 });
  } catch (error: unknown) {
    console.error("PUT API Error:", error);
    return NextResponse.json({ message: "internal server error", error: String(error) }, { status: 500 });
  }
}
