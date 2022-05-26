import jwt_decode from "jwt-decode";

export const authenticate = (token, cb) => {
  localStorage.setItem("jwt", JSON.stringify(token));
  cb();
};

export const isAuthenticated = () => {
  if (localStorage.getItem("jwt")) {
    const { exp } = jwt_decode(JSON.parse(localStorage.getItem("jwt")));
    if (new Date().getTime() <= exp * 1000) {
      return true;
    } else {
      localStorage.removeItem("jwt");
      return false;
    }
  } else {
    return false;
  }
};

export const userInfo = () => {
  if (localStorage.getItem("jwt")) {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    const decode = jwt_decode(jwt);
    return { ...decode, token: jwt };
  } else {
    return {};
  }
};
