import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Register from "./components/Register/register";
import Header from "./components/Header1/header";
import Hero from "./components/Hero1/hero";
import Footer from "./components/Footer/footer";
import Login from "./components/Login/login";
import About from "./components/About/about";
import Appointment from "./components/Appointment/appointment";

import Search from "./components/Search/search";
import DoctorInfos from "./components/DocInfos/docinf";
import Home from "./components/Home/home";
import DoctorForm from "./components/DoctorForm/form";
import AvailabilitySelector from "./components/availibility/av";
import Board from "./components/Board/board";
import Table from "./components/Table/table";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/doctor/details" element={<DoctorInfos />} />
          <Route exact path="/doctor/fill" element={<DoctorForm />} />
          <Route excat path="/appointment" element={<Appointment />} />
          <Route exact path="/board" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
