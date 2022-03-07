import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { NormalLink } from "../../../styles/Buttons";
import FormGroup from "../../../styles/FormGroup";
import TextBox from "../../../styles/TextBox";
import CheckBox from "../../../styles/CheckBox";
import { ReactComponent as ShortenIcon } from "../../../assets/icons/shorten.svg";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 11px 28px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
`;

const PackBtn = styled.button`
  height: 72px;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  gap: 15px;
  background-color: ${(props) => props.theme.accentColor};
  color: white;
  border-radius: 12px;
  font-size: 16px;
  margin-left: -5px;
  font-weight: bold;

  cursor: pointer;
  &,
  & svg {
    transition: all 0.3s ease-in-out;
  }

  &:hover {
    opacity: 0.9;
  }

  &:hover svg {
    margin-left: 2px;
  }

  & svg {
    flex: 1;
    width: 18px;
  }
`;

const HeroInput = styled.input`
  width: 488px;
  height: 73px;
  background: #ffffff;
  border-radius: 15px 0 0 15px;
  border: none;
  padding: 25px;
  min-width: 337px;
  font-size: 16px;
  line-height: 22px;
  outline: none;
`;

const AdvancedOptionsWrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 11px 28px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  border: none;
  padding: 25px;
  width: 100%;
  margin-top: 40px;
  transition: all 0.3s ease-in-out;

  /* When shown, animate with grow from top effect */
  animation: createBox 0.5s;
  @keyframes createBox {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }
`;

const CreateField = ({ createPckd }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const isLoggedIn = useSelector((state) => !!state?.auth?.userInfo?.id);
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ target, title, pckd, enableTracking }) => {
    createPckd({ variables: { target, title, pckd, enableTracking } });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper className="create-div">
          <HeroInput
            type="url"
            name="target"
            placeholder="https://www.google.com"
            {...register("target", {
              required: "Please enter a valid url",
              pattern:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
            })}
          />
          <PackBtn type="submit" full={true}>
            <span>Shorten!</span>
            <ShortenIcon />
          </PackBtn>
        </Wrapper>
        {errors?.target && (
          <p style={{ color: "red" }}>{errors?.target?.message}</p>
        )}
        <NormalLink
          from="left"
          className="advanced-trigger"
          marginTop="20px"
          onClick={() => {
            setIsAdvancedOpen(!isAdvancedOpen);
            // Scroll to bottom after 1 second
            setTimeout(() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }, 100);
          }}
        >
          Advanced Options ↓
        </NormalLink>
        <AdvancedOptionsWrapper hidden={!isAdvancedOpen}>
          <FormGroup>
            <label htmlFor="pckd">Custom Backhalf / Pckd</label>
            <TextBox
              {...register("pckd", {
                minLength: 3,
                maxLength: 100,
                required: false,
                pattern: /^[a-zA-Z0-9-_]+$/,
              })}
              placeholder="myshortlink"
            />
            {errors?.pckd && (
              <span className="input-error">
                {
                  {
                    pattern: "Only alphanumeric values are allowed",
                    maxLength: "Max length allowed is 100 chars",
                    minLength: "Min length allowed is 3 characters",
                  }[errors?.pckd?.type]
                }
              </span>
            )}
          </FormGroup>
          {isLoggedIn ? (
            <>
              <FormGroup>
                <label htmlFor="title">Title</label>
                <TextBox {...register("title")} placeholder="Custom Title" />
              </FormGroup>
              <FormGroup>
                <CheckBox
                  type="checkbox"
                  {...register("enableTracking")}
                  defaultChecked={true}
                  placeholder="Custom Title"
                  id="enableTracking"
                />
                <label htmlFor="enableTracking">Enable Tracking</label>
              </FormGroup>
            </>
          ) : (
            <p className="tip">(Tip: Login to view more options)</p>
          )}
          <FormGroup>
            <button type="submit">Shorten Link</button>
          </FormGroup>
        </AdvancedOptionsWrapper>
      </form>
    </>
  );
};

export default CreateField;
