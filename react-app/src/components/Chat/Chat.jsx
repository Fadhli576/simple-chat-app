import EmotionLineIcon from "remixicon-react/EmotionLineIcon.js";
import ArrowLeftDownIcon from "remixicon-react/ArrowLeftSFillIcon.js";
import Attachment2 from "remixicon-react/Attachment2Icon.js";
import SendPlane from "remixicon-react/SendPlane2LineIcon.js";
import Button from "../Button/Button.jsx";
import Input from "../Input/Input.jsx";
import Message from "../Message/Message.jsx";
import { Dropdown } from "../Dropdown/Dropdown.jsx";
import { format } from "date-fns";
import Picker from 'emoji-picker-react';

const Chat = (props) => {

  return (
    <>
      {props.inChat ? (
        <div
          className={`chat md:w-2/3 ${
            props.inChat === false ? " max-md:hidden" : "flex flex-col w-full"
          } h-screen bg-gray-100 overflow-y-auto snap-end z-10 md:flex md:flex-col`}
          ref={props.messageRef}
        >
          <div className="nav flex items-center z-10 p-2 bg-gray-50 sticky top-0 h-[80px] w-full">
            <Button
              logo={<ArrowLeftDownIcon color="#6366F1" size={40} />}
              onClick={() => props.setInChat(false)}
              className="md:hidden"
            />
            <img
              src="/img/profile.png"
              alt=""
              className="rounded-full w-[50px] h-[50px] mr-4"
            />
            <h5>
              {props.selectedContact === "" ? "Kosong" : props.selectedContact}
            </h5>
          </div>
          <div
            className={`text flex-grow flex flex-col justify-end bg-indigo-300`}
          >
            {props.messages.map((message) => {
              return (
                <Message
                  message={message.body}
                  role={
                    message.send_id === props.userData.id ? "send" : "receive"
                  }
                  time={format(new Date(message.createdAt), "HH:mm")}
                />
              );
            })}
          </div>
          <form
            onSubmit={props.handleSubmit}
            className="downer sticky bg-gray-100 p-4 bottom-0 flex w-full gap-4"
          >
            {/* emoji not working */}
            {/* <Dropdown logo={<Attachment2 color="#6366F1" />} type="up">
              <Picker width={"100%"} onEmojiClick={props.onEmojiClick} />
            </Dropdown> */}

            {/* upload img in progress */}
            {/* <Dropdown logo={<Attachment2 color="#6366F1" />} type="up">
              <div className="">Upload img</div>
            </Dropdown> */}
            <Input
              ganti={(e) => props.setValue(e.target.value)}
              value={props.value}
              className="p-2 w-full focus:outline-none"
              placeholder="Type a message..."
            />
            <Button
              logo={
                <>
                  <SendPlane color="#6366F1" />
                </>
              }
            />
          </form>
        </div>
      ) : (
        <div className="chat h-screen w-2/3 max-md:hidden flex justify-center items-center bg-gray-200">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl mb-2 text-indigo-500 font-bold">Chats</h1>
            <h4>
              You can select any contacts you want to{" "}
              <span className="text-indigo-500 font-bold">chat</span>!
            </h4>
            <h4>Don't send anything naughty.</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
