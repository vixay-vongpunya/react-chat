import { useState } from "react";
import { connect } from "react-redux";
import { sendMessage } from "../../../Actions/Message-Action";
import { VscMic } from "react-icons/vsc";
import { VscFileCode } from "react-icons/vsc";
function ChatInput({ room, sendMessage }) {
  const [message, setMessage] = useState(" ");
  const handleEnter = (event) => {
    setMessage(event.target.value);
    console.log("sent", room.id);
    if (event.key === "Enter") {
      event.preventDefault();
      if (message.trim() !== "") {
        const data = {
          receiver_id: room.id,
          destination_id: room.email ? room.friendship_id : room.id,
          destination_type: room.email ? "user" : "group",
          content: message,
        };
        sendMessage(data);
        setMessage("");
      }
    }
  };
  return (
    <div className="flex items-center px-4 ">
      <VscFileCode size="32" />
      <textarea
        value={message}
        type="text"
        className="no-scrollbar w-full h-full rounded outline-none resize-none  mx-2  px-4 py-2 "
        onChange={(event) => setMessage(event.target.value)}
        onKeyDown={handleEnter}
      ></textarea>
      <VscMic size="32" />
    </div>
  );
}
export default connect(null, { sendMessage })(ChatInput);
