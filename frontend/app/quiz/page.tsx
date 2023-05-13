'use client'

import { useCallback, useEffect, useState } from "react";
import useCredentials from "@/hooks/useCredentials";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IQuestion } from "@/migrations/quiz.data";

const Quiz = () => {
    const credentials = useCredentials();
    const router = useRouter();

    const [questions, setQuestions] = useState<Array<IQuestion>>([{
        id: -1,
        text: 'example',
        answers: [],
    }]);
    const [score, setScore] = useState(0);
    const [questionId, setQuestionId] = useState(0);
    const [wasAnswered, setWasAnswered] = useState(false);
    const [wasCorrect, setWasCorrect] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [correct, setCorrect] = useState('');

    const getQuestions = useCallback(() => {
        return fetch('http://localhost:3002/quiz', {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${credentials.token}`
            }
        });
    }, [credentials.token]);

    useEffect(() => {
        const response = getQuestions();
        response.then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 403) {
                router.push('/login');
            }
        }).then((data) => {
            console.log('data', data);
            setQuestions(data);
        }).catch((e) => {
            console.log(e.response.data.statusCode);
            console.log(e.message);
        });
    }, [getQuestions]);


    const handleNextQuestion = () => {
        if (questions) {
            if (questionId <= questions?.length) {
                setQuestionId(questionId+1);
                setWasAnswered(false);
                setWasCorrect(false);
                setCorrect('');
            }
        }
    };

    const getAnswer = (answer: string) => {
        return fetch(`http://localhost:3002/quiz/${questionId+1}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${credentials.token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                answer
            })
        });
    }

    const handleAnswer = async (answer: string, idx: number) => {
        const response = getAnswer(answer);
        response.then((response) => {
            return response.json();
        }).then((data) => {
            const { result, correct, position, points } = data;
            setWasAnswered(true);
            setSelected(idx);
            setWasCorrect(result);
            setCorrect(correct);
            setScore(Number(points));
        }).catch((e) => {
            console.log(e.message);
        });
    }

    return (
        <div className="flex flex-col justify-center items-center my-3">
            <span className="flex items-center justify-center gap-2 text-2xl">
                <Image src="/icons/star.svg" height={20} width={20} alt="leaderboard_star_icon" />
                {score} pts
            </span>
            <h1 className="text-2xl m-5">{questions[questionId].text}</h1>
            <div className="flex flex-col justify-center items-center w-full px-5">
                {questions[questionId].answers &&
                    questions[questionId].answers.map((answer, idx) => (
                        <button 
                            key={`${idx}-${questionId}`}
                            style={{
                                backgroundColor: correct === answer ? '#90EE90' : wasAnswered && selected === idx ? '#FF6347' : '',
                                borderColor: correct === answer ? '#32CD32' : wasAnswered && selected === idx ? '#FF0000' : '',
                            }} 
                            onClick={() => { handleAnswer(answer, idx); }} 
                            className="text-2xl h-14 w-full my-2 bg-[#eeeeee] border-[#dddddd] border-2 rounded"
                          > 
                            {answer}
                        </button>
                    ))
                }
            </div>
            <div className="flex flex-col justify-center items-center w-full p-5">
                {questionId !== questions.length-1 &&
                    <button onClick={() => handleNextQuestion()} className="text-m h-10 w-full my-2 bg-[#fd0] border-[#e0c308] border-2">Next question</button>
                }
                {questionId === questions.length-1 &&
                    <Link href="/ranking" className="flex justify-center items-center text-m h-10 w-full my-2 bg-[#fd0] border-[#e0c308] border-2">
                        <button>Submit score</button>
                    </Link>
                }
                <Link href="/ranking" className="flex justify-center items-center text-m h-10 w-full my-2 bg-[#fd0] border-[#e0c308] border-2">
                    <button>View leaderboard</button>
                </Link>
            </div>
        </div>
    )
  };

  export default Quiz;