import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Footer from "./components/main-navigation/Footer";
import CharityDetailPage from "./pages/CharityDetailPage";
import CharityPage from "./pages/CharityPage";
import CharityPersonalPage from "./pages/CharityPersonalPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import DonerPersonalPage from "./pages/DonerPersonalPage";
import DonationPage from "./pages/DonationPage";
import MainNav from "./components/main-navigation/MainNav";
import CreateProjectPage from "./pages/CreateProjectPage";
import CharityProjectsPage from "./pages/CharityProjectsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Inbox from "./components/message/Inbox";

import SubscriptionPage from "./pages/SubscriptionPage"; // Import the new SubscriptionPage

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      {/* Main navigation for routed views */}
      <MainNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/charities" element={<CharityPage />} />
        <Route path="/charity/:charity_id" element={<CharityDetailPage />} />
        <Route
          path="/charity/project/:charity_id"
          element={<CharityProjectsPage />}
        />
        <Route path="/charity-p" element={<CharityPersonalPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/project/:project_id" element={<ProjectDetailPage />} />
        <Route
          path="/create-project/:charity_id"
          element={<CreateProjectPage />}
        />
        <Route path="/doner-p" element={<DonerPersonalPage />} />
        <Route path="/donation/:project_id" element={<DonationPage />} />
        <Route path="/inbox" element={<Inbox />} />

        <Route path="/subscriptions" element={<SubscriptionPage />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
