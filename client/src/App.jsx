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
import AboutUs from "./pages/AboutUsPage";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import MainNav from "./components/main-navigation/MainNav";
import CreateProjectPage from "./pages/CreateProjectPage";
import CharityProjectsPage from "./pages/CharityProjectsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import AdminDetailPage from "./pages/AdminDetailPage";
// import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
// import { AppSidebar } from "./components/app-sidebar";
import CharityEmailInbox from "./pages/CharityEmailInbox";

import NavBar from './AdminComponent/NavBar/NavBar';
import AccountManagement from './AdminPages/AccountManagement/AccountManagement';
import Home from './AdminPages/Home/Home';
import Statistic from './AdminPages/Statistics/Statistic';
import CreateCharityAccount from './AdminPages/CreateCharityAccount/CreateCharityAccount';
import CreateDonorAccount from './AdminPages/CreateDonorAccount/CreateDonorAccount';
import ProjectManagement from './AdminPages/ProjectManagement/ProjectManagement';
import AdminProjectDetailPage from "./AdminPages/ProjectManagement/ProjectDetailPage";
import EditProjectPage from './AdminPages/ProjectManagement/EditProjectPage';
import AppNavBar from "./AppNavBar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppNavBar/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/charities" element={<CharityPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/charity/:charity_id" element={<CharityDetailPage />} />
        <Route
          path="/charity/project/:charity_id"
          element={<CharityProjectsPage />}
        />
        <Route
          path="/charity-p/:charity_id"
          element={<CharityPersonalPage />}
        />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/project/:project_id" element={<ProjectDetailPage />} />
        <Route
          path="/create-project/:charity_id"
          element={<CreateProjectPage />}
        />
        <Route
          path="/charity/inbox/:charity_id"
          element={<CharityEmailInbox />}
        />
        <Route path="/doner-p" element={<DonerPersonalPage />} />
        <Route path="/donation/:project_id" element={<DonationPage />} />

        <Route path="/admin" element={<AdminDetailPage />} />

        {/* Admin Routes */}
        <Route path="/admin_role/" element={<Home />} />
        <Route path="/admin_role/page1" element={<Home />} />
        <Route path="/admin_role/page2" element={<AccountManagement />} />
        <Route path="/admin_role/page2/create_Charity_Account" element={<CreateCharityAccount />} />
        <Route path="/admin_role/page2/create_Donor_Account" element={<CreateDonorAccount />} />
        <Route path="/admin_role/page3" element={<ProjectManagement />} />
        <Route path="/admin_role/project/:id" element={<AdminProjectDetailPage />} />
        <Route path="/admin_role/edit-project/:id" element={<EditProjectPage />} />
        <Route path="/admin_role/page4" element={<Statistic />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </QueryClientProvider>
);
export default App;
