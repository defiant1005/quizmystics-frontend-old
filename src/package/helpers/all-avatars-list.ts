import image1 from "@/assets/avatars/1.svg";
import image2 from "@/assets/avatars/2.svg";
import image3 from "@/assets/avatars/3.svg";
import image4 from "@/assets/avatars/4.svg";
import image5 from "@/assets/avatars/5.svg";
import image6 from "@/assets/avatars/6.svg";
import image7 from "@/assets/avatars/7.svg";
import image8 from "@/assets/avatars/8.svg";
import image9 from "@/assets/avatars/9.svg";
import image10 from "@/assets/avatars/10.svg";
import image11 from "@/assets/avatars/11.svg";
import image12 from "@/assets/avatars/12.svg";
import image13 from "@/assets/avatars/13.svg";
import image14 from "@/assets/avatars/14.svg";
import image15 from "@/assets/avatars/15.svg";
import image16 from "@/assets/avatars/16.svg";
import image17 from "@/assets/avatars/17.svg";
import image18 from "@/assets/avatars/18.svg";
import image19 from "@/assets/avatars/19.svg";

export function allAvatarsList() {
  return [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
    image14,
    image15,
    image16,
    image17,
    image18,
    image19,
  ];
}

export function getRandomAvatar() {
  const random = Math.floor(Math.random() * allAvatarsList().length);

  return allAvatarsList()[random];
}
