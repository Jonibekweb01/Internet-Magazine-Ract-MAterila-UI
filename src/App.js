import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Admin } from "./pages/Admin/Admin";
import { CLient } from "./pages/Client/CLient";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import './App.css'

function App() {

  const [isAdmin, setAdmin] = useState(localStorage.getItem('token'));
  const [us, setUs] = useState(localStorage.getItem('user'));

  if (!us) {
    return <Register />
  }
  else {
    <CLient />
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<CLient />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;


