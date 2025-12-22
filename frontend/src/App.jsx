import React, { useState, useEffect } from 'react';

export default function CalorieTracker() {
  const [totalCalories, setTotalCalories] = useState(0);
  const [calorieInput, setCalorieInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [submitText, setSubmitText] = useState('submit button (copies JSON to clipboard)');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data on mount
  React.useEffect(() => {
    try {
      const savedCalories = localStorage.getItem('supertask-calories');
      const savedTodos = localStorage.getItem('supertask-todos');
      
      if (savedCalories) {
        setTotalCalories(parseInt(savedCalories));
      }
      
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.log('No saved data found or error loading:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save calories whenever they change
  React.useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('supertask-calories', totalCalories.toString());
      } catch (err) {
        console.error('Error saving calories:', err);
      }
    }
  }, [totalCalories, isLoaded]);

  // Save todos whenever they change
  React.useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('supertask-todos', JSON.stringify(todos));
      } catch (err) {
        console.error('Error saving todos:', err);
      }
    }
  }, [todos, isLoaded]);

  const addCalories = () => {
    const amount = parseInt(calorieInput);
    if (!isNaN(amount) && amount > 0) {
      setTotalCalories(totalCalories + amount);
      setCalorieInput('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const submitDay = async () => {
    const today = new Date();
    const dateStr = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear().toString().slice(-2)}`;
    
    const entry = {
      date: dateStr,
      totalCalories: totalCalories,
      tasks: todos
        .filter((todo) => todo.completed && todo.text.trim() !== '')
        .map(todo => todo.text)
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(entry, null, 2));
      setSubmitText('copied!');
      setTimeout(() => {
        setSubmitText('submit button (copies JSON to clipboard)');
      }, 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      setSubmitText('failed to copy');
      setTimeout(() => {
        setSubmitText('submit button (copies JSON to clipboard)');
      }, 2000);
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#e8e4d0',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#f5f0dc',
        border: '3px solid #8b7355',
        borderRadius: '20px',
        padding: '20px',
        fontFamily: 'Courier New, monospace',
        minHeight: '600px'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
          Supertask
        </div>
        
        {/* Total Calories Box */}
        <div style={{
          border: '2px solid #8b7355',
          borderRadius: '15px',
          padding: '30px 20px',
          marginBottom: '20px',
          textAlign: 'center',
          backgroundColor: '#faf8f0'
        }}>
          <div style={{ fontSize: '12px', marginBottom: '10px' }}>
            total calories for the day (number)
          </div>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
            {totalCalories}
          </div>
        </div>

        {/* Calorie Input Box */}
        <div style={{
          border: '2px solid #8b7355',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#faf8f0'
        }}>
          <div style={{ fontSize: '11px', marginBottom: '10px' }}>
            calorie input with button that adds to the total calorie box
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="number"
              value={calorieInput}
              onChange={(e) => setCalorieInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCalories()}
              style={{
                flex: 1,
                padding: '8px',
                border: '2px solid #8b7355',
                borderRadius: '5px',
                fontFamily: 'Courier New, monospace',
                backgroundColor: '#fff',
                fontSize: '14px'
              }}
              placeholder="0"
            />
            <button
              onClick={addCalories}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d4c5a9',
                border: '2px solid #8b7355',
                borderRadius: '5px',
                fontFamily: 'Courier New, monospace',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* TO DO Box */}
        <div style={{
          border: '2px solid #8b7355',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '20px',
          backgroundColor: '#faf8f0'
        }}>
          <div style={{ 
            fontSize: '16px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            TO DO
          </div>
          {todos.map((todo, index) => (
            <div
              key={index}
              onClick={() => toggleTodo(index)}
              style={{
                padding: '10px',
                border: '2px solid #8b7355',
                borderRadius: '8px',
                marginBottom: '10px',
                cursor: 'pointer',
                backgroundColor: todo.completed ? '#d4d4d4' : '#fff',
                textDecoration: todo.completed ? 'line-through' : 'none',
                minHeight: '20px',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {todo.text}
            </div>
          ))}
          <div style={{
            marginTop: '20px',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="input for new to do item"
              style={{
                flex: 1,
                padding: '8px',
                border: '2px solid #8b7355',
                borderRadius: '5px',
                fontFamily: 'Courier New, monospace',
                backgroundColor: '#fff',
                fontSize: '12px'
              }}
            />
            <button
              onClick={addTodo}
              style={{
                padding: '8px 16px',
                backgroundColor: '#d4c5a9',
                border: '2px solid #8b7355',
                borderRadius: '5px',
                fontFamily: 'Courier New, monospace',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Add
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div 
          onClick={submitDay}
          style={{
            border: '2px solid #8b7355',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '11px',
            textAlign: 'center',
            backgroundColor: '#faf8f0',
            cursor: 'pointer'
          }}
        >
          {submitText}
        </div>
      </div>
    </div>
  );
}
