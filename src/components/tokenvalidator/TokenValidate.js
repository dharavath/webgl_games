import jwtDecode from "jwt-decode";

export const GetDecodedToken = () => {
  try {
    let gettoken = sessionStorage.getItem("token");
    console.log("main", gettoken);
    console.log("ASDFASd", typeof gettoken);
    let token;
    // let token = window.sessionStorage.getItem("token");
    if (gettoken) {
      // let user_object = gettoken;
      console.log("Tt", gettoken);

      let DecodedToken = jwtDecode(gettoken);
      console.log("decode", DecodedToken);

      return token;
    } else {
      console.log("Token Not Found");
      return false;
    }
  } catch (error) {
    console.log("ERR", error);
  }
};

export const ValidateToken = () => {
  try {
    const DecodedToken = GetDecodedToken();
    if (DecodedToken) {
      let currentDate = new Date();
      console.log("exptime", DecodedToken.exp);
      if (DecodedToken.exp * 1000 * 60 < currentDate.getTime()) {
        // window.location.reload();
        console.log("Token Expired");
        return false; //Token Expired
      } else {
        return true; //Token Not Expired
      }
    } else {
      console.log("Token NotFound");
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
