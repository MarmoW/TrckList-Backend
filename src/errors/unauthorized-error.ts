import { ApplicationError } from "@/protocols";

export function unauthorizedError(): ApplicationError {
  console.log("here")
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
};