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

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup.string().email("Must be a valid email address").required(),
    password: yup.string().min(8).required("Must be at least 8 characters"),
    terms: yup.boolean().oneOf([true], "Do you accept these terms & conditions?")   
})

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      console.log('valid?', valid);
    })
  }, [formState])

  const inputChange = event => {
    const newFormData = {
      ...formState,
      [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value
    };
    setFormState(newFormData)
  }
}