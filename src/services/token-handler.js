import { login } from "./services";
const saveTokenLocally = (token) => {
  localStorage.setItem("egfmbg-tk", JSON.stringify(token));
};

export const getToken = () =>
  new Promise((resolve, reject) => {
    const timeStamp = JSON.parse(
      localStorage.getItem("egfmbg-tk") || "{}"
    ).timeStamp;
    // Delete token after 23 hours. 82800000 = 23 hours in miliseconds
    if (timeStamp === undefined || timeStamp + 82800000 < Date.now()) {
      localStorage.removeItem("egfmbg-tk");
      login()
        .then((res) => {
          const localObject = {
            token: res.data.token,
            timeStamp: Date.now(),
          };
          saveTokenLocally(localObject);
          resolve(localObject.token);
        })
        .catch((err) => reject(err));
    } else {
      const localObject = JSON.parse(localStorage.getItem("egfmbg-tk") || "{}");
      const token = localObject.token;
      resolve(token);
    }
  });
