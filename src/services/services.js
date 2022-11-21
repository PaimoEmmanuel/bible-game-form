import request from ".";
import requestBibleText from "./bible-text";

export const login = () =>
  request.post("/auth/login", {
    email: "john@doe.com",
    password: "password",
  });

export const getBibleBooks = () => request.get("/books");

export const getTags = () => request("/tag");

export const getCategories = () => request("/game-difficulty");

export const getBibleText = (book, chapter, verses) =>
  requestBibleText.get(
    `/books/${book}/chapters/${chapter}/verse/KJV/[${verses}]`
  );

export const submitEntry = (entry) => {
  return request.post("/gamebank", entry);
};
