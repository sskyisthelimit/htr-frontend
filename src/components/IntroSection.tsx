import React from "react";
import BotResponse from "./BotResponse";

const IntroSection: React.FC = () => {
  return (
    <div id="introsection">
      <h1>
        Introducing HTR bot
        <BotResponse response=" - AI tool to recognize english handwriting on your data" />
      </h1>
      <h2>
        You can get a response by <span>uploading image</span> and pressing submit
      </h2>
    </div>
  );
};

export default IntroSection;
