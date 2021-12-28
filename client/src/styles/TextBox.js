import styled from "styled-components";

const TextBox = styled.input`
  background: #f3f3f3;
  border-radius: 10px;
  padding: 22px 28px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.8);
  border: none;
  width: 100%;
  display: inline-block;
  /* change color of outline when focused */
  outline-color: ${(props) => props.theme.accentColor};
`;

export default TextBox;
