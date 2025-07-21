import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initialState, quizReducer } from './reducer';
import Home from './components/Home';
import Quiz from './components/Quiz';
import History from './components/History';

export const QuizContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <>
      <QuizContext.Provider value={{ state, dispatch }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </Router>
        <footer>
          <p>COPYRIGHT MAHAVEER SINGH 2025</p>
          <p>© 2025 Mahaveer Singh. All rights reserved.</p>
        </footer>
      </QuizContext.Provider>
    </>
  );
}

export default App; 