import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cannabisLogo from "../assets/cannabis-logo-2.svg";
import Button from "./Button";
import { useAppContext } from "../contexts/AppContextProvider";
import { registerUserAction } from "../state/action-creators/authActions";
import { toast } from "react-toastify";
import { AuthActionType } from "../state/actions/auth";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setShowModalLogin, setShowModalRegister } = useAppContext();

  const { loading } = useAppSelector((state) => state.registerUser);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRegisterUser = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    }
    dispatch(
      registerUserAction(
        name,
        email,
        password,
        confirmPassword
      ) as unknown as AuthActionType
    );
    const timer = setTimeout(() => {
      setShowModalRegister(false);
      navigate("/");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className="register__form-bcg">
      <div className="register__title">
        <img src={cannabisLogo} alt="cannbis logo icon" width="32" />
        <h3>register</h3>
      </div>
      <form className="register__form" onSubmit={handleRegisterUser}>
        <div className="form__control">
          <input
            type="text"
            name="name"
            className="form__input"
            placeholder="name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="form__control">
          <input
            type="email"
            name="email"
            className="form__input"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="form__control">
          <input
            type="password"
            name="password"
            className="form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password..."
            required
          />
        </div>
        <div className="form__control">
          <input
            type="password"
            name="password-confirm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form__input"
            placeholder="confirm password..."
          />
        </div>
        <Button type="submit" className="button button--mid" disabled={loading}>
          register
        </Button>
        <div className="already">
          <span>Already have an account?</span>
          <Link
            to="#"
            onClick={() => {
              setShowModalRegister(false);
              setShowModalLogin(true);
            }}
          >
            login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterUser;
