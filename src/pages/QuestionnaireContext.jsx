import React, { createContext, useContext, useState } from 'react';

// Create a context
const QuestionnaireContext = createContext();

// Custom hook to use the context
export const useQuestionnaireContext = () => {
  return useContext(QuestionnaireContext);
};

// Provider component to wrap around the app
export const QuestionnaireProvider = ({ children }) => {
  const [surveyResult, setSurveyResult] = useState('');

  const setResult = (result) => {
    setSurveyResult(result);
  };

  return (
    <QuestionnaireContext.Provider value={{ surveyResult, setResult }}>
      {children}
    </QuestionnaireContext.Provider>
  );
};
