import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("BODY:", body);

    const { customer, id } = body; // ✅ correct for JSON

    const updatecustomer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        customer: customer
      }
    });

    console.log("UPDATED CUSTOMER:", updatecustomer);

    return NextResponse.json({ success: true, data: updatecustomer });
  } catch (err) {
    console.error("PUT Error:", err);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
