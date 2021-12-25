import styled, { css } from "styled-components";

const ButtonStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 30px;
  background: ${(props) => props.theme.accentColor};
  border-radius: 12px;
  color: white;
  font: inherit;
  font-weight: medium;
  height: 40px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  border: none;

  transition &::before,
  &::after {
    width: 0%;
    height: 0%;
    opacity: 0;
  }
  &::before {
    top: 0;
    right: 0;
    border-top: 1px solid #7f5ee4;
    border-left: 1px solid #7f5ee4;
    transition: width 0.2s 0.5s ease-out, height 0.15s 0.35s linear,
      opacity 0s 0.7s;
  }
  &::after {
    bottom: 0;
    left: 0px;
    border-bottom: 1px solid #7f5ee4;
    border-right: 1px solid #7f5ee4;
    transition: width 0.2s 0.15s linear, height 0.15s ease-in, opacity 0s 0.35s;
  }
  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 96%;
    opacity: 1;
  }
  &:hover::before {
    transition: width 0.2s ease-in, height 0.15s 0.2s linear, opacity 0s; /* 1,2 */
  }
  &:hover::after {
    transition: width 0.2s 0.35s linear, height 0.15s 0.5s ease-out,
      opacity 0s 0.3s;
  }

  &:hover {
    opacity: 0.9;
  }
  &:active,
  &:hover,
  &:focus {
    outline: 0 !important;
    outline-offset: 0;
  }
  &::before,
  &::after {
    position: absolute;
    content: "";
  }
`;

export const ButtonLink = styled.a`
  ${ButtonStyles}
`;

export const NormalLinkStyles = css`
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  position: relative;
  color: inherit;
  margin-top: ${(props) => props.marginTop};
  visibility: ${(props) => props.hidden && "hidden"};
  /* animated underline on hover */
  &:after {
    background: none repeat scroll 0 0 transparent;
    bottom: 0;
    content: "";
    display: block;
    height: 2px;
    /* From left, right or center */
    left: ${(props) =>
      props.from
        ? {
            center: "50%",
            left: "0",
            right: "100%",
          }[props.from]
        : "50%"};

    position: absolute;
    background: #7f5ee4;
    transition: width 0.3s ease 0s, left 0.3s ease 0s;
    width: 0;
  }
  &:hover:after,
  &.${(props) => props.activeClassName} {
    width: 100%;
    left: 0;
  }
`;

export const NormalLink = styled.a`
  ${NormalLinkStyles}
`

export const Button = styled.button`
  ${ButtonStyles}

  /* Icon */
  & img {
    margin-left: 10px;
  }
`;
