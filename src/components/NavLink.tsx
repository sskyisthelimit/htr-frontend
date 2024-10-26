import React from "react";
// import { signOut } from "firebase/auth";
// import { auth } from "../firebase.config";
// import { AuthContext } from "../context/AuthContext";
import Link from "next/link";

interface NavLinksProps {
  svg: React.ReactNode;
  link?: string;
  text: string;
  setChatLog: React.Dispatch<React.SetStateAction<string[]>>;
}

const NavLinks: React.FC<NavLinksProps> = ({ svg, link, text, setChatLog }) => {
  //   const { dispatch } = useContext(AuthContext);
  const handleClick = async (text: string) => {
    if (text === "Clear Conversations") setChatLog([]);
    if (text === "Log out") {
    //   try {
    //     let logOut = await signOut(auth);
    //     console.log("logOut", logOut);
    //     dispatch({ type: "LOGOUT" });
    //   } catch (error) {
    //     console.log("error happen during sign out", error);
    //   }
    }
  };
 
  return (
    <Link
    href={"#"} 
    onClick={() => handleClick(text)}
    >
      <div className="navPrompt">
        {svg}
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default NavLinks;
