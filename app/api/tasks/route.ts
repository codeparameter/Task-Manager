import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

// GET: getting the list of tasks for the current user
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId: session.user.id },
      orderBy: { date: "asc" },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

// POST: creating a new task
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, date, time } = body;

    if (!title || !date || !time) {
      return NextResponse.json(
        { error: "عنوان، تاریخ و زمان الزامی هستند" },
        { status: 400 },
      );
    }

    const task = await prisma.task.create({
      data: {
        id: randomUUID(),
        title,
        description,
        date: new Date(date),
        time,
        userId: session.user.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
