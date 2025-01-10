import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Inbox from "./components/message/Inbox";

import NavBar from './AdminComponent/NavBar/NavBar';
import AccountManagement from './AdminPages/AccountManagement/AccountManagement';
import Home from './AdminPages/Home/Home';
import Statistic from './AdminPages/Statistics/Statistic';
import CreateCharityAccount from './AdminPages/CreateCharityAccount/CreateCharityAccount';
import CreateDonorAccount from './AdminPages/CreateDonorAccount/CreateDonorAccount';
import ProjectManagement from './AdminPages/ProjectManagement/ProjectManagement';
import AdminProjectDetailPage from "./AdminPages/ProjectManagement/ProjectDetailPage";
import EditProjectPage from './AdminPages/ProjectManagement/EditProjectPage';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppWithNav />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

// This component handles the conditional rendering for the navbar
function AppWithNav() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Conditional Navbar */}
      {isAdminRoute ? <NavBar /> : <MainNav />}

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

        {/* Admin Routes */}
        <Route path="/admin/" element={<Home />} />
        <Route path="/admin/page1" element={<Home />} />
        <Route path="/admin/page2" element={<AccountManagement />} />
        <Route path="/admin/page2/create_Charity_Account" element={<CreateCharityAccount />} />
        <Route path="/admin/page2/create_Donor_Account" element={<CreateDonorAccount />} />
        <Route path="/admin/page3" element={<ProjectManagement />} />
        <Route path="/admin/project/:id" element={<AdminProjectDetailPage />} />
        <Route path="/admin/edit-project/:id" element={<EditProjectPage />} />
        <Route path="/admin/page4" element={<Statistic />} />
      </Routes>

      {/* Footer is common for all pages */}
      <Footer />
    </>
  );
}
