import { createStudent } from "@/actions/createStudent";
import prisma from "@/lib/db";

export default async function Home() {

  const students = await prisma.student.findMany()


  return (
    <div className="font-formulaLight flex flex-col min-h-screen bg-black justify-center items-center text-center p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="tracking-widest text-5xl text-white mb-6">
          create a student
        </h1>

        <ul className="my-10 text-center text-white font-formulaLight text-4xl">
          {students.map((student)=>(
            <li key={student.id}>{student.name}, {student.course}</li>
          ))}
        </ul>

        <form action={createStudent} method="POST" className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="outline-none border-none text-4xl text-white bg-transparent p-2 w-72"
          />
          <input
            type="text"
            name="course"
            placeholder="course"
            className="outline-none border-none text-4xl text-white bg-transparent p-2 w-72"
          />
          <button
            type="submit"
            className="outline-none border-none text-4xl text-gray-400 bg-transparent p-2 w-72"
          >
            create
          </button>
        </form>
      </div>
    </div>
  );
};
