import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const webhookSecret: string = process.env.NGROK_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const payload = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId);
    console.log("svixIdTimeStamp", svixIdTimeStamp);
    console.log("svixSignature", svixSignature);
    return new Response("Error occurred", {
      status: 400,
    });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as Event;
  } catch (_) {
    console.log("error");
    return new Response("Error occurred", {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    const { id: uuid, username: username } = evt.data;
    console.log("user.created: ", uuid);

    // Create a new user in the database using Prisma
    try {
      const newUser = await prisma.user.create({
        data: {
          uuid: uuid,
          username: username,
        },
      });
      console.log("New User Created: ", newUser);
      return new Response("User created successfully", {
        status: 201, // 201 Created
      });
    } catch (error) {
      console.error("Error creating user: ", error);
      return new Response("Error creating user", {
        status: 500, // 500 Internal Server Error
      });
    }
  } else if (eventType === "user.deleted") {
    const { id: uuid } = evt.data;
    console.log("user.deleted: ", uuid);

    try {
      await prisma.user.delete({
        where: { uuid: uuid },
      });
      console.log("User Deleted: ", uuid);
      return new Response("User deleted successfully", {
        status: 200, // 200 OK
      });
    } catch (error) {
      console.error("Error deleting user: ", error);
      return new Response("Error deleting user", {
        status: 500, // 500 Internal Server Error
      });
    }
  } else if (eventType === "user.updated") {
    const { id: uuid, username: username } = evt.data;
    console.log("user.updated: ", uuid);

    try {
      const updatedUser = await prisma.user.update({
        where: { uuid: uuid },
        data: { username: username },
      });
      console.log("User Updated: ", updatedUser);
      return new Response("User updated successfully", {
        status: 200, // 200 OK
      });
    } catch (error) {
      console.error("Error updating user: ", error);
      return new Response("Error updating user", {
        status: 500, // 500 Internal Server Error
      });
    }
  }

  return new Response("bad request", {
    status: 400, // 400 Bad Request
  });
}

type Event = {
  data: Record<string, any>;
  object: "event";
  type: EventType;
};

type EventType = "user.created" | "user.deleted" | "user.updated";