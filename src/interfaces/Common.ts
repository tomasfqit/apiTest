import { AxiosError } from "axios";

export type ErrorType = {
  message: string;
  code: number;
};
export type AxiosErrorType = AxiosError<ErrorType>;
