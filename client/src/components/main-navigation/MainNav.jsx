import { Link } from "react-router-dom";
import AuthModal from "../modal/AuthModal";
import { useContext, useRef } from "react";
import { Button } from "../ui/button";
import { UserContext } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
const MainNav = () => {
  const authModal = useRef(null);
  const { user } = useContext(UserContext);
  const { signOut } = useAuth();
  const onClickOpenAuthModal = () => {
    authModal.current.open();
  };
  return (
    <header className="px-5 py-5 text-black  w-full border-2">
      <div className="flex justify-around items-center ">
        <div className="absolute left-5 font-bold text-xl">
          <Link to="/" className="hover:text-gray-300">
            Charitan
          </Link>
        </div>
        <nav className="flex gap-5">
          <Link to="/charities" className="hover:text-gray-300">
            Charities Page
          </Link>
          <Link to="/projects" className="hover:text-gray-300">
            Projects Page
          </Link>
          <Link to="/charity" className="hover:text-gray-300">
            Charity Detail
          </Link>
          <Link to="/project" className="hover:text-gray-300">
            Project Detail
          </Link>
          <Link to="/create-project" className="hover:text-gray-300">
            Create Project
          </Link>
          <Link to="/doner-p" className="hover:text-gray-300">
            Doner Profile
          </Link>
          <Link to="/charity-p" className="hover:text-gray-300">
            Charity Profile
          </Link>
          <Link to="/donation" className="hover:text-gray-300">
            Donation
          </Link>
          {user ? (
            <Button onClick={() => signOut()}>{user.email}</Button>
          ) : (
            <Button onClick={() => onClickOpenAuthModal()}>Auth</Button>
          )}
        </nav>
      </div>
      <AuthModal ref={authModal} />
    </header>
  );
};

export default MainNav;
