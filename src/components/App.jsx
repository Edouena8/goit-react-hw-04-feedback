import { useState } from "react";
import FeedbackOptions from "./FeedbackOptions";
import Statistics from "./Statistics";
import Section from "./Section";
import Notification from "./Notification";

export default function App() {

  const [state, setState] = useState({
      good: 0,
      neutral: 0,
      bad: 0,
  });

  const handleGoodFeedback = value => {
    setState(prevState => ({ 
      ...prevState, 
      [value]: prevState[value] + 1,
    }))
  };

  const countTotalFeedback = () => {
    return Object.values(state).reduce((value, acc) => acc += value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round(state.good * 100 / countTotalFeedback() || 0);
  }

  return (
    <div
    style={{
      height: '100vh',
      display: 'flex-start',
      padding: '40px',
      flexDirection: 'column',
      gap: '40px',
      color: '#010101',
    }}>
      <Section title="Please leave feedback">
        <FeedbackOptions  
          options={Object.keys(state)} 
          onLeaveFeedback={handleGoodFeedback}
        />
      </Section>

      <Section title='Statistics'>
        {!countTotalFeedback() ? ( 
           <Notification message="There is no feedback"/>
          ) : (
          <Statistics 
            good={state.good} 
            neutral={state.neutral} 
            bad={state.bad} 
            total={countTotalFeedback()} 
            positivePercentage={countPositiveFeedbackPercentage()}
          />
          ) 
        } 
      </Section>
    </div>
  );
};

