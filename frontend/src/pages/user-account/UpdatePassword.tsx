import { useState } from "react";
import Button from "../../components/Button";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updatePasswordAction } from "../../state";
import { toast } from "react-toastify";
import { AuthActionType } from "../../state/actions/auth";

const UpdatePassword = () => {
  const [loginPassword, setLoginPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    dispatch(
      updatePasswordAction(
        loginPassword,
        password,
        confirmPassword
      ) as unknown as AuthActionType
    );
    setLoginPassword("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="user__account-form-container">
      <form className="form__user-password" onSubmit={handleUpdatePassword}>
        <h3 className="form__title">password update</h3>
        <div className="form__control">
          <input
            type="password"
            name="current-password"
            className="form__input"
            placeholder="current password..."
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
        </div>
        <div className="form__control">
          <input
            type="password"
            name="password"
            className="form__input"
            placeholder="new password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form__control">
          <input
            type="password"
            name="password-confirm"
            className="form__input"
            placeholder="confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="button button--XSmall">
          update
        </Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
