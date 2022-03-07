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
        browser {
          name
        }
        location {
          name
          city
          country {
            code
            name
          }
        }
        createdAt
      }
      hitCount
      id
      target
      pckd
      title
      createdAt
      enableTracking
      byCountryGraph {
        count
        country {
          code
          name
        }
      }
    }
  }
`;

export const SET_SELECTED_HIT_QUERY = gql`
  query Hit($hitId: ID!) {
    hit(id: $hitId) {
      id
      ip
      type
      isp
      timezone {
        offset
        abbreviation
      }
      location {
        city
        postal
        country {
          name
          code
        }
      }
      browser {
        name
        version
      }
      os {
        name
        version
      }
      createdAt
    }
  }
`;
