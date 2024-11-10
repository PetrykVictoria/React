import React, { useState, useEffect } from "react";
import DishForm from "./DishForm";
import DishList from "./DishList";
import "./styles.css";

const App = () => {
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedDishes = JSON.parse(localStorage.getItem("dishes"));
    if (storedDishes) {
      setDishes(storedDishes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dishes", JSON.stringify(dishes));
  }, [dishes]);

  const addDish = (dish) => {
    setDishes((prevDishes) => [...prevDishes, dish]);
  };

  const updateDish = (updatedDish) => {
    setDishes(
      dishes.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish))
    );
    setEditingDish(null);
  };

  const deleteDish = (id) => {
    setDishes(dishes.filter((dish) => dish.id !== id));
  };

  const startEditing = (dish) => {
    setEditingDish(dish);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDish(null);
  };

  return (
    <div className="container">
      <h1>Dish Management</h1>
      <button onClick={() => setIsModalOpen(true)} className="add-button">
        Add New Dish
      </button>
      {isModalOpen && (
        <DishForm
          addDish={addDish}
          editingDish={editingDish}
          updateDish={updateDish}
          closeModal={closeModal}
        />
      )}
      <DishList
        dishes={dishes}
        deleteDish={deleteDish}
        startEditing={startEditing}
      />
    </div>
  );
};

export default App;
