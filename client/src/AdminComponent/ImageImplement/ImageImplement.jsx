import pic1 from "../../../public/img/man.png";
import pic2 from "../../../public/img/man-2.png";
import pic3 from "../../../public/img/man-3.png";
import pic4 from "../../../public/img/woman.png";
import pic5 from "../../../public/img/woman-2.png";
import pic6 from "../../../public/img/woman-3.png";

export default function imgLoadFromPublic(str) {
    if(str === "./img/man.png") {
        return pic1;
    } else if(str === "./img/man-2.png") {
        return pic2;
    } else if(str === "./img/man-3.png") {
        return pic3;
    } else if(str === "./img/woman.png") {
        return pic4;
    }else if(str === "./img/woman-2.png") {
        return pic5;
    } else {
        return pic6;
    }
}
