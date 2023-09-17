"use client";

import React, { useEffect, useState } from "react";

import RequestCard from "@components/RequestCard";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRequests = async () => {
      const response = await fetch(`/api/requests`);
      const data = await response.json();
      setRequests(data);
      setLoading(false);
    };

    getRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace with your loading indicator
  }
  return (
    <div>
      <h1 className="head_text text-center">All Requests</h1>
      <div className="flex flex-center gap-3 md:gap-5">
        <div className="feed">
          <div className="prompt_layout">
            {requests.map((request) => (
              <RequestCard key={request._id} request={request} />
            ))}
          </div>
        </div>
      </div>

      {requests.length === 0 && <p>No requests.</p>}
    </div>
  );
};

export default AllRequests;
