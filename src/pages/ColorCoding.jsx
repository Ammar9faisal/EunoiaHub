import React from 'react';
import { useQuestionnaireContext } from './QuestionnaireContext';  // Import the context

const ColorCoding = () => {
  const { surveyResult } = useQuestionnaireContext();  // Access the survey result from context

  const getColor = () => {
    if (surveyResult === 'Anxiety') {
      return 'dashboard-green';  
    } else if (surveyResult === 'Addiction') {
      return 'dashboard-orange';    
    } else if (surveyResult === 'Depression') {
      return 'dashboard-purple';   
    } else {
      return 'dashboard-white'; // Default color
    }
  };

  return (
    <div className={`dashboard ${getColor()}`}>
      {/* Render your dashboard here */}
    </div>
  );
};

export default ColorCoding;
