import Ticket from "@/app/(models)/Tickets";
import connectDB from "@/app/lib/connectDB"

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    await connectDB();
    const foundTicket = await Ticket.findOne({ _id: id });
    return NextResponse.json({ foundTicket }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await connectDB();

    await Ticket.findByIdAndDelete(id); 

    return NextResponse.json({ message: "ticket deleted" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
 export async function PUT(req, { params }) {
  try {
    await connectDB();

    const { id } = params; 
    const body = await req.json();
    const ticketData=body.formData;

    const updateTicketData=await Ticket.findByIdAndUpdate(id, { ...ticketData,}); 

    return NextResponse.json({ message: "ticket updated" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
