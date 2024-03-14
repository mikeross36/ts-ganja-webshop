import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppContext } from "./contexts/AppContextProvider";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import ShoppingCart from "./components/shopping-cart/ShoppingCart";
import Modal from "./components/Modal";
import LoginUser from "./components/LoginUser";
import RegisterUser from "./components/RegisterUser";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
  const {
    showModalLogin,
    setShowModalLogin,
    showModalRegister,
    setShowModalRegister,
    showModalForgot,
    setShowModalForgot,
  } = useAppContext();

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Modal showModal={showModalLogin} setShowModal={setShowModalLogin}>
        <LoginUser />
      </Modal>
      <Modal showModal={showModalRegister} setShowModal={setShowModalRegister}>
        <RegisterUser />
      </Modal>
      <Modal showModal={showModalForgot} setShowModal={setShowModalForgot}>
        <ForgotPassword />
      </Modal>
      <ShoppingCart />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
