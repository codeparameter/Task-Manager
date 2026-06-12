import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "ایمیل و رمز عبور الزامی است" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "این ایمیل قبلاً ثبت شده است" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json(
      { message: "کاربر با موفقیت ایجاد شد", userId: user.id },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "خطا در ایجاد کاربر" }, { status: 500 });
  }
}
