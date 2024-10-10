"use client"
import { useState, useEffect } from "react";
import prisma from "@/lib/db";

type Student = {
  id: string;
  studentID: string;
  name: string;
  course: string;
  date: Date;
};

export default function Home() {
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');

  const [students, setStudents] = useState<Student[]>([]); 

  const fetchStudents = async () => {
    const response = await prisma.student.findMany();
    setStudents(response);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      studentID,
      studentName,
      course
    };

    try {
      const response = await fetch('/api/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        fetchStudents();
        setStudentID('');
        setStudentName('');
        setCourse('');
      } else {
        console.error('Failed to create student');
      }
    } catch (error) {
      console.error('Error submitting student:', error);
    }
  };

  return (
    <div className="font-formulaLight flex flex-col min-h-screen bg-black justify-center items-center text-center p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="tracking-widest text-5xl text-white mb-6">
          Create a student
        </h1>

        <ul className="my-10 text-center text-white font-formulaLight text-4xl">
          {students.map((student) => (
            <li key={student.studentID}>{student.name}, {student.course}</li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            placeholder="id"
            className="outline-none border-none text-4xl text-white bg-transparent p-2 w-72"
          />
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="name"
            className="outline-none border-none text-4xl text-white bg-transparent p-2 w-72"
          />
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
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
}
