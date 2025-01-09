import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAuth } from "../../hooks/useAuth";

const UserDropDown = ({ user }) => {
  const { signOut } = useAuth();
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{user.email}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>- {user.user_type} -</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDropDown;
