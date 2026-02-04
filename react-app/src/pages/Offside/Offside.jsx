import { useState } from 'react';
import styles from './Offside.module.css';

const Offside = () => {
  const [currentClip, setCurrentClip] = useState(1);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);

  // Correct answers array (0 = onside, 1 = offside)
  const correctAnswers = [0,0,1,0,0,0,1,0,1,0,0,1,0,1,1,0,1,1,1,0,1,0,0,0,0];

  const handleAnswer = (answer) => {
    if (currentClip > 25) return;

    const newAnswers = [...userAnswers, answer];
    setUserAnswers(newAnswers);

    if (currentClip === 25) {
      setQuizComplete(true);
    } else {
      setCurrentClip(currentClip + 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAnswers[i] === correctAnswers[i]) {
        correct++;
      }
    }
    return correct;
  };

  const getPercentage = () => {
    return Math.floor((calculateScore() / 25) * 100);
  };

  const resetQuiz = () => {
    setCurrentClip(1);
    setUserAnswers([]);
    setQuizComplete(false);
  };

  const renderResults = () => {
    return (
      <div className={styles.results}>
        <div className={styles.summary}>
          <h3>{calculateScore()}/25 Correct ({getPercentage()}%)</h3>
        </div>
        <div className={styles.resultTable}>
          <h4>Detailed Results:</h4>
          {correctAnswers.map((correctAnswer, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === correctAnswer;
            return (
              <div key={index} className={`${styles.resultRow} ${isCorrect ? styles.correct : styles.incorrect}`}>
                <span className={styles.clipNumber}>Clip {index + 1}:</span>
                <span className={styles.userChoice}>
                  {userAnswer === 0 ? 'Onside' : 'Offside'}
                </span>
                <span className={styles.result}>
                  {isCorrect ? '✓ Correct' : '✗ Wrong'}
                </span>
                <span className={styles.correctAnswer}>
                  (Correct: {correctAnswer === 0 ? 'Onside' : 'Offside'})
                </span>
              </div>
            );
          })}
        </div>
        <button onClick={resetQuiz} className="btn btn-primary mt-3">
          Try Again
        </button>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Offside Position Quiz</h1>
        <p>
          If <strong>any</strong> player is in an offside position when the ball is kicked,<br />
          choose "Offside Position". No pausing. Results at the end.
        </p>
        <p className={styles.attribution}>Created by Aaron Feleke</p>
      </div>

      <div className={styles.content}>
        {!quizComplete ? (
          <div className={styles.quiz}>
            <div className={styles.questionHeader}>
              <h3>Clip {currentClip} of 25</h3>
            </div>
            
            <div className={styles.buttonContainer}>
              <button 
                className={`${styles.button} ${styles.onsideButton}`}
                onClick={() => handleAnswer(0)}
              >
                <img src="/assets/checkmark.png" alt="checkmark" height="15" />
                Onside Position
              </button>
              
              <button 
                className={`${styles.button} ${styles.offsideButton}`}
                onClick={() => handleAnswer(1)}
              >
                <img src="/assets/flag.png" alt="flag" height="15" />
                Offside Position
              </button>
            </div>
          </div>
        ) : (
          renderResults()
        )}
      </div>

      <div className={styles.videoContainer}>
        <iframe 
          width="100%" 
          height="400" 
          src="https://www.youtube-nocookie.com/embed/3Bkv6Rly4kE?controls=0" 
          title="Offside Quiz Video" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      </div>

      <div className={styles.instructions}>
        <h3>How to Use This Quiz</h3>
        <ol>
          <li>Watch each clip in the video above carefully</li>
          <li>Determine if any attacking player is in an offside position when the ball is played</li>
          <li>Click your answer: "Onside Position" or "Offside Position"</li>
          <li>Continue through all 25 clips</li>
          <li>Review your results at the end</li>
        </ol>
        
        <div className={styles.offsideRules}>
          <h4>Offside Rule Reminder:</h4>
          <p>
            A player is in an offside position if they are nearer to the opponent's goal line 
            than both the ball and the second-last opponent when the ball is played by a teammate, 
            unless they are in their own half of the field.
          </p>
          <p>
            <strong>Note:</strong> Being in an offside position is only an offense if the player 
            is actively involved in play, gains an advantage, or interferes with an opponent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offside;