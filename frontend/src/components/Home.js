import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../App';

const Home = () => {
    const { state, dispatch } = useContext(QuizContext);
    const navigate = useNavigate();

    const categories = ['All', 'Geography', 'Science', 'Art'];
    const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

    const handleStartQuiz = () => {
        navigate('/quiz');
    };

    const handleCategorySelect = (category) => {
        dispatch({ type: 'SET_CATEGORY', payload: category });
    };

    const handleDifficultySelect = (difficulty) => {
        dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="app-container p-8 w-full max-w-2xl">
                <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">Welcome to Quiz App</h1>
                
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-3 text-indigo-700">Select Category</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategorySelect(category)}
                                    className={`category-button p-4 rounded-lg transition-all duration-300 text-black ${
                                        state.category === category ? 'bg-indigo-600 text-white' : 'bg-indigo-100 hover:bg-indigo-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-3 text-indigo-700">Select Difficulty</h2>
                        <div className="grid grid-cols-3 gap-3">
                            {difficulties.map((difficulty) => (
                                <button
                                    key={difficulty}
                                    onClick={() => handleDifficultySelect(difficulty)}
                                    className={`difficulty-button p-4 rounded-lg transition-all duration-300 text-black ${
                                        state.difficulty === difficulty ? 'bg-indigo-600 text-white' : 'bg-indigo-100 hover:bg-indigo-200'
                                    }`}
                                >
                                    {difficulty}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleStartQuiz}
                        className="next-button w-full py-3 rounded-lg text-lg font-semibold"
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home; 