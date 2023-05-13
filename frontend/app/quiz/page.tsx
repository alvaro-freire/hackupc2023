'use client'

import { QuizQuestions } from "@/migrations/QuizQuestions";
import { useState } from "react";

const Quiz = () => {
    const questions = QuizQuestions;
    const [index, setIndex] = useState(0);

    const handleNextQuestion = () => {
        if (index <= questions.length) {
            setIndex(index+1);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center my-3">
            <h1 className="text-2xl m-5">
                {questions[index].text}{questions[index].text}{questions[index].text}
            </h1>
            <div className="flex flex-col justify-center items-center w-full px-5">
                {questions[index].answers && 
                    questions[index].answers.map((answer, idx) => 
                        <button key={idx} className="text-2xl h-14 w-full my-2 bg-[#eeeeee] border-[#dddddd] border-2 rounded"> 
                            {answer.text}
                        </button>
                    )
                }
            </div>
            <div className="flex flex-col justify-center items-center w-full p-5">
                <button onClick={() => handleNextQuestion()} className="text-m h-10 w-full my-2 bg-[#fd0] border-[#e0c308] border-2">Next question</button>
                <button className="text-m h-10 w-full my-2 bg-[#fd0] border-[#e0c308] border-2">View leaderboard</button>
            </div>
        </div>
    )
  }

  export default Quiz;