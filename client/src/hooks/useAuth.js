import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../context/AuthContext"; // UserContext를 임포트
import { signinCharity, signinDonor, signinAdmin } from "../utils/api/auth";
import { log } from "console";

// 커스텀 훅: useAuth
export const useAuth = () => {
  const { dispatch } = useContext(UserContext); // UserContext에서 dispatch 가져오기
  const [user,setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  // sign in
  const signIn = async (email, password, userType) => {
    try {
      const response = await fetch ("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }), // Send userType
      });

      if (!response.ok){
        throw new Error ("Invalid login credentials");
      }

      const data = await response.json();

      // Store JWT
      localStorage.setItem("jwtToken", data.jwtToken);
      setToken(data.jwtToken);

      const loggedInUser = { email, userType};
      setUser(loggedInUser);

      return true;

    } catch (error){
      return false;
    }
  };

  // const signIn = async (userEmail, userType) => {
  //   const userInfo = {
  //     email: userEmail,
  //   };
  //   try {
  //     if (userType === "Charity") {
  //       const user = await signinCharity(userInfo); // userId로 유저 정보 가져오기
  //       user.user_type = userType;
  //       dispatch({ type: "SIGN-IN", payload: user }); // 유저 정보 저장
  //       Cookies.set("user_email", userEmail);
  //       Cookies.set("user_type", "Charity");
  //     } else if (userType === "Donor") {
  //       console.log(userInfo);
  //       const user = await signinDonor(userInfo); // userId로 유저 정보 가져오기
  //       user.user_type = userType;
  //       dispatch({ type: "SIGN-IN", payload: user }); // 유저 정보 저장
  //       Cookies.set("user_email", userEmail);
  //       Cookies.set("user_type", "Donor");
  //     } else if (userType === "Admin") {
  //       const user = await signinAdmin(userInfo); // userId로 유저 정보 가져오기
  //       user.user_type = userType;
  //       dispatch({ type: "SIGN-IN", payload: user }); // 유저 정보 저장
  //       Cookies.set("user_email", userEmail);
  //       Cookies.set("user_type", "Admin");
  //     }
  //     return true;
  //   } catch (err) {
  //     console.error("로그인 실패:", err);
  //   }
  // };

const isAuthenticated = () => !!token;

    useEffect(() => {
      const savedToken = localStorage.getItem("jwtToken");
      if(savedToken){
        setToken(savedToken);
      }
    }, []);

  const signOut = async () => {
    dispatch({ type: "SIGN-OUT" });
    Cookies.remove("user_email"); // 로그아웃 시 쿠키에서 user_id 삭제
    Cookies.remove("user_type"); // 로그아웃 시 쿠키에서 user_id 삭제
    setUser(null);
    setToken(null);
  };
  return {
    signIn,
    signOut,
    user,
    token,
    isAuthenticated
  };
};
