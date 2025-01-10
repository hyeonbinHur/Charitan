import { axiosInstance } from "./axiosUtils";
const readAcceptLanguageHeader = async () => {
  try {
    console.log("here");
    const response = await axiosInstance.get("language");
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error("Error while read user's Accept language header", err);
  }
};
export { readAcceptLanguageHeader };
