import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "./user-avatar";
import { Link } from "@tanstack/react-router";
import { useLogout } from "@/hooks/users/auth/use-logout";

export function UserDropdown() {
  const logout = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar height={50} width={50} nav={true} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem> */}
        <DropdownMenuItem>
          <Link to="/ProfilePage">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex lg:hidden">
          <Link to="/HomePage">Hotels</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex lg:hidden">
          <Link to="/ReservationPage">Reservations</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
