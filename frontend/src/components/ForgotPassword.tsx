import cannabisLogo from "../assets/cannabis-logo-2.svg";
import Button from "./Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../utils/apiClient";
import { useAppContext } from "../contexts/AppContextProvider";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { setShowModalForgot } = useAppContext();

  const handleFormSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await apiClient.post("/api/v1/users/forgot-password", {
        email,
      });
      if (data.status === "success") {
        toast.success(data.message);
      }
      setEmail("");
      setShowModalForgot(false);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="forgot__form-container">
      <form className="forgot__form" onSubmit={handleFormSubmit}>
        <div className="forgot__title">
          <img src={cannabisLogo} alt="cannabis logo icon" width="32" />
          <h3>enter your email</h3>
        </div>
        <div className="input__control">
          <input
            type="email"
            className="form__input"
            name="email"
            placeholder="your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="button button--mid">
          send
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
