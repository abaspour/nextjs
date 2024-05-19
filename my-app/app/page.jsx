import TicketCard from "@/app/(componnents)/TicketCard";
const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets?timestamp=" + Date.now());
    return res.json();
  } catch (e) {
    console.log("fail to get tickets", e);
  }
};
const Dashboard = async() => {
  const { tickets } = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories?.map((uniqueCategory, index) => (
            <div key={index} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-4 ">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      id={_index}
                      key={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
