import { NavigateFunction } from "react-router-dom";

export const safeGoBack = (navigate: NavigateFunction, fallbackPath = "/") => {
  if (window.history.length > 1) {
    navigate(-1);
  } else {
    navigate(fallbackPath);
  }
};