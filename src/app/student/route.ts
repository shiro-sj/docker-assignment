import prisma from "../../lib/db"; 
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { studentID, studentName, course } = data;

    // Check if a student with the same studentID already exists
    const existingStudent = await prisma.student.findUnique({
      where: {
        studentID: studentID,
      },
    });

    if (existingStudent) {
      return NextResponse.json(
        { message: "Student already exists" },
        { status: 409 }
      );
    }

    // Create a new student record
    const newStudent = await prisma.student.create({
      data: {
        studentID: studentID,
        name: studentName,
        course: course,
      },
    });

    return NextResponse.json(
      { message: "Student created successfully", student: newStudent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { message: "Failed to create student" },
      { status: 500 }
    );
  }
}
