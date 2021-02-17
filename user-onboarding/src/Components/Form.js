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

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [users, setUsers] = useState([]);

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
  }, [formState]);

  const validateChange = event => {
    yup.reach(formSchema, event.target.name)
       .validate(event.target.value)
       .then(valid => {
         setErrors({...errors, [event.target.name]: ''});
       })
       .catch(error => {
         setErrors({...errors, [event.target.name]: error.errors[0] });
       });
  }

  // onSubmit function
  const formSubmit = event => {
    event.preventDefault();
    axios
    .post("https://reqres.in/api/users", formState)
    .then(response => {
      setUsers(response.data);
      setFormState({
        name: "",
          email: "",
          password: "",
          terms: ""
      }); 
    })
   .catch(error => console.log(error.response));
  };

//onChange function
  const inputChange = event => {
    event.persist();
    const newFormData = {
      ...formState,
      [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    validateChange(event);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">Name
        <input 
          id="name"
          type="text"
          name="name"
          value={formState.name}
          onChange={inputChange} />
          {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>

      <label htmlFor="email">Email
        <input 
          id="email"
          type="email"
          name="email"
          value={formState.email}
          onChange={inputChange} />
          {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
      </label>

      <label htmlFor="password">Password
        <input 
          id="password"
          type="password"
          name="password"
          value={formState.password}
          onChange={inputChange} />
          {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
      </label>

      <label htmlFor="terms">Terms & Conditions
        <input 
          type="checkbox"
          name="terms"
          cheked={formState.terms}
          onChange={inputChange} />
      </label>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <button disabled={isButtonDisabled} type="submit">Submit</button>

    </form>
  )
}

