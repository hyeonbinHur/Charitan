import { Link } from "react-router-dom";
import AuthModal from "../modal/AuthModal";
import { useContext, useRef, useState } from "react";
import { Button } from "../ui/button";
import { UserContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import { Menu, X } from "lucide-react";
import UserDropDown from "./UserDropDown";

const MainNav = () => {
  const authModal = useRef(null);
  const { user } = useContext(UserContext);
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickOpenAuthModal = () => {
    if (authModal.current && authModal.current.open) {
      authModal.current.open();
    }
  };

  return (
    <header className="px-5 py-3 text-black w-full border-b-2">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-xl">
          <Link to="/" className="hover:text-gray-700">
            Charitan
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-5">
          <Link to="/charities" className="hover:text-gray-700">
            Charities Page
          </Link>
          <Link to="/projects" className="hover:text-gray-700">
            Projects Page
          </Link>
          <Link to="/donation" className="hover:text-gray-700">
            Donation
          </Link>
          {user ? (
            <Button className="hover:bg-gray-300">
              <UserDropDown user={user} />
            </Button>
          ) : (
            <Button
              onClick={onClickOpenAuthModal}
              className="hover:bg-gray-300"
            >
              Sign In
            </Button>
          )}
        </nav>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 mt-3 md:hidden">
          <Link to="/charities" className="hover:text-gray-700">
            Charities Page
          </Link>
          <Link to="/projects" className="hover:text-gray-700">
            Projects Page
          </Link>
          <Link to="/doner-p" className="hover:text-gray-700">
            Donor Profile
          </Link>
          <Link to="/charity-p" className="hover:text-gray-700">
            Charity Profile
          </Link>
          <Link to="/donation" className="hover:text-gray-700">
            Donation
          </Link>
          {user ? (
            <Button onClick={signOut} className="hover:bg-gray-300">
              {user.email}
              <UserDropDown user={user} />
            </Button>
          ) : (
            <Button
              onClick={onClickOpenAuthModal}
              className="hover:bg-gray-300"
            >
              Sign In
            </Button>
          )}
        </div>
      )}
      <AuthModal ref={authModal} />
    </header>
  );
};

export default MainNav;
