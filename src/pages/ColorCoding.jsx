import React from 'react';
import { useQuestionnaireContext } from './QuestionnaireContext';  // Import the context

const ColorCoding = () => {
  const { surveyResult } = useQuestionnaireContext();  // Access the survey result from context

  const getColor = () => {
    if (surveyResult === 'Anxiety') {
      return 'green';  
    } else if (surveyResult === 'Addiction') {
      return 'purple';    
    } else if (surveyResult === 'Depression') {
      return 'orange';   
    } else {
      return 'default'; // Default color
    }
  };

  return (
    <div className={`dashboard ${getColor()}`}>
      {/* Render your dashboard here */}
    </div>
  );
};

export default ColorCoding;
