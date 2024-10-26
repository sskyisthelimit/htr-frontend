import React, { useEffect, useState, MutableRefObject } from "react";

interface BotResponseProps {
  response: string;
  chatLogRef?: MutableRefObject<HTMLDivElement | null>;
}

const BotResponse: React.FC<BotResponseProps> = ({ response, chatLogRef }) => {
  const [botResponse, setBotResponse] = useState("");
  const [isPrinting, setIsPrinting] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    let index = 1;
    const msg = setInterval(() => {
      if (response !== " - AI tool to recognize english handwriting on your data" &&
          response !== "Authorise in handwriting recognition bot or continue as guest" &&
          response !== "your chat data won't be saved and you will only have one chat avaliable.")
      {
        setIsButtonVisible(true);
      }
      if (!isPrinting) {
        clearInterval(msg);
        return;
      }
      setBotResponse(response.slice(0, index));
      if (index >= response.length) {
        clearInterval(msg);
        setIsButtonVisible(false);
      }
      index++;

      if (chatLogRef) {
        chatLogRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 50);
    return () => clearInterval(msg);
  }, [chatLogRef, response, isPrinting]);

  const stopPrinting = () => setIsPrinting(!isPrinting);

  return (
    <>
      <pre>
        {botResponse}
        {botResponse === response ? "" : "|"}
      </pre>
      {/* {isButtonVisible && (
        <button className="stop-message" onClick={stopPrinting}>
          {isPrinting ? "Stop Message" : "Regenerate Message"}
        </button>
      )} */}
    </>
  );
};

export default BotResponse;
