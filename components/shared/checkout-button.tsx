"use client";
import { IEvent } from "@/lib/db/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CheckOut } from "./checkout";

export const CheckOutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata?.userId as string;

  const hasEventFinished = new Date(event.endDateTime) < new Date();
  return (
    <div className="flex gap-3 items-center">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry,Tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size={"lg"}>
              <Link href={"/sign-in"}>Get Tickets</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <CheckOut event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};
