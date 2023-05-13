export interface IQuestion {
    id: number;
    text: string;
    answers: Array<string>;
}

export interface IAnswer {
    result: boolean;
    correct: string;
    position: number;
    points: number;
}

export const QuizAnswer1: IAnswer = {
    result: false,
    correct: '2002',
    position: 5,
    points: 25
}

export const QuizAnswer2: IAnswer = {
    result: true,
    correct: 'Mateo',
    position: 2,
    points: 30
}

export const QuizAnswer3: IAnswer = {
    result: true,
    correct: '21',
    position: 4,
    points: 28
}

export const QuizQuestions: Array<IQuestion> = [
    {
        id: 1,
        text: '¿En que año naci?',
        answers: [
            '2011',
            '2002',
            '1896'
        ]
    },
    {
        id: 2,
        text: '¿Cual es mi nombre?',
        answers: [
            'Mateo',
            'Jorge',
            'Leo'
        ]
    },
    {
        id: 3,
        text: '¿Cuantos años tengo?',
        answers: [
            '106',
            '13',
            '21'
        ]
    }
]