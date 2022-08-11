import useMarvelService from "../../../services/MarvelService";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {string, object} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

// own components
import ErrorMessage from "../../erorMessage/ErrorMessage";

//types
import {typeCharacter} from "../../types/types";

//styles
import "../charSearchForm.scss";

const validateSchema = object({
  name: string().required("Required").min(2, "Min length is 2")
})

const CharSearchForm = () => {
  const {getCharacterByName, isLoading, isError, clearError} = useMarvelService();
  const [searchedChar, setSearchedChar] = useState<typeCharacter[]>();
  const {register, handleSubmit, watch, formState: {errors}} = useForm({resolver: yupResolver(validateSchema)});
  const navigate = useNavigate();

  const onCharLoaded = (char: typeCharacter[]) => setSearchedChar(char);

  const onSubmit = (data) => {
    clearError();
    console.log(data)
    getCharacterByName(data.name)
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
  {/*{...register("name", {required: {value: true, message: "Required"}, minLength: {value: 2, message: "Min length is 2"}})}*/}
console.log(errors)
  return (
    <div className="find-character-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="find-character-form__label">Find a character by name:</label>
        <div className="wrapper-form-elems">
          <input
            {...register("name")}
            type="text"
            placeholder="name character"
            className="find-character-form__input"
          />
          <button className="button button__main">
            <div className="inner">Find</div>
          </button>
        </div>
        {errors.name ?
          <div className="find-character-form__failure-message"><span>{errors.name?.message as never}</span></div>
          : null
        }
      </form>
      {results}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;