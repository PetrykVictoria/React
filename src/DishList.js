import React from "react";
import "./styles.css";

const DishList = ({ dishes, deleteDish, startEditing }) => {
  return (
    <table className="dish-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Cooking Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dishes.map((dish) => (
          <tr key={dish.id} className="dish-item">
            <td>{dish.name}</td>
            <td>{dish.description}</td>
            <td>${dish.price.toFixed(2)}</td>
            <td>{dish.cookingTime} </td>
            <td>
              <div className="button-group">
                <button onClick={() => startEditing(dish)}>Edit</button>
                <button
                  className="delete-button"
                  onClick={() => deleteDish(dish.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DishList;
