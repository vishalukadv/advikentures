import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdventureSports from './pages/AdventureSports';
import YogaRetreats from './pages/YogaRetreats';
import Packages from './components/Packages';
import Stays from './pages/Stays';
import Transportation from './pages/Transportation';
import Camping from './pages/Camping';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import ChatWidget from './components/chat/ChatWidget';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Navbar />
              <Home />
            </>
          } 
        />
        <Route 
          path="/adventure" 
          element={
            <>
              <Navbar />
              <AdventureSports />
            </>
          } 
        />
        <Route 
          path="/yoga" 
          element={
            <>
              <Navbar />
              <YogaRetreats />
            </>
          } 
        />
        <Route 
          path="/packages" 
          element={
            <>
              <Navbar />
              <Packages />
            </>
          } 
        />
        <Route 
          path="/stays" 
          element={
            <>
              <Navbar />
              <Stays />
            </>
          } 
        />
        <Route 
          path="/transport" 
          element={
            <>
              <Navbar />
              <Transportation />
            </>
          } 
        />
        <Route 
          path="/camping" 
          element={
            <>
              <Navbar />
              <Camping />
            </>
          } 
        />
        <Route 
          path="/gallery" 
          element={
            <>
              <Navbar />
              <Gallery />
            </>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <>
              <Navbar />
              <Contact />
            </>
          } 
        />
        <Route 
          path="/blogs/*" 
          element={
            <>
              <Navbar />
              <Blogs />
            </>
          } 
        />
      </Routes>
      <ChatWidget />
    </BrowserRouter>
  );
}

export default App