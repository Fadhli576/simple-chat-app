import { useEffect, useState, useRef } from "react";
import useLoginMiddleware from "../middleware/LoginMiddleware";
import io from "socket.io-client";
import Contact from "../Contact/Contact";
import Chat from "../Chat/Chat";
import { useNavigate } from "react-router";

const socket = io.connect("http://localhost:8000");

const Chater = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [contact, setContact] = useState();
  const [selectedContact, setSelectedContact] = useState();
  const [value, setValue] = useState("");
  const [messages, setMessage] = useState([]);
  const [inChat, setInChat] = useState(false);
  const userData = useLoginMiddleware();
  const messageRef = useRef(null);

  socket.on("receive-message", (message) => {
    setMessage([...messages, message]);
  });

  const onEmojiClick = (e, emojiObject) => {
    setValue((prevInput) => prevInput + emojiObject.emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!value == "") {
      socket.emit("send-message", {
        message: value,
        data: userData,
        receiver: contact,
      });
      setValue("");
      scrollToEnd();
    }
  };

  const scrollToEnd = () => {
    if (messageRef.current) {
      const scrollHeight = messageRef.current.scrollHeight;
      const height = messageRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      messageRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  const fetchUser = async () => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        console.log("Token not found");
        navigate("/login");
        return;
      }
      const response = await fetch("http://localhost:9000/api/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setData(await response.json());
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const fetchMessage = async (receiver) => {
    try {
      const response = await fetch(
        `http://localhost:9000/api/messages/${userData.id}/${receiver._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setMessage(await response.json());
        setContact(receiver._id);
        setSelectedContact(receiver.name);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    const chatContainer = messageRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, messageRef]); // Update scroll on message change

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex">
      <Contact
        data={data}
        fetchMessage={fetchMessage}
        inChat={inChat}
        setInChat={setInChat}
      />
      <Chat
        messageRef={messageRef}
        setValue={setValue}
        value={value}
        handleSubmit={handleSubmit}
        selectedContact={selectedContact}
        messages={messages}
        userData={userData}
        inChat={inChat}
        setInChat={setInChat}
        onEmojiClick={onEmojiClick}
      />
    </div>
  );
};

export default Chater;
