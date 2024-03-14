import headerLogo from "../../assets/header-logo.svg";
import { FaAlignRight } from "react-icons/fa";
import NavMenu from "./NavMenu";
import { useAppContext } from "../../contexts/AppContextProvider";

const Header = (): JSX.Element => {
  const { setShowMobMenu } = useAppContext();

  const toggleMobMenu = (): void => {
    setShowMobMenu((prevState) => !prevState);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__logo">
          <h3>GanjaWebshop</h3>
          <img src={headerLogo} alt="nav logo" />
        </div>
        <NavMenu />
        <button className="nav__toggle" onClick={toggleMobMenu}>
          <FaAlignRight className="nav__toggle-btn" size={30} />
        </button>
      </nav>
    </header>
  );
};

export default Header;
