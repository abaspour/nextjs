import Ticket from "@/app/(models)/Tickets";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/connectDB"

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const ticketData = body.formData;
    console.log(ticketData);
    await Ticket.create(ticketData);
    console.log("after create ");

    return NextResponse.json({ message: "Ticket created" }, { status: 201 });
  } catch (err) {
    console.log("error create ");
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectDB();
    const tickets = await Ticket.find();
    return NextResponse.json({tickets} , { status: 200 });
  } catch (err) {
    console.log("error create ");
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
