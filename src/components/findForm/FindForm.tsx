import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {useNavigate} from "react-router-dom";

//types
import {typeCharacter} from "../types/types";

//styles
import "./findForm.scss";

const FindForm = () => {
  const {getCharacterByName, isLoading, isError} = useMarvelService();
  const [searchChar, setSearchChar] = useState<typeCharacter>();
  const [wasSubmit, setWasSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (name: string) => {
    getCharacterByName(name)
      .then(setSearchChar)
      .catch(error => {
        console.log(error);
        setSearchChar(undefined);
      });
    setWasSubmit(true);
  }

  return (
  <div className="find-character-form">
    <Formik
      initialValues={{name: ""}}
      onSubmit={(values, {resetForm}) => {
        handleSubmit(values.name);
        resetForm();
      }}
      validate={values => {
        const errors: {name?: string} = {};
        setWasSubmit(false);
        if(!values.name) errors.name = "This field is required";
        else if(values.name.length === 1) errors.name = "This field is need minimum 2 characters";

        return errors;
      }}
    >
      {({isSubmitting, touched, errors}) => (
        <Form>
          <label htmlFor="name" className="find-character-form__label">Find a character by name:</label>
          <div className="wrapper-form-elems">
            <Field
              name="name"
              type="text"
              className="find-character-form__input"
            />
            <button className="button button__main" disabled={isSubmitting}>
              <div className="inner">Find</div>
            </button>
          </div>
          <ErrorMessage name="name">
            {msg => <div className="find-character-form__failure-message"><span>{msg}</span></div>}
          </ErrorMessage>

          {searchChar ? (
            <div className="find-character-form__success-message">
              <span>There is! Visit {searchChar.name} page?</span>
              <button
                className="button button__secondary"
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/characters/${searchChar.id}`)
                }}
              >
                <div className="inner">To page</div>
              </button>
            </div>
          ) : null}
          {!searchChar && wasSubmit ? (
            <div className="find-character-form__failure-message">
              <span>The character was not found. Check the name and try again</span>
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  </div>
  );
};

export default FindForm;