import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NewChat from "./NewChat";

interface NavContentProps {
  chatLog: string[];
  setChatLog: React.Dispatch<React.SetStateAction<string[]>>;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavContent: React.FC<NavContentProps> = ({ chatLog, setChatLog, setShowMenu }) => {
  return (
    <>
      <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
      <NavLinksContainer chatLog={chatLog} setChatLog={setChatLog} />
    </>
  );
};

export default NavContent;
