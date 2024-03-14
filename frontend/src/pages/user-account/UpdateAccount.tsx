import { useAppSelector } from "../../hooks/useAppSelector";
import { RootState, logoutUserAction } from "../../state";
import { UserInfoType } from "../../types/UserTypes";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateUserAccountAction } from "../../state/action-creators/userActions";
import { UserActionType } from "../../state/actions/user";
import Button from "../../components/Button";
import { AuthActionType } from "../../state/actions/auth";
import { useNavigate } from "react-router-dom";

const UpdateAccount = () => {
  const {
    userInfo: { user },
  } = useAppSelector((state: RootState) => state.loginUser as UserInfoType);

  const [currentUserName, setCurrentUserName] = useState(user ? user.name : "");
  const [currentUserEmail, setCurrentUserEmail] = useState(
    user ? user.email : ""
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUpdateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUserAccountAction(
        currentUserName,
        currentUserEmail
      ) as unknown as UserActionType
    );
    dispatch(logoutUserAction() as unknown as AuthActionType);
    navigate("/");
  };

  return (
    <div className="user__account-form-container">
      <form
        onSubmit={handleUpdateAccount}
        className="form__user-data"
        encType="multipart/form-data"
      >
        <h3 className="form__title">data update</h3>

        <div className="form__control">
          <input
            type="text"
            className="form__input"
            name="name"
            value={currentUserName}
            onChange={(e) => setCurrentUserName(e.target.value)}
          />
        </div>

        <div className="form__control">
          <input
            type="email"
            className="form__input"
            name="email"
            value={currentUserEmail}
            onChange={(e) => setCurrentUserEmail(e.target.value)}
          />
        </div>
        <span>
          <Button type="submit" className="button button--XSmall">
            update
          </Button>
        </span>
      </form>
    </div>
  );
};

export default UpdateAccount;
