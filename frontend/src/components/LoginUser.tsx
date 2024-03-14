import { useState } from "react";
import cannabisLogo from "../assets/cannabis-logo-2.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContextProvider";
import Button from "./Button";
import { loginUserAction } from "../state/action-creators/authActions";
import { AuthActionType } from "../state/actions/auth";
import { RootState } from "../state";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";

const LoginUser = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowModalLogin, setShowModalRegister, setShowModalForgot } =
    useAppContext();

  const { pending } = useAppSelector((state: RootState) => state.loginUser);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleLoginUser = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUserAction(email, password) as unknown as AuthActionType);
    const timer = setTimeout(() => {
      setShowModalLogin(false);
      navigate("/");
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  };

  return (
    <div className="login__form-bcg">
      <div className="login__title">
        <img src={cannabisLogo} alt="cannabis logo" width="32" />
        <h3>login</h3>
      </div>
      <form className="login__form" onSubmit={handleLoginUser}>
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
            placeholder="password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <Link
          to="#"
          className="form__forgot-link"
          onClick={() => {
            setShowModalLogin(false);
            setShowModalForgot(true);
          }}
        >
          <span style={{ textDecoration: "underline" }}>forgot password</span>
        </Link>
        <Button type="submit" className="button button--mid" disabled={pending}>
          login
        </Button>
        <div className="already">
          <span>Do not have an account?</span>
          <Link
            to="#"
            onClick={() => {
              setShowModalLogin(false);
              setShowModalRegister(true);
            }}
          >
            <span>register</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
