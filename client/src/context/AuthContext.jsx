import { createContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { signinCharity, signinAdmin, signinDonor } from "../utils/api/auth";

export const UserContext = createContext();
export const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN-IN":
      return { ...state, user: action.payload };
    case "SIGN-OUT":
      return { ...state, user: null };
    default:
      return state;
  }
};
export const AuthContext = ({ children }) => {
  // named export로 수정
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const checkAuthStatus = async () => {
      const userEmail = Cookies.get("user_email");
      const userInfo = {
        email: userEmail,
      };
      const userType = Cookies.get("user_type");
      if (userEmail) {
        try {
          if (userType === "Charity") {
            const user = await signinCharity(userInfo);
            user.user_type = userType;
            dispatch({ type: "SIGN-IN", payload: user });
          } else if (userType === "Donor") {
            const user = await signinDonor(userInfo);
            user.user_type = userType;
            dispatch({ type: "SIGN-IN", payload: user });
          } else if (userType === "Admin") {
            const user = await signinAdmin(userInfo);
            user.user_type = userType;
            dispatch({ type: "SIGN-IN", payload: user });
          }
        } catch (err) {
          console.error("유저 정보를 가져오는 데 실패했습니다.", err);
        }
      }
    };
    checkAuthStatus();
  }, []);
  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
