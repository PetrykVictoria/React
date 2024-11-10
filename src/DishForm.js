import React, { useState, useEffect } from "react";
import "./styles.css";

const DishForm = ({ addDish, editingDish, updateDish, closeModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const [priceError, setPriceError] = useState("");
  const [cookingTimeError, setCookingTimeError] = useState("");

  useEffect(() => {
    if (editingDish) {
      setName(editingDish.name);
      setDescription(editingDish.description);
      setPrice(editingDish.price);
      setCookingTime(editingDish.cookingTime.replace(" min", ""));
    }
  }, [editingDish]);

  const validateFields = () => {
    let isValid = true;

    if (price <= 0) {
      setPriceError("Price must be a positive number.");
      isValid = false;
    } else {
      setPriceError("");
    }

    if (cookingTime <= 0 || isNaN(cookingTime)) {
      setCookingTimeError("Cooking time must be a positive number in minutes.");
      isValid = false;
    } else {
      setCookingTimeError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const dish = {
      id: editingDish ? editingDish.id : Date.now(),
      name,
      description,
      price: parseFloat(price),
      cookingTime: `${cookingTime} min`,
    };

    if (editingDish) {
      updateDish(dish);
    } else {
      addDish(dish);
    }

    setName("");
    setDescription("");
    setPrice("");
    setCookingTime("");
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit} className="dish-form">
          <input
            type="text"
            placeholder="Dish Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price ($)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {priceError && <p className="error-message">{priceError}</p>}

          <input
            type="number"
            placeholder="Cooking Time (in minutes)"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
          {cookingTimeError && (
            <p className="error-message">{cookingTimeError}</p>
          )}

          <button type="submit">{editingDish ? "Update" : "Add"}</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default DishForm;
