export interface IUser {
  id: number;
  name: string;
  email: string;
  role?: "admin" | "user";
}

export interface ILoginPayload {
  email: string;
  password: string;
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
