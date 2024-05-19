"use client"
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id }) => {
  const router = useRouter();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationPosition, setConfirmationPosition] = useState({ x: 0, y: 0 });

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClick = (event) => {
    setIsConfirmationOpen(true);
    setConfirmationPosition({ x: event.clientX-200, y: event.clientY });
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faTimes}
        className="text-red-400 hover:cursor-pointer hover:text-red-200"
        onClick={handleClick}
      />
      {isConfirmationOpen && (
        <div className="absolute bg-white shadow-md rounded-lg p-4"           style={{ top: confirmationPosition.y, left: confirmationPosition.x }} >
        <p className="mb-4 text-red-400">Are you sure you want to delete this item?</p>
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => setIsConfirmationOpen(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default DeleteBlock;

/*
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

 const DeleteBlock = ({id}) => {
  const router = useRouter();

  const deleteTicket = async () =>{
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) 
      return;
     const res=await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      method : "DELETE"
    })
    if (res.ok){
      router.refresh();
    }
  }
  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer  hover:text-red-200 "
      onClick = {deleteTicket}
    />
  );
};
export default DeleteBlock;
*/
