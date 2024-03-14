/* eslint-disable @typescript-eslint/no-namespace */
// we need this file for authenticate user
// Request is defined in Express namespace
// we are editing Request of Express by adding user object to Request
// for authentication request we have user information in sent request
// so we need to have this type in Request of Express to be able to
// access them and authenticate user
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Express {
  export interface Request {
    user: {
      _id: string;
      name: string;
      email: string;
      isAdmin: boolean;
      token: string;
    };
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
