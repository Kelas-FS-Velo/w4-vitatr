export interface IUser {
  name: string;
  email: string;
  role?: "admin" | "user";
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IValidationError {
  [key: string]: string[];
}
