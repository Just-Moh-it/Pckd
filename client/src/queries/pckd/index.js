import { gql } from "@apollo/client";

export const CREATE_PCKD_MUTATION = gql`
  mutation createCustomPckd($target: String!, $pckd: String, $title: String) {
    createPckd(target: $target, pckd: $pckd, title: $title)
  }
`;

export const GET_TARGET_BY_PCKD_MUTATION = gql`
  mutation getTargetByPckd($pckd: String!) {
    getTargetByPckd(pckd: $pckd)
  }
`;
