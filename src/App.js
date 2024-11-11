import React from "react";
import { Route, Routes } from "react-router-dom";
import Hero from "./components/Hero";
import SectionScroll from "./components/SectionScroll";

const App = () => {
  return (
    <>
      {
        <Routes>
          {/* <Route path="/" element={<Hero />} /> */}
          <Route path="/" element={<SectionScroll/>}/>
        </Routes>
      }
    </>
  );
};

export default App;
