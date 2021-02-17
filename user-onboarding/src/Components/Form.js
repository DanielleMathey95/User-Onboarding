import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';



export default function Form() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    terms: ''
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required(),
    password: yup.string().min(8).required("Must be at least 8 characters"),
    terms: yup.boolean().oneOf([true], "Do you accept these terms & conditions?")   
})

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      console.log('valid?', valid);
      setIsButtonDisabled(!valid);
    });
  }, [formState])

  // onSubmit function
  const formSubmit = event => {
    event.preventDefault();
    console.log("Form submitted!");
  }

//onChange function
  const inputChange = event => {
    const newFormData = {
      ...formState,
      [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    setFormState(newFormData)
  }

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">Name
        <input 
          id="name"
          type="text"
          name="name"
          onChange={inputChange} />
      </label>
      <label htmlFor="email">Email
        <input 
          id="email"
          type="email"
          name="email"
          onChange={inputChange} />
      </label>
      <label htmlFor="password">Password
        <input 
          id="password"
          type="password"
          name="password"
          onChange={inputChange} />
      </label>
      <label htmlFor="terms">Terms & Conditions
        <input 
          type="checkbox"
          name="terms"
          cheked={formState.terms}
          onChange={inputChange} />
      </label>
      <button disabled={isButtonDisabled} type="submit">Submit</button>
    </form>
  )
}

