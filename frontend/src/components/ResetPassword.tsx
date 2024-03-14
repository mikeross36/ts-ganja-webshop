import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import cannabisLogo from "../assets/cannabis-logo-2.svg";
import Button from "./Button";
import { toast } from "react-toastify";
import { resetPasswordAction, logoutUserAction } from "../state";
import { AuthActionType } from "../state/actions/auth";
import { useAppContext } from "../contexts/AppContextProvider";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetToken } = useParams();

  const dispatch = useAppDispatch();
  const { setShowModalLogin } = useAppContext();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (resetToken) {
      dispatch(
        resetPasswordAction(
          resetToken,
          password,
          confirmPassword
        ) as unknown as AuthActionType
      );
      setPassword("");
      setConfirmPassword("");
      const timer = setTimeout(() => {
        dispatch(logoutUserAction() as unknown as AuthActionType);
        setShowModalLogin(true);
      }, 3500);
      return () => {
        clearTimeout(timer);
      };
    }
  };

  return (
    <section className="reset__password section container">
      <div className="reset__form-bcg">
        <form className="reset__form" onSubmit={handleResetPassword}>
          <div className="reset__title">
            <img src={cannabisLogo} alt="cannabis logo icon" width="32" />
            <h3>reset password</h3>
          </div>
          <div className="form__control">
            <input
              type="password"
              className="form__input"
              name="password"
              placeholder="new password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form__control">
            <input
              type="password"
              className="form__input"
              name="confirmPassword"
              placeholder="confirm password..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="button button--mid">
            reset
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
