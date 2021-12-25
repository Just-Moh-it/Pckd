import { gql } from "@apollo/client";

// Get PCKDs info for left side bar on dashboard
export const GET_ALL_PCKDS_LEFTBAR_QUERY = gql`
  query getAllPckds {
    getAllPckds {
      id
      target
      pckd
      title
      createdAt
      hitCount
    }
  }
`;

export const SET_SELECTED_PCKD_QUERY = gql`
  query GetPckdInfo($id: ID!) {
    getPckdInfo(id: $id) {
      hits {
        id
        ip
        isp
        location {
          name
          city
          country {
            code
            name
          }
          continent {
            name
          }
        }
      }
      hitCount
      id
      target
      pckd
      title
      createdAt
      updatedAt
    }
  }
`;

export const SET_SELECTED_HIT_QUERY = gql`
  query ping {
    ping
  }
`;
