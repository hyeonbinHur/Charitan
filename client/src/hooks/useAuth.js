import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../context/AuthContext"; // UserContext를 임포트
import { signinCharity, signinDonor, signinAdmin } from "../utils/api/auth";

// 커스텀 훅: useAuth
export const useAuth = () => {
  const { dispatch } = useContext(UserContext); // UserContext에서 dispatch 가져오기
  const [user,setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwtToken"));

  // sign in
  const signIn = async (email, password, userType) => {
    try {
        console.log("Attempting login with:", { email, password, userType });

      const response = await fetch ("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userType }), // Send userType
      });

       console.log("Server response status:", response.status); // Log the response status
       console.log("Server response headers:", response.headers); // Log the response headers

      if (!response.ok){
        const errorData = await response.text(); // Read the server's error response
                    console.error("Server error response:", errorData);
                    const errorMessage = errorData || `Unexpected error occurred. Status code: ${response.status}`;
                    throw new Error(`Server error: ${errorMessage}`);
      }

      const data = await response.json();
      console.log("Login successful. Token received:", data.jwtToken);
      console.log("Login successful. Response data:", data);
      
      // Store JWT
      localStorage.setItem("jwtToken", data.jwtToken);
      setToken(data.jwtToken);

      const loggedInUser = { email, userType};
      setUser(loggedInUser);

      return true;

    } catch (error){
      console.error("Login Fail", error.message)
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
