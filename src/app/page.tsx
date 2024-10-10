'use client';
import { useState, useCallback } from 'react';
import Students from '../components/Students'; 

export default function Home() {
  const [studentID, setStudentID] = useState('');
  const [studentName, setStudentName] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
        const responseData = await response.json();
        console.log(responseData.message);
        
        alert('Student created successfully!');
        setStudentID('');
        setStudentName('');
        setCourse('');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error submitting student:', error);
      alert('Something went wrong. Please try again.');
    }
  }, [studentID, studentName, course]);
  
  

  return (
    <div className="font-formulaLight flex flex-col min-h-screen bg-black justify-center items-center text-center p-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="tracking-widest text-5xl text-white mb-6">
          create a student
        </h1>
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
