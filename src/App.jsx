import React, { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";
import "./App.css";

Modal.setAppElement("#root");

const App = () => {
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [phone, setPhone] = useState("+998");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://register4.onrender.com/api/category");
      setCategoryOptions(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !family ||
      !phone ||
      !selectedCategory
    ) {
      toast.error("Iltimos, hamma ma'lumotlarni to'g'ri kiriting.");
      return;
    }

    try {
      const userData = await submitUserData();
      if (userData) {
        toast.success(
          `${name} biz sizga tez orada aloqaga chiqamiz`
        );
        resetForm();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitUserData = async () => {
    const newUser = {
      name,
      family,
      phone,
      category: selectedCategory,
    };

    try {
      const response = await axios.post("https://register4.onrender.com/api/users", newUser);
      return response.data;
    } catch (error) {
      throw new Error(`Error submitting user data: ${error.message}`);
    }
  };

  const resetForm = () => {
    setName("");
    setFamily("");
    setPhone("+998");
    setSelectedCategory("");
  };



  return (
    <div className="container">
      <div className="wrapper_register">
        <h2>Hogwarts learning center</h2>
        <p>🚀Maqsadingizga biz bilan erishing</p>
        <p>👩‍💼Tajribali ustozlar</p>
        <p>🤩Ajoyib atmasfera</p>
        <p>✅Hamyonbop narx</p>
        <p>Hoziroq roʻyxatdan oʻting👇</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <input
              type="text"
              id="name"
              value={name}
              autoComplete="off"

              placeholder="Ismingiz"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="family"
              value={family}
              placeholder="Familyangiz"
              onChange={(e) => setFamily(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="phone"
              value={phone}
              placeholder="Telefon raqamiz"
              onChange={(e) => {
                if (e.target.value.length <= 13) {
                  setPhone(e.target.value);
                }
              }}
              autoComplete="off"
            />

          </div>
          <div className="form-group">
            <select
              id="category"
              value={selectedCategory}

              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option selected >Kursni tanlang 👇</option>
              {categoryOptions.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
