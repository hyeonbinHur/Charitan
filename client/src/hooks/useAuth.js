import { useContext } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../context/AuthContext"; // UserContext를 임포트
import { signinCharity, signinDonor, signinAdmin } from "../utils/api/auth";
// 커스텀 훅: useAuth
export const useAuth = () => {
  const { dispatch } = useContext(UserContext); // UserContext에서 dispatch 가져오기
  const signIn = async (userEmail, userType) => {
    const userInfo = {
      email: userEmail,
    };
    console.log(userType);
    try {
      if (userType === "Charity") {
        const user = await signinCharity(userInfo); // userId로 유저 정보 가져오기
        dispatch({ type: "SIGN-IN", payload: user }); // 유저 정보 저장
        Cookies.set("user_email", userEmail);
        Cookies.set("user_type", "Charity");
      } else if (userType === "Donor") {
        console.log(userInfo);
        const user = await signinDonor(userInfo); // userId로 유저 정보 가져오기
        dispatch({ type: "SIGN-IN", payload: user }); // 유저 정보 저장
        Cookies.set("user_email", userEmail);
        Cookies.set("user_type", "Donor");
      } else if (userType === "Admin") {
        const user = await signinAdmin(userInfo); // userId로 유저 정보 가져오기
        dispatch({ type: "SIGN-IN", payload: user }); // 유저 정보 저장
        Cookies.set("user_email", userEmail);
        Cookies.set("user_type", "Admin");
      }
      return true;
    } catch (err) {
      console.error("로그인 실패:", err);
    }
  };
  const signOut = async () => {
    dispatch({ type: "SIGN-OUT" });
    Cookies.remove("user_email"); // 로그아웃 시 쿠키에서 user_id 삭제
    Cookies.remove("user_type"); // 로그아웃 시 쿠키에서 user_id 삭제
  };
  return {
    signIn,
    signOut,
  };
};
