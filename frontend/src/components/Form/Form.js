import React from 'react';
import { useState } from 'react';
import validation from '../../utils/validation';
import axios from 'axios';
import './Form.css';

const Form=()=>{
    const initializeForm={
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
    }

    const initializeError={
        name: "",
        employeeId: "",
        email: "",
        phoneNumber: "",
        department: "",
        dateOfJoining: "",
        role: "",
    }

    const [formData,setFormData]=useState(initializeForm);
    const [errors,setErrors]=useState(initializeError);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const departments=["HR", "Engineering", "Marketing", "Sales", "Finance"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        const curErr=validation(name, value);
        setErrors((prevErrors)=>({...prevErrors,[name]:curErr}));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        let isValid = true;
        Object.keys(formData).forEach((key) => {
            const curerr=validation(key, formData[key]);
            setErrors((prevErrors)=>({...prevErrors,[key]:curerr}));
            if (errors[key]) isValid = false;
        });

        if (Object.values(errors).some((error) => error) || !isValid) {
        return;
        }


        try {
            const response = await axios.post("http://localhost:5000/employees", formData);
            console.log("Response received:", response); 
            setSuccessMessage("Form submitted successfully!");
            setFormData(initializeForm);
            setErrors(initializeError);
          } catch (error) {
            console.log(error);
            if (error.response) {
              console.log("Error response:", error.response);
              if (error.response.status === 403) {
                setErrorMessage(error.response.data.error || "User already exists.");
              } else if (error.response.status === 500) {
                setErrorMessage("Failed to create user. Please try again later.");
              } else {
                setErrorMessage("Something went wrong. Please try again.");
              }
            } else {
              console.log("Error:", error.message);
              setErrorMessage("Network error. Please check your connection.");
            }
          }
    };

    const handleReset = () => {
        setFormData(initializeForm);
        setErrors(initializeError);
        setSuccessMessage("");
        setErrorMessage("");
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
          </div>
    
          <div>
            <label>Employee ID:</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
            />
            {errors.employeeId && (
              <div style={{ color: "red" }}>{errors.employeeId}</div>
            )}
          </div>
    
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </div>
    
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && (
              <div style={{ color: "red" }}>{errors.phoneNumber}</div>
            )}
          </div>
    
          <div>
            <label>Department:</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
            >
              <option value="">--Select--</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <div style={{ color: "red" }}>{errors.department}</div>
            )}
          </div>
    
          <div>
            <label>Date of Joining:</label>
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleInputChange}
            />
            {errors.dateOfJoining && (
              <div style={{ color: "red" }}>{errors.dateOfJoining}</div>
            )}
          </div>
    
          <div>
            <label>Role:</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            />
            {errors.role && <div style={{ color: "red" }}>{errors.role}</div>}
          </div>
    
          <button type="submit">Submit</button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
    
          {successMessage && (
            <div style={{ color: "green", marginTop: "10px" }}>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div style={{ color: "red", marginTop: "10px" }}>{errorMessage}</div>
          )}
        </form>
      );

};

export default Form;