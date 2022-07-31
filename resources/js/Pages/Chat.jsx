import React, { useEffect, useRef, useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/inertia-react";
import Conversation from "./Conversation";
const baseUrl = `http://livechat.test/chat/`;
export default function Dashboard(props) {
    const [openConversation, setOpenConversation] = useState(false);
    const selectUserHandler = async (e) => {
        await axios.post(`${baseUrl}` + e, { id: e }).then((res) => {
            const { conversation } = res.data;
            setOpenConversation(true);
            console.log(conversation);
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div
                                className={`min-w-full border rounded lg:grid lg:grid-cols-${
                                    openConversation === false ? "1" : "3"
                                }`}
                            >
                                <div className="border-r border-gray-300 lg:col-span-1">
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
                                {/* <Conversation /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
