"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ ticket }) => {
  const EDITMODE = ticket._id === "new" ? false : true;
  const router = useRouter();
  const handelChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("failed to update Ticket.");
      }
    } else {  
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        throw new Error("failed to create Ticket.");
      }
    }
   // router.refresh();
    router.push("/");
    router.refresh();
  };
  let startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware problem",
  };
  if (EDITMODE) {
    startingTicketData["title"] = ticket.title;
    startingTicketData["description"] = ticket.description;
    startingTicketData["priority"] = ticket.priority;
    startingTicketData["progress"] = ticket.progress;
    startingTicketData["status"] = ticket.status;
    startingTicketData["category"] = ticket.category;
  }
  const [formData, setFormData] = useState(startingTicketData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handelSubmit}
      >
        <h3> {EDITMODE ? "Update Your Ticket" : "Create Your Ticket"} </h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          onChange={handelChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="Description"
          name="description"
          onChange={handelChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          id="Category"
          name="category"
          onChange={handelChange}
          required={true}
          value={formData.category}
        >
          <option value="Hardware Problem">Hardware Problem</option>
          <option value="Software Problem">Software Problem</option>
          <option value="Project">Project </option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="Priority-1"
            name="priority"
            type="radio"
            onChange={handelChange}
            required={true}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>

          <input
            id="Priority-2"
            name="priority"
            type="radio"
            onChange={handelChange}
            required={true}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>

          <input
            id="Priority-3"
            name="priority"
            type="radio"
            onChange={handelChange}
            required={true}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>

          <input
            id="Priority-4"
            name="priority"
            type="radio"
            onChange={handelChange}
            required={true}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>

          <input
            id="Priority-5"
            name="priority"
            type="radio"
            onChange={handelChange}
            required={true}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          id="Progress"
          type="range"
          min="0"
          max="100"
          name="progress"
          onChange={handelChange}
          required={true}
          value={formData.progress}
        />
        <label>Status</label>
        <select
          id="Status"
          name="status"
          onChange={handelChange}
          required={true}
          value={formData.status}
        >
          <option value="not started">Not started</option>
          <option value="started"> Started</option>
          <option value="done">Done </option>
        </select>
        <input
          type="submit"
          className="btn max-w-xs"
          value={EDITMODE ? "Upade Ticket" : "Create Ticket"}
        />
      </form>
    </div>
  );
};
export default TicketForm;
