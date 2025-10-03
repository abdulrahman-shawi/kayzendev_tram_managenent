// src/app/api/users/register/route.ts
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma"; // استخدم Singleton PrismaClient كما ذكرت سابقًا
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";
import { createRegisterUserSchema } from "@/utils/validation";
import { RegisterUserDto } from "@/utils/dio";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;

    const validation = createRegisterUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "This user already registered" },
        { status: 400 }
      );
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // إنشاء مستخدم جديد
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });

    const cookie = setCookie({
      id: newUser.id,
      name: newUser.name,
      role: newUser.role,
    });

    return NextResponse.json(
      { message: "Registered & Authenticated", user: newUser },
      { status: 201, 
        headers: { "Set-Cookie": cookie }
       }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { message: `Internal server error: ${error}` },
      { status: 500 }
    );
  }
}
