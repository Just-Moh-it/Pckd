import { gql } from "@apollo/client";

export const PING = gql`
  query Ping {
    ping
  }
`;
