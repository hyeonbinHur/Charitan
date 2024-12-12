import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Footer from "./components/main-navigation/Footer"
import CharityDetailPage from "./pages/CharityDetailPage";
import CharityPage from "./pages/CharityPage";
import CharityPersonalPage from "./pages/CharityPersonalPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import DonerPersonalPage from "./pages/DonerPersonalPage";
import DonationPage from "./pages/DonationPage";
import MainNav from "./components/main-navigation/MainNav";
import CreateProjectPage from "./pages/CreateProjectPage";

const App = () => (
  <BrowserRouter>
    {/* Main navigation for routed views */}
    <MainNav />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/charities" element={<CharityPage />} />
      <Route path="/charity" element={<CharityDetailPage />} />
      <Route path="/charity-p" element={<CharityPersonalPage />} />
      <Route path="/projects" element={<ProjectPage />} />
      <Route path="/project" element={<ProjectDetailPage />} />
      <Route path="/create-project" element={<CreateProjectPage />} />
      <Route path="/doner-p" element={<DonerPersonalPage />} />
      <Route path="/donation" element={<DonationPage />} />
    </Routes>

    <Footer/>
  </BrowserRouter>
);

export default App;
