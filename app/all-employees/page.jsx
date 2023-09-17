"use client";

import { useSession } from "next-auth/react";

import React from "react";
import Link from "next/link";
import Feed from "@components/Feed";

const AllEmployees = () => {
  const { data: session } = useSession();

  return (
    <div>
      <div className="flex flex-center gap-3 md:gap-5">
        {session?.user ? (
          <Link href="/all-employees/add-employee" className="blue_btn">
            Add employee
          </Link>
        ) : (
          <></>
        )}
      </div>

      <Feed />
    </div>
  );
};

export default AllEmployees;
