import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

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
  gap: 10px;
`;

export const ButtonLink = styled(Link)`
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
`;

export const Button = styled.button`
  ${ButtonStyles}
`;
