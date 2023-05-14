'use client'

import { useCallback, useEffect, useState, useMemo } from "react";
import useCredentials from "@/hooks/useCredentials";
import Link from "next/link";
import Image from 'next/image';
import { IQuestion } from "@/migrations/quiz.data";

const Quiz = () => {
    const credentials = useCredentials();

    const [score, setScore] = useState(0);
    const [position, setPosition] = useState(0);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [questionId, setQuestionId] = useState(0);
    const [wasAnswered, setWasAnswered] = useState(false);
    const [wasCorrect, setWasCorrect] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [correct, setCorrect] = useState('');

    const getQuestions = useCallback(async (token: string) => {
        try {
            const response = await fetch('http://localhost:8080/quiz', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                setQuestions([]);
            }
            const json = await response.json();
            setQuestions(() => json);
        } catch {
            setQuestions([]);
        }
    }, []);

    useEffect(() => {
        if (credentials.token) {
            getQuestions(credentials.token);
        }
    }, [getQuestions, credentials.token]);

    const handleNextQuestion = () => {
        if (questions) {
            if (questionId <= questions?.length) {
                setQuestionId(questionId + 1);
                setWasAnswered(false);
                setWasCorrect(false);
                setCorrect('');
            }
        }
    };

    const getAnswer = (answer: string) => {
        return fetch(`http://localhost:8080/quiz/${questionId + 1}`, {
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
        if (!wasAnswered) {
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
                setPosition(Number(position));
            }).catch((e) => {
                console.log(e.message);
            });
        }
    }

    const question = useMemo(() => {
        if (questions.length === 0 || !questions[questionId]) {
            return {
                text: 'No hay preguntas disponibles',
                answers: []
            };
        }

        return questions[questionId];
    }, [questions, questionId]);

    return (
        <div className="flex flex-col justify-center items-center my-3">
            <div className="flex flex-row justify-evenly items-center w-full">
                <span className="flex items-center justify-center gap-2 text-2xl">
                    <Image src="/icons/leaderboard.svg" height={20} width={20} alt="leaderboard_icon" />
                    {position}
                </span>
                <span className="flex items-center justify-center gap-2 text-2xl">
                    <Image src="/icons/star.svg" height={20} width={20} alt="leaderboard_star_icon" />
                    {score} pts
                </span>
            </div>
            <h1 className="text-2xl m-5">{question.text}</h1>
            <div className="flex flex-col justify-center items-center w-full px-5">
                {question.answers &&
                    question.answers.map((answer, idx) => (
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
                {questionId !== questions.length - 1 &&
                    <button onClick={() => handleNextQuestion()} className="text-m h-10 w-full my-2 bg-[#fd0] border-[#e0c308] border-2">Next question</button>
                }
                {questionId === questions.length - 1 &&
                    <Link href="/ranking" className="flex justify-center items-center text-m h-10 w-full my-2 bg-[#fd0] border-[#e0c308] border-2">
                        <button>Finish quiz</button>
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
