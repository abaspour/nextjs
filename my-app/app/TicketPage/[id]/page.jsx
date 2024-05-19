import TicketForm from "@/app/(componnents)/TicketForm";

const TicketPage = async ({ params }) => {
  const getTicket = async () => {
    try {
      const cacheBuster = Math.random().toString(36).substring(7);
      const url = `http://localhost:3000/api/Tickets/${params.id}/?cache=${cacheBuster}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("fielid to get Ticket.");
      }
      return await res.json();
    } catch (e) {
      console.log("fail to get tickets", e);
    }
  };
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData = {};
  if (EDITMODE) {
    updateTicketData = await getTicket();
    updateTicketData = updateTicketData.foundTicket;
    console.log(updateTicketData);
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return (
    <div>
      <TicketForm ticket={updateTicketData} />
    </div>
  );
};
export default TicketPage;
