import React from "react";
import NavLinksContainer from "./NavLinksContainer";
import NewChat from "./NewChat";

const NavContent = ({ chatLog, setChatLog, setShowMenu }) => {
  return (
    <>
      <NewChat setChatLog={setChatLog} setShowMenu={setShowMenu} />
      <NavLinksContainer chatLog={chatLog} setChatLog={setChatLog} />
    </>
  );
};

export default NavContent;
