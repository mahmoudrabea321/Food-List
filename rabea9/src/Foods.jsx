import { useState, useEffect } from "react";

function Foods() {
  // Load initial data from localStorage or use default array
  const [foods, setFoods] = useState(() => {
    const savedFoods = localStorage.getItem('foodList');
    return savedFoods ? JSON.parse(savedFoods) : ["apple", "orange", "banana", "coconut"];
  });
  
  const [newFood, setNewFood] = useState("");

  // Save to localStorage whenever foods change
  useEffect(() => {
    localStorage.setItem('foodList', JSON.stringify(foods));
  }, [foods]);

  function handleAddFood() {
    if (!newFood.trim()) {
      alert("Please enter a food name");
      return;
    }
    
    setFoods(prevFoods => [...prevFoods, newFood.trim()]);
    setNewFood("");
  }

  function handleDeleteFood(index) {
    setFoods(prevFoods => prevFoods.filter((_, i) => i !== index));
  }

  function handleInputChange(event) {
    setNewFood(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleAddFood();
    }
  }

  function clearAllFoods() {
    if (window.confirm("Are you sure you want to clear all foods?")) {
      setFoods([]);
    }
  }

  return (
    <div className="foods-container">
      <div className="header">
        <h1>Food List Manager</h1>
        <p>Keep track of your favorite foods</p>
        {foods.length > 0 && (
          <button className="clear-btn" onClick={clearAllFoods}>
            Clear All Foods
          </button>
        )}
      </div>
      
      <div className="content">
        <div className="input-section">
          <h2 className="section-title">Add New Food</h2>
          
          <div className="input-group">
            <input
              type="text"
              value={newFood}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter a food name"
              className="food-input"
            />
            <button className="add-btn" onClick={handleAddFood}>
              <i className="fas fa-plus"></i> Add Food
            </button>
          </div>
        </div>
        
        <div className="foods-section">
          <h2 className="section-title">Your Food List</h2>
          
          <div className="stats">
            <div>
              <span>{foods.length}</span>
              <p>Total Foods</p>
            </div>
            <div>
              <span>{foods.filter(food => food.length <= 5).length}</span>
              <p>Short Names</p>
            </div>
            <div>
              <span>{foods.filter(food => food.length > 5).length}</span>
              <p>Long Names</p>
            </div>
          </div>
          
          <div className="foods-list">
            {foods.length === 0 ? (
              <div className="empty-state">
                <i className="fas fa-utensils"></i>
                <p>No foods in your list. Add some delicious foods!</p>
              </div>
            ) : (
              foods.map((food, index) => (
                <div key={index} className="food-item">
                  <div className="food-info">
                    <span className="food-icon">
                      <i className="fas fa-apple-alt"></i>
                    </span>
                    <span className="food-name">{food}</span>
                  </div>
                  <button 
                    className="delete-btn" 
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${food}?`)) {
                        handleDeleteFood(index);
                      }
                    }}
                    title="Delete"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Foods;