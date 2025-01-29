import { Link } from "@tanstack/react-router";
import { UserDropdown } from "../user-dropdown";
import { Search } from "lucide-react";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { filterWordAtom, homePageAtom, userAtom } from "@/store/atoms";
import { CreateHotelDialog } from "../Dialogs/CreateHotelDialog";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [storedUser,setStoredUser] = useAtom(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(token){
      const decoded = jwtDecode(token) as {
        userId: number;
        firstName: string;
        lastName: string;
        email: string;
        roleName: string;
        isAdmin: boolean;

      };
      setStoredUser({
        userId: decoded.userId,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        roleName: decoded.roleName,
        isAdmin: decoded.isAdmin,
      });
    }
  }, []);

  const [homePage] = useAtom(homePageAtom);
  const [show, setShow] = useState(false);
  const [filterHotel, setFilterHotel] = useAtom(filterWordAtom);

  const handleChange = (e: any) => {
    setFilterHotel(e.target.value);
  };

  const handleShow = () => {
    setShow(!show);
    // Remember to to add another function to actually handle search under this comment: handleSearch(location)
  };
  const [currentUser] = useAtom(userAtom);

  return (
    <div
      className={`col-start-1 col-end-13 row-start-1 row-end-2 grid grid-cols-12 gap-3 sm:text-sm md:text-lg 2xl:text-2xl`}
    >
      <Link
        to="/HomePage"
        className={`col-start-2 flex items-center justify-center bg-[url(/logo-white.png)] bg-contain bg-center bg-no-repeat xs:scale-150`}
      ></Link>
      <div
        className={`${storedUser ? "md:col-end-6 lg:col-end-5 xs:col-end-7" : "col-span-1"} col-start-3 flex items-center justify-evenly`}
      >
        {storedUser && (
          <Link
            to="/HomePage"
            className={`hidden text-white lg:flex [&.active]:font-bold`}
          >
            Hotels
          </Link>
        )}

        {storedUser && (
          <div className="hidden items-center justify-center text-white lg:flex">
            <Link to="/ReservationPage" className={`[&.active]:font-bold`}>
              Reservations
            </Link>
          </div>
        )}
      </div>

      {/* without condition for not logged in users */}
      {/* <div className="relative flex items-center justify-center">
        <input
          className={`search ${show ? styles.search : styles.hide} rounded-md py-1 pl-3`}
          type="text"
          placeholder="Enter Location"
          value={filterHotel ? filterHotel : ""}
          onChange={handleChange}
        />
        <Search onClick={() => handleShow()} className="text-red-50" />
      </div>       */}

      {storedUser && (
        <div className="col-end-12 flex items-center justify-end gap-3 md:col-start-8 lg:col-start-10 2xl:col-start-11 xs:col-start-7">
          <div className="relative flex items-center justify-center">
            <input
              className={`search ${show ? styles.search : styles.hide} rounded-md py-1 pl-3`}
              type="text"
              placeholder="Enter Location"
              value={filterHotel ? filterHotel : ""}
              onChange={handleChange}
            />
            <Search onClick={() => handleShow()} className="text-white" />
          </div>
          {currentUser?.isAdmin ? <CreateHotelDialog /> : null}
          <div className="flex h-[50px] w-[50px]">
            <UserDropdown />
          </div>
        </div>
      )}
      {!storedUser && (
        <div className="col-end-12 flex items-center gap-3 sm:col-start-9 md:col-start-10 2xl:col-start-11 xs:col-start-10 xxs:col-start-7">
          {homePage && (
            <div className="relative flex items-center justify-center">
              <input
                className={`search ${show ? styles.search : styles.hide} rounded-md py-1 pl-3`}
                type="text"
                placeholder="Enter Location"
                value={filterHotel ? filterHotel : ""}
                onChange={handleChange}
              />
              <Search onClick={() => handleShow()} className="text-white" />
            </div>
          )}
          <Link to="/login" className={`text-white [&.active]:font-bold`}>
            Login
          </Link>
          <Link to="/register" className={`} text-white [&.active]:font-bold`}>
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
