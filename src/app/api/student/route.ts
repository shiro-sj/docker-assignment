import prisma from "@/lib/db"; 
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { studentID, studentName, course } = data;

    const existingStudent = await prisma.student.findUnique({
      where: {
        studentID: studentID,
      },
    });

    if (existingStudent) {
      return NextResponse.json(
        { HTTPStatusCode:409,
          message: "Student already exists",
        },
      );
    }

    const newStudent = await prisma.student.create({
      data: {
        studentID: studentID,
        name: studentName,
        course: course,
      },
    });

    return NextResponse.json(
      { HTTPStatusCode: 201,
        message: "Student created successfully", 
        student: newStudent,
       },
      
    );
  } catch (error) {
    console.error("Error creating student:", error);
    return NextResponse.json(
      { HTTPStatusCode: 500,
        message: "Failed to create student" 
      },
    );
  }
}
