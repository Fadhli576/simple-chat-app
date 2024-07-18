import { useState } from "react";
import { Dropdown } from "../Dropdown/Dropdown.jsx";
import Input from "../Input/Input.jsx";
import MoreLine from "remixicon-react/MoreLineIcon.js";

const Contact = (props) => {
  const [search, setSearch] = useState("");

  const filteredData = props.data.filter((data) =>
    data.name.toLowerCase().includes(search.toLowerCase())
  );

  function clickContact(data) {
    props.fetchMessage(data);
    props.setInChat(true);
  }

  return (
    <div className={`contact md:w-1/3 ${props.inChat === false ? 'max-md:w-full' : 'max-md:hidden'} z-20 h-screen p-3 bg-gray-50 overflow-y-auto inline scroll-smooth`}>
      <div className="nav bg-gray-100 fixed top-0 left-0 right-0 w-full md:w-1/3 p-4 h-[80px]">
        <div className="upper flex justify-between">
          <h1 className="text-2xl mb-2 text-indigo-500 font-bold">Chats</h1>
          <div className="button flex gap-5">
            <Dropdown logo={<MoreLine color="#6366F1" />}>
              <div className="">Profile</div>
              <div className="">Settings</div>
            </Dropdown>
          </div>
        </div>
        <div className="downer">
          <Input
            ganti={(e) => setSearch(e.target.value)}
            className="w-full border-b-2 ease-out duration-300 focus:outline-none focus:border-indigo-500 p-1"
            placeholder="Start or search a new chat."
          />
        </div>
      </div>
      <div className="content my-24">
        {filteredData.length > 0 ? (
          filteredData.map((data, key) => {
            return (
              <div
                key={key}
                onClick={() => clickContact(data)}
                className="person flex align-middle hover:bg-slate-200 p-2 my-3 ease-out duration-300 "
              >
                <img
                  src="/img/profile.png"
                  alt=""
                  className="rounded-full w-[50px] h-[50px] mr-4"
                />
                <div className="detail flex flex-col justify-center w-full">
                    <h5>{data.name}</h5>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No chats found</div>
        )}
      </div>
    </div>
  );
};

export default Contact;
