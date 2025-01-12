import { useLocation } from "react-router-dom";
import NavBar from "./AdminComponent/NavBar/NavBar";
import MainNav from "./components/main-navigation/MainNav";

const AppNavBar = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin_role");
  
    return (
      <div>
        {isAdminRoute ? <NavBar /> : <MainNav />}
      </div>
    );
};

export default AppNavBar;