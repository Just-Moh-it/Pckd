import React from "react";
import { useQuery } from "@apollo/client";
import { PING } from "../queries/ping";

const Ping = () => {
  const { loading, error, data } = useQuery(PING);
  console.log(PING)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return <p>{data.ping}</p>;
  // return <h1>Ping Page!</h1>
};

export default Ping;
