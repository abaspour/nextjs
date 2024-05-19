import User from "@/app/(models)/Users";
import UserLog from "@/app/(models)/UserLogs";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import connectDB from "@/app/lib/connectDB";
//import { getSession } from "next-auth/client";


export async function POST(req, res) {
  await connectDB();

  const body = await req.json();
  console.log(body);
  const { email, password } = body;
  // Perform basic input validation

  if (!email || !password) {
    return NextResponse.json({
      errors: [{ msg: "Invalid Credentials" }],
    });
  }
  // See if user exists
  let user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({
      errors: [{ msg: "Invalid Credentials" }],
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json({
      errors: [{ msg: "Invalid Credentials" }],
    });
  }
  const log = {
    email: body.email,
    latitude: body.latitude ? body.latitude : "null",
    longitude: body.longitude ? body.longitude : "null",
    logDate: new Date(), // Current date and time
    ipAddress: req.ip ? req.ip : "null", // Client's IP address
  };

  UserLog.create(log)
    .then(function (log) {
      // Log created successfully
      console.log("Log created successfully: " );
    })
    .catch(function (error) {
      console.log(error);
    });
  // Return JSON Web Token (JWT)
  const payload = {
    user: {
      id: user.id,
    },
  };

  // Convert jwt.sign() to a promise-based function
  const signPromise = new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });

  // Wait for jwt.sign() to complete and retrieve the token
  const token = await signPromise;
  // save in session
  // const session = await getSession({ req });
  // session.set("token", token);
  // session.set("user", user);
  // await session.save();
// Clear the password before sending the user object in the response
  user.password = "";
  return NextResponse.json({ token, user }, { status: 200 });
}
/*
//////////////////////////////////////////////////////////////////////////
// pages/api/protected-route.js

import { getSession } from "next-auth/client";
import jwtDecode from "jwt-decode";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || !session.token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Decode the token to get its payload
    const decodedToken = jwtDecode(session.token);

    // Check if the token has an expiry time
    if (decodedToken.exp < Date.now() / 1000) {
      return res.status(401).json({ error: "Token expired" });
    }

    // Token is valid and has not expired
    // Proceed with the logic for the protected route
    // Example: Fetch data from the database, perform some operation, etc.
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
////////////////////////////////////////////////////////////
// pages/api/protected-route.js

import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // User is authenticated, proceed with the logic for the protected route
  // Example: Fetch data from the database, perform some operation, etc.
}

///////////////////////////////////////////////////////////
// pages/api/protected-route.js

import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token is valid, proceed with the logic for the protected route
    // Example: Fetch data from the database, perform some operation, etc.
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
}




/*
import User from "@/app/(models)/User";
import UserLog from "@/app/(models)/UserLog";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log(body);
    const { email, password } = body;
    // Perform basic input validation
    if (!email || !password) {
      return NextResponse.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }
    // See if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }
    const log = {
      email: body.email,
      latitude: body.latitude ? body.latitude : "null",
      longitude: body.longitude ? body.longitude : "null",
      logDate: new Date(), // Current date and time
      ipAddress: req.ip, // Client's IP address
    };

    UserLog.create(log)
      .then(function (log) {
        // Log created successfully
        console.log("Log created successfully: " + req.body.email);
      })
      .catch(function (error) {
        console.log("cannot create userLog.");
      }); */
// Return jasonwebtoken
/*const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) {
          return NextResponse.status(400).json({
            errors: [{ msg: "Invalid Credentials" }],
          });
        } else {
          user.password = "";
          return NextResponse.status(200).json({ token, user });
        }
      }
    );
  } catch (err) {
    console.error(err.message);
    return NextResponse.status(500).send("Server Error");
  }
}*/
