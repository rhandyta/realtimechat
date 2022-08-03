import axios from "axios";
import React, { useState } from "react";
const baseUrl = `http://livechat.test/chat/sentMessage`;
export default function Conversation({ conversation, auth, user }) {
    const [message, setMessage] = useState("");

    const inputHandle = (e) => {
        setMessage(e.target.value);
    };
    Echo.private(`chat.${conversation.id}`).listen("Message", (e) => {
        console.log("berhasil listen");
        console.log(e);
    });
    const submitHandle = async (e) => {
        e.preventDefault();
        // await axios
        //     .post(`${baseUrl}`, {
        //         conversationId: conversation.id || null,
        //         userTo: user.id,
        //         userFrom: auth.id,
        //         message,
        //     })
        //     .then((res) => {})
        //     .catch((error) => {});
        await axios({
            method: "post",
            url: `${baseUrl}`,
            data: {
                conversationId: conversation.id || null,
                userTo: user.id,
                userFrom: auth.id,
                message,
            },
            headers: {
                "X-Socket-Id": window.Echo.socketId(),
            },
        });
        setMessage("");
    };
    return (
        <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                    className="object-cover w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                    alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">
                    {user.name}
                </span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
            <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                    {conversation.conversationreplies !== undefined
                        ? conversation.conversationreplies.map((message, i) => (
                              <li
                                  key={i}
                                  className={`flex justify-${
                                      auth.id !== message.user_id
                                          ? "end"
                                          : "start"
                                  }`}
                              >
                                  <div
                                      className={`relative max-w-xl px-4 py-2 text-gray-700 rounded shadow ${
                                          message.user_id === auth.id
                                              ? "bg-gray-100"
                                              : ""
                                      }`}
                                  >
                                      <span className="block">
                                          {message.body}
                                      </span>
                                  </div>
                              </li>
                          ))
                        : "Tidak ada data"}
                    {/* <li className="flex justify-end">
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                <span className="block">Hiiii</span>
                            </div>
                        </li> */}
                </ul>
            </div>

            <form onSubmit={submitHandle} method="post">
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
                        value={message}
                        type="text"
                        placeholder="Message"
                        className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                        name="message"
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
    );
}
