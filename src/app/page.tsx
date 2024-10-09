"use client"
import { SetStateAction, useState } from "react";

export default function Home() {
  const [messageHi, setMessageHi] = useState('');
  const [messageHello, setMessageHello] = useState('');

  const messagesHi = [
    {
      id: 1,
      message: "hi there",
    },
    {
      id: 2,
      message: "good to know.",
    },
  ];

  const messagesHello = [
    {
      id: 1,
      message: "hello!",
    },
    {
      id: 2,
      message: "How are you?",
    },
  ];

  const combinedMessages = [...messagesHi, ...messagesHello];

  function handleSubmitLeft(event: { preventDefault: () => void; }) {
    console.log(messageHi);
    setMessageHi('');
  }

  function handleChangeLeft(event: { target: { value: SetStateAction<string>; }; }) {
    setMessageHi(event.target.value);
  }

  function handleSubmitRight(event: { preventDefault: () => void; }) {
    console.log(messageHello);
    setMessageHello('');
  }

  function handleChangeRight(event: { target: { value: SetStateAction<string>; }; }) {
    setMessageHello(event.target.value);
  }

  return (
    <div className="flex flex-col min-h-screen bg-black justify-center items-center text-center p-10">

      <div className="basis-1/4 mb-6">
        <h1 className="font-formulaLight tracking-widest text-5xl text-white">
          chat with yourself
        </h1>
      </div>

      <div className="basis-1/4 font-formulaLight text-center justify-center items-center text-3xl text-white">
      <div className="flex flex-col items-start space-y-4 my-4 w-full">
            {combinedMessages.map((msg) => (
              <div key={msg.id}>
                <p className={`p-2`}>
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
      </div>

      <div className="flex flex-row flex-1 min-w-full justify-center items-center gap-6">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="font-formulaLight tracking-widest text-8xl text-white">hello</h1>
          <input
            className="font-formulaLight tracking-widest text-4xl text-white bg-transparent outline-none p-2"
            onChange={handleChangeLeft}
            placeholder="Enter a message here"
            value={messageHi}
          />
          <button
            className="font-formulaLight tracking-widest text-4xl text-gray-500 hover:text-gray-800 mt-4"
            onClick={handleSubmitLeft}
          >
            send message
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center text-center">
          <h1 className="font-formulaLight tracking-widest text-8xl text-white">hi</h1>
          <input
            className="font-formulaLight tracking-widest text-4xl text-white bg-transparent outline-none p-2"
            onChange={handleChangeRight}
            placeholder="Enter a message here"
            value={messageHello}
          />
          <button
            className="font-formulaLight tracking-widest text-4xl text-gray-500 hover:text-gray-800 mt-4"
            onClick={handleSubmitRight}
          >
            send message
          </button>
        </div>
      </div>
    </div>
  );
};
