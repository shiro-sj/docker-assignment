"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createStudent(formData: FormData){
    await prisma.student.create({
        data:{
            name:  formData.get("name") as string,
            course: formData.get("course") as string,
        }
    })

    revalidatePath("/");
};