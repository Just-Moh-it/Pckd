import styled, { css } from "styled-components";

const FormGroup = styled.div`
  text-align: left;
  margin-bottom: 30px;

  /* If flex provided */
  ${(props) =>
    props.flex &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}

  & label,
  .forgot-link {
    display: inline-block;
    margin-bottom: 5px;
  }

  & .forgot-link {
    text-align: right;
    float: right;
  }

  & * {
    clear: both;
  }

  & .input-error {
    color: red;
    font-size: 15px;
    margin-top: 5px;
    display: inline-block;
  }

  & button {
    padding: 17px 10px;
    width: 100%;
    border: none;
    background-color: ${(props) => props.theme.accentColor};
    color: white;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  & button:disabled {
    background-color: #e6e6e6;
    color: #b3b3b3;
    cursor: wait;
  }

  & button:hover {
    opacity: 0.9;
  }
`;

export default FormGroup;
