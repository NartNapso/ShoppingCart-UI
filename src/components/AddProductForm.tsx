import React, { useState } from "react";
import { useAppDispatch } from "../app/store";
import { addItem } from "../features/cart/cartSlice";
import "./styles/AddProductForm.css";

const AddProductForm: React.FC = () => {
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !productName) {
      alert("יש לבחור קטגוריה ולהכניס שם מוצר");
      return;
    }

    const newItem = { 
      id: Math.floor(Date.now() % 1000000).toString(),
      name: productName, 
      quantity,
      category
    };

    dispatch(addItem(newItem));

    setProductName("");
    setQuantity(1);
  };

  return (
    <form className="add-product-container" onSubmit={handleSubmit}>
      <div className="inputs-container">
        <div className="input-group">
          <label>קטגוריה:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">בחר קטגוריה</option>
            <option value="חלב וגבינות">חלב וגבינות</option>
            <option value="טואלטיקה">טואלטיקה</option>
            <option value="בשר">בשר</option>
            <option value="ירקות ופירות">ירקות ופירות</option>
          </select>
        </div>

        <div className="input-group">
          <label>שם מוצר:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled={!category}
            className={category ? "" : "disabled-input"}
          />
        </div>

        <div className="input-group">
          <label>כמות:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            className={category ? "" : "disabled-input"}
          />
        </div>

        <button type="submit" className="add-button">➕ הוסף מוצר לסל</button>
      </div>
    </form>
  );
};

export default AddProductForm;
