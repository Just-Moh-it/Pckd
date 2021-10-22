import { gql } from "@apollo/client";

export const CREATE_PCKD_MUTATION = gql`
  mutation createCustomPckd($target: String!, $pckd: String) {
    createPckd(target: $target, pckd: $pckd)
  }
`;

export const GET_PCKD_QUERY = gql`
  query getTargetByPckd($pckd: String!) {
    getTargetByPckd(pckd: $pckd)
  }
`;
