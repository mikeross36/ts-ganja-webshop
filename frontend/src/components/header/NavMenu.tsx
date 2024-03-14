import { FaTimesCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContextProvider";
import DropdownMenu from "./DropdownMenu";
import { RootState } from "../../state/store";
import { UserInfoType } from "../../types/UserTypes";
import { useAppSelector } from "../../hooks/useAppSelector";

const NavMenu = (): JSX.Element => {
  const { showMobMenu, setShowMobMenu, setIsCartOpen, setShowModalLogin } =
    useAppContext();

  const { userInfo } = useAppSelector(
    (state: RootState) => state.loginUser as UserInfoType
  );

  const { itemsTotal } = useAppSelector(
    (state: RootState) => state.shoppingCart
  );

  return (
    <div
      className={`nav__menu ${showMobMenu && "show-menu"}`}
      onClick={() => setShowMobMenu(false)}
    >
      <ul className="nav__list">
        <div className="nav__close">
          <FaTimesCircle size={30} color="#fff" />
        </div>
        <li className="nav__item">
          <NavLink to="/" className="nav__link">
            home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/products" className="nav__link">
            products
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/categories" className="nav__link">
            categories
          </NavLink>
        </li>
        <li className="nav__item" onClick={() => setIsCartOpen(true)}>
          <Link to="" className="nav__link">
            cart
          </Link>
          <span className="cart__items-total">{itemsTotal}</span>
        </li>
        {!userInfo ? (
          <li className="nav__item" onClick={() => setShowModalLogin(true)}>
            <Link to="" className="nav__link">
              login
            </Link>
          </li>
        ) : (
          <li className="nav__item" onClick={(e) => e.stopPropagation()}>
            <DropdownMenu />
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavMenu;
