export type UserType = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  photo: string;
  token: string;
};
// this type includes all the fields from authController (tokenProtect)
// in order to authenticate user
export type UserInfoType = {
  userInfo: {
    _id: string;
    status: string;
    token: string;
    user: {
      password: string;
      photo: string;
      name: string;
      email: string;
      isAdmin: boolean;
    };
  };
};

// export type UserInfoType = {
//   name: string;
//   email: string;
//   isAdmin: boolean;
//   token: string;
// };
