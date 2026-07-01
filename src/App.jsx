import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Services from "./Pages/Services";
import Gallery from "./Pages/Gallery";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";
import Sponsors from "./Pages/Sponsors";
import EventsShedule from "./Pages/EventsShedule";
import Visitors from "./Pages/Visitors";
import Footer from "./Components/Footer";
import TopHeader from "./Components/TopHeader";

function App() {
  return (
    <Router>
      <TopHeader/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/events-shedule" element={<EventsShedule />} />
        <Route path="/visitors" element={<Visitors />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
