import { useState, useRef } from "react";
import { useAppContext } from "../../contexts/AppContextProvider";
import { UserInfoType } from "../../types/UserTypes";
import { FaAngleDoubleUp } from "react-icons/fa";
import {
  FaUserGear,
  FaCartShopping,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { logoutUserAction } from "../../state/action-creators/authActions";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { RootState, removeStoreData } from "../../state/store";
import { AuthActionType } from "../../state/actions/auth";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";

const DropdownMenu = (): JSX.Element => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { setShowMobMenu } = useAppContext();

  const {
    userInfo: { user },
  } = useAppSelector((state: RootState) => state.loginUser as UserInfoType);

  const dropRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown((prevDropdown) => !prevDropdown);
  };

  const dispatch = useAppDispatch();

  const handleLogoutUser = () => {
    dispatch(logoutUserAction() as unknown as AuthActionType);
    removeStoreData();
    window.location.replace("/");
  };

  useOutsideClick(dropRef, () => {
    setShowDropdown(false);
  });

  return (
    <main className="dropdown__menu" ref={dropRef}>
      <div
        className={`dropdown__menu-content ${
          showDropdown ? "show-dropdown" : ""
        }`}
      >
        <button className="dropdown__menu-button" onClick={toggleDropdown}>
          <span className="dropdown__menu-user">
            <p>{user?.name?.split(" ")[0]}</p>
          </span>
          <div className="dropdown__menu-icons">
            <FaAngleDoubleUp className="dropdown__arrow" />
          </div>
        </button>
        <ul
          className="dropdown__list"
          onClick={() => {
            setShowMobMenu(false);
            setShowDropdown(false);
          }}
        >
          <li>
            <Link to="/user-account" className="dropdown__item">
              <FaUserGear className="dropdown__icon" />
              <span className="dropdown__title">my account</span>
            </Link>
          </li>
          <li>
            <Link to="/user-orders" className="dropdown__item">
              <FaCartShopping className="dropdown__icon" />
              <span className="dropdown__title">my orders</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="dropdown__item" onClick={handleLogoutUser}>
              <FaArrowRightToBracket className="dropdown__icon" />
              <span className="dropdown__title">logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default DropdownMenu;
