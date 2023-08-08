import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/Navber";
import Homepage from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Form from "./components/InputForm";

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Toaster />
          <Routes>

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Homepage />} />
            <Route path="/summary" element={<Form heading={"Summarize Text"} dec={"Summary Will Apprea Here"} api={"http://localhost:5000/summary"} />} />
            <Route path="/paragraph" element={<Form heading={"Generate Paragraph"} dec={"Your Paragraph Will Apprea Here"} api={"http://localhost:5000/paragraph"} />} />
            <Route path="/scifi-image" element={<Form heading={"Scifi Image"} dec={"Your Scifi Image Will Apprea Here"} api={"http://localhost:5000/scifi-image"} />} />
            <Route path="/chatbot" element={<Form heading={"Ask with Chatbot"} dec={" Bot Response"} api={"http://localhost:5000/chatbot"} />} />
            <Route path="/js-converter" element={<Form heading={"JS Converter"} dec={" Your Code Will Apprea Here"} api={"http://localhost:5000/js-converter"} />} />

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;