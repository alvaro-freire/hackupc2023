export interface IAnswer {
    text: string;
    isCorrect: boolean;
}

export interface IQuestion {
    text: string;
    answers: Array<IAnswer>;
}

export const QuizQuestions: Array<IQuestion> = [
    {
        text: '¿En que año naci?',
        answers: [
            {
                text: '2011',
                isCorrect: false
            },
            {
                text: '2002',
                isCorrect: true
            },
            {
                text: '1896',
                isCorrect: false
            }
        ]
    },
    {
        text: '¿Cual es mi nombre?',
        answers: [
            {
                text: 'Mateo',
                isCorrect: true
            },
            {
                text: 'Jorge',
                isCorrect: false
            },
            {
                text: 'Leo',
                isCorrect: false
            }
        ]
    },
    {
        text: '¿Cuantos años tengo?',
        answers: [
            {
                text: '106',
                isCorrect: false
            },
            {
                text: '13',
                isCorrect: false
            },
            {
                text: '21',
                isCorrect: true
            }
        ]
    }
]