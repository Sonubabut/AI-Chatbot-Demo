import React from "react";
import Header from "./components/Header/Header.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./components/Chat/Chat.js";
import Home from "./components/Home/Home.js";
import About from "./components/About/About.js";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
      <Route exact path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;