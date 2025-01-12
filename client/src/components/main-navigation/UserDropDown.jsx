import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
const UserDropDown = ({ user }) => {
  const { signOut } = useAuth();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span>{user.email}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>- {user.user_type} -</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user.user_type === "Charity" && (
            <>
              <DropdownMenuItem>
                <Link to={`/charity-p/${user.charity_id}`}>Charity Page</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/charity/project/${user.charity_id}`}>Projects</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to={`/charity/inbox/${user.charity_id}`}>
                  Email Inbox
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {user.user_type === "Donor" && (
            <DropdownMenuItem>Donor Page</DropdownMenuItem>
          )}
          {user.user_type === "Admin" && (
            <DropdownMenuItem>
              <Link to={`/admin`}>Admin Page</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => signOut()}
            className="focus:bg-red-300"
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
