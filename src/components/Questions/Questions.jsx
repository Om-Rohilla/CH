import React from 'react';
import './Questions.css';

const Questions = ({ questions, solvedWords }) => {
  return (
    <div className="questions-container">
      <h2 className="questions-title">Plant Questions</h2>
      <div className="questions-list">
        {questions.map((q) => (
          <div
            key={q.id}
            className={`question-item ${solvedWords.includes(q.id) ? 'solved' : ''}`}
          >
            <span className="question-number">{q.id}</span>
            <div className="question-content">
              <p className="question-text">{q.question}</p>
              {solvedWords.includes(q.id) && (
                <p className="answer-text">Answer: {q.answer}</p>
              )}
            </div>
            {solvedWords.includes(q.id) && (
              <div className="solved-overlay">
                <span className="solved-text">✓</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;