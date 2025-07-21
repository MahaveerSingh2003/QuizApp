import React, { useContext } from 'react';
import { QuizContext } from '../App';

const History = () => {
  const { state } = useContext(QuizContext);
  const { history } = state;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((attempt, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold">{attempt.quizName}</h2>
            <p>Score: {attempt.score}</p>
            <p>Questions Attempted: {attempt.questionsAttempted}</p>
            <p>Time Taken: {attempt.timeTaken} minutes</p>
            <p>Date: {new Date(attempt.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History; 