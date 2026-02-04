import { useState, useEffect, useRef } from 'react';
import styles from './Board.module.css';

const Board = () => {
  const [gameData, setGameData] = useState(null);
  const [showSingle, setShowSingle] = useState(true);
  const [showDouble, setShowDouble] = useState(true);
  const [showFinal, setShowFinal] = useState(true);
  const [autoChooseDD, setAutoChooseDD] = useState(true);
  const [draggedClue, setDraggedClue] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [importText, setImportText] = useState('');

  const fileInputRef = useRef();

  // Initialize with default board structure
  useEffect(() => {
    loadDefaultBoard();
    loadFromLocalStorage();
  }, []);

  const loadDefaultBoard = async () => {
    try {
      const response = await fetch('/assets/board/default.json');
      const defaultData = await response.json();
      setGameData(defaultData);
    } catch (error) {
      console.error('Could not load default board:', error);
      setGameData(createEmptyBoard());
    }
  };

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('board');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setGameData(parsedData);
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem('board', JSON.stringify(data));
  };

  const createEmptyBoard = () => {
    const emptyRound = Array.from({ length: 6 }, () => ({
      category: '',
      questions: Array.from({ length: 5 }, () => ({
        question: '',
        answer: '',
        doubleDare: false
      }))
    }));

    return {
      single: emptyRound.map(cat => ({ ...cat })),
      double: emptyRound.map(cat => ({ ...cat })),
      final: {
        category: '',
        question: '',
        answer: ''
      }
    };
  };

  const updateCategory = (round, categoryIndex, value) => {
    const newData = { ...gameData };
    newData[round][categoryIndex].category = value;
    setGameData(newData);
    saveToLocalStorage(newData);
  };

  const updateClue = (round, categoryIndex, questionIndex, field, value) => {
    const newData = { ...gameData };
    if (field === 'doubleDare') {
      newData[round][categoryIndex].questions[questionIndex][field] = value;
    } else {
      newData[round][categoryIndex].questions[questionIndex][field] = value;
    }
    setGameData(newData);
    saveToLocalStorage(newData);
  };

  const updateFinal = (field, value) => {
    const newData = { ...gameData };
    newData.final[field] = value;
    setGameData(newData);
    saveToLocalStorage(newData);
  };

  const deleteClue = (round, categoryIndex, questionIndex) => {
    const newData = { ...gameData };
    newData[round][categoryIndex].questions[questionIndex] = {
      question: '',
      answer: '',
      doubleDare: false
    };
    setGameData(newData);
    saveToLocalStorage(newData);
  };

  const exportJSON = () => {
    const dataStr = JSON.stringify(gameData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `board-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importJSON = () => {
    try {
      const parsed = JSON.parse(importText);
      setGameData(parsed);
      saveToLocalStorage(parsed);
      setShowImport(false);
      setImportText('');
      alert('Board imported successfully!');
    } catch (error) {
      alert('Invalid JSON format. Please check your input.');
    }
  };

  const resetBoard = () => {
    if (confirm('Are you sure you want to reset the entire board? This cannot be undone.')) {
      localStorage.clear();
      setGameData(createEmptyBoard());
    }
  };

  const handleDragStart = (e, round, categoryIndex, questionIndex) => {
    setDraggedClue({ round, categoryIndex, questionIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetRound, targetCategory, targetQuestion) => {
    e.preventDefault();
    
    if (!draggedClue) return;

    const newData = { ...gameData };
    const sourceClue = newData[draggedClue.round][draggedClue.categoryIndex].questions[draggedClue.questionIndex];
    const targetClue = newData[targetRound][targetCategory].questions[targetQuestion];

    // Swap the clues
    newData[draggedClue.round][draggedClue.categoryIndex].questions[draggedClue.questionIndex] = targetClue;
    newData[targetRound][targetCategory].questions[targetQuestion] = sourceClue;

    setGameData(newData);
    saveToLocalStorage(newData);
    setDraggedClue(null);
  };

  const autoAssignDoubleDares = () => {
    if (!autoChooseDD) return;

    const newData = { ...gameData };
    
    // Reset all double dares
    if (newData.single) {
      newData.single.forEach(category => {
        category.questions.forEach(question => {
          question.doubleDare = false;
        });
      });
      
      // Assign one random double dare in single round
      const randomCategory = Math.floor(Math.random() * 6);
      const randomQuestion = Math.floor(Math.random() * 5);
      newData.single[randomCategory].questions[randomQuestion].doubleDare = true;
    }

    if (newData.double) {
      newData.double.forEach(category => {
        category.questions.forEach(question => {
          question.doubleDare = false;
        });
      });
      
      // Assign two random double dares in double round
      const positions = [];
      while (positions.length < 2) {
        const pos = { 
          category: Math.floor(Math.random() * 6), 
          question: Math.floor(Math.random() * 5) 
        };
        const exists = positions.some(p => p.category === pos.category && p.question === pos.question);
        if (!exists) {
          positions.push(pos);
          newData.double[pos.category].questions[pos.question].doubleDare = true;
        }
      }
    }

    setGameData(newData);
    saveToLocalStorage(newData);
  };

  useEffect(() => {
    if (gameData && autoChooseDD) {
      autoAssignDoubleDares();
    }
  }, [autoChooseDD]);

  if (!gameData) {
    return <div className={styles.loading}>Loading board editor...</div>;
  }

  const renderClue = (round, categoryIndex, questionIndex, question) => {
    const clueId = `${round}-${categoryIndex}-${questionIndex}`;
    
    return (
      <td 
        key={questionIndex}
        className={`${styles.clue} ${question.doubleDare ? styles.doubleDare : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, round, categoryIndex, questionIndex)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, round, categoryIndex, questionIndex)}
      >
        <div className={styles.clueControls}>
          <label>
            <input
              type="checkbox"
              checked={question.doubleDare || false}
              onChange={(e) => updateClue(round, categoryIndex, questionIndex, 'doubleDare', e.target.checked)}
              style={{ display: autoChooseDD ? 'none' : 'inline' }}
            />
            <span style={{ display: autoChooseDD ? 'none' : 'inline' }}>DD?</span>
          </label>
          <button
            className={styles.deleteBtn}
            onClick={() => deleteClue(round, categoryIndex, questionIndex)}
            title="Delete Clue"
          >
            🗑️
          </button>
        </div>
        
        <div className={styles.clueContent}>
          <textarea
            placeholder="Enter clue..."
            value={question.question || ''}
            onChange={(e) => updateClue(round, categoryIndex, questionIndex, 'question', e.target.value)}
            rows={3}
          />
          <input
            type="text"
            placeholder="Answer"
            value={question.answer || ''}
            onChange={(e) => updateClue(round, categoryIndex, questionIndex, 'answer', e.target.value)}
          />
        </div>
        
        <div className={styles.dragHandle} title="Drag to move clue">⋮⋮</div>
      </td>
    );
  };

  const renderRound = (round, title) => {
    if (!gameData[round]) return null;
    
    const isVisible = (round === 'single' && showSingle) || 
                     (round === 'double' && showDouble);
    
    if (!isVisible) return null;

    return (
      <div key={round} className={styles.round}>
        <h2>{title}</h2>
        <table className={styles.gameBoard}>
          <thead>
            <tr>
              {gameData[round].map((category, categoryIndex) => (
                <td key={categoryIndex} className={styles.category}>
                  <textarea
                    placeholder="Category Name"
                    value={category.category || ''}
                    onChange={(e) => updateCategory(round, categoryIndex, e.target.value)}
                    rows={2}
                  />
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map(questionIndex => (
              <tr key={questionIndex}>
                {gameData[round].map((category, categoryIndex) => 
                  renderClue(round, categoryIndex, questionIndex, category.questions[questionIndex])
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <h1>Edit Jeopardy Board</h1>
        
        <div className={styles.controls}>
          <button onClick={() => setShowImport(true)}>Import JSON</button>
          <button onClick={exportJSON}>Export JSON</button>
          <button onClick={resetBoard}>Reset Board</button>
          <button onClick={() => window.print()}>Print</button>
        </div>

        <div className={styles.roundOptions}>
          <label>
            <input
              type="checkbox"
              checked={showSingle}
              onChange={(e) => setShowSingle(e.target.checked)}
            />
            Single Round
          </label>
          <label>
            <input
              type="checkbox"
              checked={showDouble}
              onChange={(e) => setShowDouble(e.target.checked)}
            />
            Double Round
          </label>
          <label>
            <input
              type="checkbox"
              checked={showFinal}
              onChange={(e) => setShowFinal(e.target.checked)}
            />
            Final Round
          </label>
          <label>
            <input
              type="checkbox"
              checked={autoChooseDD}
              onChange={(e) => setAutoChooseDD(e.target.checked)}
            />
            Auto-choose Double Dares
          </label>
        </div>
      </div>

      <div className={styles.content}>
        {renderRound('single', 'Single Jeopardy Round')}
        {renderRound('double', 'Double Jeopardy Round')}
        
        {showFinal && gameData.final && (
          <div className={styles.round}>
            <h2>Final Jeopardy</h2>
            <table className={styles.finalBoard}>
              <thead>
                <tr>
                  <td className={styles.category}>
                    <textarea
                      placeholder="Final Jeopardy Category"
                      value={gameData.final.category || ''}
                      onChange={(e) => updateFinal('category', e.target.value)}
                      rows={2}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.finalClue}>
                    <textarea
                      placeholder="Final Jeopardy Clue"
                      value={gameData.final.question || ''}
                      onChange={(e) => updateFinal('question', e.target.value)}
                      rows={4}
                    />
                    <input
                      type="text"
                      placeholder="Final Jeopardy Answer"
                      value={gameData.final.answer || ''}
                      onChange={(e) => updateFinal('answer', e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showImport && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Import JSON Board</h3>
            <textarea
              placeholder="Paste your JSON board data here..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={10}
              cols={60}
            />
            <div className={styles.modalButtons}>
              <button onClick={importJSON}>Import</button>
              <button onClick={() => setShowImport(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;