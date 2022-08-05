import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
const baseUrl = `http://livechat.test/chat/`;
export default function Dashboard(props) {
    const [openMessages, setOpenMessages] = useState(false);
    const [user, setUser] = useState({});
    const [conversation, setConversation] = useState({
        id: 0,
        userOne: 0,
        userTwo: 0,
        status: "",
        created_at: "",
        updated_at: "",
    });
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const selectUserHandler = async (e) => {
        try {
            await axios
                .get(`${baseUrl}` + e, {
                    params: { userTo: e, userFrom: props.auth.user.id },
                })
                .then((res) => {
                    setUser(res.data.user);
                    if (res.data.conversation === null) {
                        setMessages([]);
                        setOpenMessages(true);
                    }
                    setConversation(res.data.conversation);
                    setMessages(res.data.conversationReplies);
                    setOpenMessages(true);
                    ListenE(res.data.conversation.id);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const inputHandle = async (e) => {
        try {
            setMessage(e.target.value);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios({
                method: "post",
                url: `${baseUrl}sentMessage`,
                data: {
                    conversationId:
                        conversation === null ? null : conversation.id,
                    userTo: user.id,
                    userFrom: props.auth.user.id,
                    message,
                },
                headers: {
                    "X-Socket-Id": window.Echo.socketId(),
                },
            });
            setMessage("");
        } catch (error) {
            console.error(error);
        }
    };

    const ListenE = async (e) => {
        try {
            await Echo.private(`chat.${e}`).listen("Message", function (e) {
                setMessages((messages) => [...messages, e.message]);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-lg mx-auto sm:px-6 lg:px-8">
                    {/* <div className="max-w-7xl mx-auto sm:px-6 lg:px-8"> */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <button
                                onClick={() => setOpenMessages(false)}
                                style={{
                                    display:
                                        openMessages === false ? "none" : "",
                                }}
                                className="w-16 h-6 bg-sky-700 text-slate-100 focus:text-slate-200 focus:bg-slate-600 font-semibold rounded text-md mb-1"
                                type="button"
                            >
                                Back
                            </button>
                            <div className="min-w-full border rounded lg:grid lg:grid-cols-1">
                                {/* <div className="min-w-full border rounded lg:grid lg:grid-cols-3"> */}
                                <div
                                    style={{
                                        display:
                                            openMessages === false
                                                ? ""
                                                : "none",
                                    }}
                                    className="border-r border-gray-300 lg:col-span-1"
                                >
                                    <div className="mx-3 my-3">
                                        <div className="relative text-gray-600">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    className="w-6 h-6 text-gray-300"
                                                >
                                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                </svg>
                                            </span>
                                            <input
                                                type="search"
                                                className="block w-full py-2 pl-10 bg-gray-100 rounded outline-none"
                                                name="search"
                                                placeholder="Search"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <ul className="overflow-auto h-[32rem]">
                                        <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">
                                            Chats
                                        </h2>
                                        <li>
                                            {props.users.map((user, i) => (
                                                <a
                                                    onClick={() =>
                                                        selectUserHandler(
                                                            user.id
                                                        )
                                                    }
                                                    key={i}
                                                    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100
                                                    border-b border-gray-300 cursor-pointer focus:outline-none"
                                                >
                                                    <img
                                                        className="object-cover w-10 h-10 rounded-full"
                                                        src="https://cdn.pixabay.com/photo/2016/06/15/15/25/loudspeaker-1459128__340.png"
                                                        alt="username"
                                                    />
                                                    <div className="w-full pb-2">
                                                        <div className="flex justify-between">
                                                            <span className="block ml-2 font-semibold text-gray-600">
                                                                {user.name}
                                                            </span>
                                                            <span className="block ml-2 text-sm text-gray-600">
                                                                50 minutes
                                                            </span>
                                                        </div>
                                                        <span className="block ml-2 text-sm text-gray-600">
                                                            Good night
                                                        </span>
                                                    </div>
                                                </a>
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                                <div
                                    style={{
                                        display:
                                            openMessages === false
                                                ? "none"
                                                : "",
                                    }}
                                    className={`${
                                        openMessages === false ? "hidden" : ""
                                    }}} lg:col-span-2 lg:block`}
                                >
                                    <div className="w-full">
                                        <div className="relative flex items-center p-3 border-b border-gray-300">
                                            <img
                                                className="object-cover w-10 h-10 rounded-full"
                                                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                                                alt="username"
                                            />
                                            <span className="block ml-2 font-bold text-gray-600">
                                                {user === undefined
                                                    ? ""
                                                    : user.name}
                                            </span>
                                            <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                                        </div>
                                        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                                            <ul className="space-y-2">
                                                {messages.length === 0
                                                    ? ""
                                                    : messages.map(
                                                          (message, i) => (
                                                              <li
                                                                  key={i}
                                                                  className={`flex justify-${
                                                                      message.user_id ===
                                                                      props.auth
                                                                          .user
                                                                          .id
                                                                          ? "start"
                                                                          : "end"
                                                                  }`}
                                                              >
                                                                  <div
                                                                      className={`relative max-w-xl px-4 py-2 text-gray-700 ${
                                                                          message.user_id ===
                                                                          props
                                                                              .auth
                                                                              .user
                                                                              .id
                                                                              ? ""
                                                                              : "bg-gray-100"
                                                                      } rounded shadow`}
                                                                  >
                                                                      <span className="block">
                                                                          {
                                                                              message.body
                                                                          }
                                                                      </span>
                                                                  </div>
                                                              </li>
                                                          )
                                                      )}
                                            </ul>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                                                <button>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-6 h-6 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-5 h-5 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                        />
                                                    </svg>
                                                </button>

                                                <input
                                                    onChange={inputHandle}
                                                    type="text"
                                                    placeholder="Message"
                                                    className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                                                    name="message"
                                                    value={message}
                                                    required
                                                />
                                                <button>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="w-5 h-5 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                                        />
                                                    </svg>
                                                </button>
                                                <button type="submit">
                                                    <svg
                                                        className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
