import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { CREATE_PCKD_MUTATION } from "../../queries/pckd/.";

const initialForm = {
  target: "",
  pckd: "",
};

const CreatePckd = () => {
  const location = useLocation();
  const [formState, setFormState] = useState(initialForm);
  const [createPckd, { loading, error, data }] =
    useMutation(CREATE_PCKD_MUTATION);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    createPckd({ variables: { target: formState.target } });
  };

  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error}`;
  if (data?.hasOwnProperty("createPckd")) console.log("created");

  return (
    <div>
      <h1>Create a new PCKD!</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="url"
          name="target"
          placeholder="Enter Link to pck"
          vlaue={formState.target}
          onChange={(e) =>
            setFormState({ ...formState, target: e.target.value })
          }
        />
        <button>Pack It up!</button>
      </form>
      {data?.createPckd && (
        <a href={data?.createPckd}>
          {window.location.href}
          {data?.createPckd}
        </a>
      )}
    </div>
  );
};

export default CreatePckd;
