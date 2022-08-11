import useMarvelService from "../../../services/MarvelService";
import {useState} from "react";
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from "formik";
import {useNavigate} from "react-router-dom";

// own components
import ErrorMessage from "../../erorMessage/ErrorMessage";

//types
import {typeCharacter} from "../../types/types";

//styles
import "../charSearchForm.scss";

const CharSearchForm = () => {
  const {getCharacterByName, isLoading, isError, clearError} = useMarvelService();
  const [searchedChar, setSearchedChar] = useState<typeCharacter[]>();
  const navigate = useNavigate();

  const onCharLoaded = (char: typeCharacter[]) => setSearchedChar(char);

  const handleSubmit = (name: string) => {
    clearError();

    getCharacterByName(name)
      .then(onCharLoaded)
      .catch(error => {
        console.log(error);
      });
  }

  const errorMessage = isError ? <div className="find-character-form__critical-error"><ErrorMessage /></div> : null;
  const results = !searchedChar ? null : searchedChar.length !== 0 ? (
      <div className="find-character-form__success-message">
        <span>There is! Visit {searchedChar[0].name} page?</span>
        <button
          className="button button__secondary"
          onClick={(event) => {
            event.preventDefault();
            navigate(`/characters/${searchedChar[0].id}`)
          }}
        >
          <div className="inner">To page</div>
        </button>
      </div>
    ) : (
    <div className="find-character-form__failure-message">
      <span>The character was not found. Check the name and try again</span>
    </div>
    );

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
          <FormikErrorMessage name="name">
            {msg => <div className="find-character-form__failure-message"><span>{msg}</span></div>}
          </FormikErrorMessage>
        </Form>
      )}
    </Formik>
    {results}
    {errorMessage}
  </div>
  );
};

export default CharSearchForm;