import React, { useEffect, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Conversation from "./Conversation";
const baseUrl = `http://livechat.test/chat/`;
export default function Dashboard(props) {
    const [openConversation, setOpenConversation] = useState(false);
    const [user, setUser] = useState({});
    const [messages, setMessages] = useState({
        conversationreplies: [],
        user: {},
        user_two: {},
        id: 0,
        userOne: 0,
        userTwo: 0,
        status: "",
        created_at: "",
        updated_at: "",
    });

    const selectUserHandler = async (e) => {
        await axios
            .get(`${baseUrl}` + e, {
                params: { userTo: e, userFrom: props.auth.user.id },
            })
            .then((res) => {
                const messages = { ...res.data.conversation };
                const user = { ...res.data.user };
                setMessages(messages);
                setUser(user);
                setOpenConversation(true);
            });
    };
    return (
        <Authenticated auth={props.auth} errors={props.errors}>
            <Head title="Dashboard" />
            <div className="py-12">
                <div
                    className={`max-w-${
                        openConversation === false ? "lg" : "7xl"
                    } mx-auto sm:px-6 lg:px-8`}
                >
                    {/* <div className="max-w-lg mx-auto sm:px-6 lg:px-8"> */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <button
                                type="button"
                                onClick={() => setOpenConversation(false)}
                                className={`${
                                    openConversation === false ? "hidden" : ""
                                } w-16 h-6 bg-slate-300 rounded-md mb-1`}
                            >
                                Back
                            </button>
                            {/* <div className="min-w-full border rounded lg:grid lg:grid-cols-3"> */}
                            <div
                                className={`min-w-full border rounded ${
                                    openConversation === false
                                        ? ""
                                        : "lg:grid lg:grid-cols-1"
                                }`}
                            >
                                <div
                                    className={`${
                                        openConversation === true
                                            ? "hidden"
                                            : ""
                                    } border-r border-gray-300 lg:col-span-1`}
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
                                                    key={i}
                                                    onClick={selectUserHandler.bind(
                                                        this,
                                                        user.id
                                                    )}
                                                    className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out bg-gray-100 border-b border-gray-300 cursor-pointer focus:outline-none"
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
                                    className={`${
                                        openConversation === true
                                            ? ""
                                            : "hidden"
                                    } lg:col-span-2 lg:block`}
                                >
                                    <Conversation
                                        conversation={messages}
                                        auth={props.auth.user}
                                        user={user}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
