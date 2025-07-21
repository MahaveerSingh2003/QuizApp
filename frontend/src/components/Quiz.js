import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../App';

const Quiz = () => {
    const { state, dispatch } = useContext(QuizContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        let interval;
        if (state.isActive && state.time > 0) {
            interval = setInterval(() => {
                dispatch({ type: 'TICK' });
            }, 1000);
        } else if (state.time === 0 && !state.isComplete) {
            // Auto-submit when time runs out
            dispatch({ type: 'SELECT_ANSWER', payload: null });
        }
        return () => clearInterval(interval);
    }, [state.isActive, state.time, dispatch]);

    // Start timer when question changes
    useEffect(() => {
        if (!state.isComplete && state.questions.length > 0) {
            dispatch({ type: 'SET_ACTIVE', payload: true });
        }
    }, [state.currentQuestionIndex, state.questions.length, dispatch]);

    const fetchQuestions = async () => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await fetch('http://localhost/quiz-app/backend/fetch_questions.php');
            const data = await response.json();
            console.log('API Response:', data); // Debug log

            if (!data.questions || data.questions.length === 0) {
                throw new Error('No questions found in the response');
            }

            let filteredQuestions = data.questions;

            // Filter questions based on category and difficulty
            if (state.category !== 'All') {
                filteredQuestions = filteredQuestions.filter(q => q.category.toLowerCase() === state.category.toLowerCase());
            }
            if (state.difficulty !== 'All') {
                filteredQuestions = filteredQuestions.filter(q => q.difficulty.toLowerCase() === state.difficulty.toLowerCase());
            }

            console.log('Filtered Questions:', filteredQuestions); // Debug log

            if (filteredQuestions.length === 0) {
                // If no questions match the filters, use all questions
                dispatch({ type: 'SET_QUESTIONS', payload: data.questions });
            } else {
                dispatch({ type: 'SET_QUESTIONS', payload: filteredQuestions });
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch questions. Please try again.' });
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const handleAnswerSelect = (answerIndex) => {
        if (state.selectedAnswer === null) {
            dispatch({ type: 'SELECT_ANSWER', payload: answerIndex });
        }
    };

    const handleNext = () => {
        dispatch({ type: 'NEXT_QUESTION' });
    };

    const handleRestart = () => {
        dispatch({ type: 'RESET_QUIZ' });
        navigate('/');
    };

    if (state.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="app-container p-8 text-center">
                    <div className="text-2xl text-indigo-800 animate-pulse">Loading questions...</div>
                </div>
            </div>
        );
    }

    if (state.error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="app-container p-8 text-center">
                    <div className="text-2xl text-red-600 mb-4">{state.error}</div>
                    <button
                        onClick={fetchQuestions}
                        className="next-button px-6 py-2 rounded-lg"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (state.isComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="quiz-card p-8 text-center transform transition-all duration-500 hover:scale-105">
                    <h2 className="text-3xl font-bold mb-4 text-indigo-800">Quiz Complete!</h2>
                    <p className="text-xl mb-4 text-indigo-700">
                        Your score: {state.score} out of {state.questions.length}
                    </p>
                    <button
                        onClick={handleRestart}
                        className="next-button px-6 py-2 rounded-lg"
                    >
                        Try Another Quiz
                    </button>
                </div>
            </div>
        );
    }

    if (state.questions.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="app-container p-8 text-center">
                    <div className="text-2xl text-indigo-800">No questions available.</div>
                </div>
            </div>
        );
    }

    console.log('Current Question Index:', state.currentQuestionIndex);
    console.log('Questions:', state.questions);

    const currentQuestion = state.questions[state.currentQuestionIndex];

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="quiz-card p-8 w-full max-w-2xl transform transition-all duration-500">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-indigo-800">
                        Question {state.currentQuestionIndex + 1} of {state.questions.length}
                    </h2>
                    <div className="text-xl font-semibold text-indigo-700">
                        Time: <span className={state.time <= 10 ? 'text-red-500' : 'text-indigo-700'}>
                            {state.time}s
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-xl text-indigo-800">{currentQuestion.question}</p>
                    <div className="mt-2 flex gap-2">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                            {currentQuestion.category}
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm capitalize">
                            {currentQuestion.difficulty}
                        </span>
                    </div>
                </div>

                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`option-button w-full p-4 text-left rounded-lg transition-all duration-300 text-black ${
                                state.selectedAnswer === null
                                    ? 'bg-indigo-100 hover:bg-indigo-200'
                                    : state.selectedAnswer === index
                                    ? index === currentQuestion.correctAnswer
                                        ? 'correct-answer'
                                        : 'wrong-answer'
                                    : index === currentQuestion.correctAnswer
                                    ? 'correct-answer'
                                    : 'bg-indigo-100'
                            }`}
                            disabled={state.selectedAnswer !== null}
                        >
                            {option}
                        </button>
                    ))}
                </div>

                {state.selectedAnswer !== null && (
                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={handleNext}
                            className="next-button px-6 py-2 rounded-lg"
                        >
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz; 