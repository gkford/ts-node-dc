import { Message } from "./message.model";

export const getPublicMessage = (): Message => {
  return {
    text: "This is a public message. Also I like a public carrot",
  };
};

export const getProtectedMessage = (): Message => {
  return {
    text: "This is a protected message. Also, I love bananas",
  };
};

export const getAdminMessage = (): Message => {
  return {
    text: "This is an admin message.",
  };
};