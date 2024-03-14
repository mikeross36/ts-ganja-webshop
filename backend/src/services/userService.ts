import { UserModel } from "../models";
import { UserInput } from "../models/userModel";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findAllUsers() {
  try {
    const users = await UserModel.find().lean();
    return users;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = await UserModel.findOne({ email }).select("+password");
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findUserById(id: string) {
  try {
    const user = await UserModel.findById(id).select("+password");
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findUserAndUpdate(id: string, input: UserInput) {
  try {
    const user = await UserModel.findByIdAndUpdate(id, input, {
      new: true,
    });
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findUserAndDelete(id: string) {
  try {
    const user = await UserModel.findByIdAndDelete(id);
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}

export async function findUserByResetToken(hashedToken: string) {
  try {
    const user = await UserModel.findOne({
      passwordResetToken: hashedToken,
    });
    return user;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
}
