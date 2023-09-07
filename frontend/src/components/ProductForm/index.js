import "./Form.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadProductWithImage } from "../../store/products";
import { useHistory } from "react-router-dom";

function ProductForm({ onSubmit }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("1");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Dispatch the redux action here
    const result = await dispatch(uploadProductWithImage({ name, description, price, categoryId }, imageFile));
    if (result) {
      // Assuming you want to redirect after a successful product upload.
      history.push('/products');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="1">Electronics</option>
          <option value="2">Entertainment</option>
          <option value="3">Home Goods</option>
          <option value="4">Groceries</option>
        </select>
      </div>
      <div>
        <button type="submit">Post Product</button>
      </div>
    </form>
  );
}

export default ProductForm;
