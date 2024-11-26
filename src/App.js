import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { Preview } from "./pages/preview";
import { Meeting } from "./pages/meeting";

function App() {
  return (
    <Router> 
      <Routes> 
        <Route path="/" element={<Preview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/meet" element={<Meeting/>} />
      </Routes>
    </Router>
  );
}

export default App;
