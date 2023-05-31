"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import NewChat from "./NewChat";
import ModelSelection from "./ModelSelection";

function SideBar() {
  const { data: session } = useSession();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const [chats, loading, error] = useCollection(
    session &&
      query(collection(db, "users", session?.user?.email!, "chats"), orderBy("createdAt", "asc"))
  );

  console.log(chats);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    signOut();
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="hidden md:flex flex-col h-screen p-2">
      <div className="flex-1">
        <div>
          <NewChat />

          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            {/* Map through the ChatRows */}
            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>

      {session && (
        <>
          <img
            onClick={handleLogout}
            src={session.user?.image!}
            alt="Profile Pic"
            className="rounded-full w-10 h-10 cursor-pointer mx-auto mb-2 hover:opacity-50"
            style={{ borderRadius: "25px" }}
          />

          {showLogoutPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-4 rounded-lg">
                <p>Are you sure you want to log out?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 mr-2 text-sm font-medium text-gray-500 uppercase bg-transparent border border-gray-300 rounded-lg hover:bg-gray-100"
                    onClick={handleCancelLogout}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 text-sm font-medium text-red-500 uppercase bg-transparent border border-red-500 rounded-lg hover:bg-red-100"
                    onClick={handleConfirmLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SideBar;
