import style from "./Avatar.module.css"

import Image from "next/image";

const Avatar = ({ name, imageSrc }) => {
  return (
    <ul className={style.avatarWrapper}>
      <li>
        <Image
          width={32}
          height={32}
          src={imageSrc}
          alt={`Avatar do usuário ${name}`}
        />
      </li>
      <li>@{name}</li>
    </ul>
  );
};

export default Avatar;
