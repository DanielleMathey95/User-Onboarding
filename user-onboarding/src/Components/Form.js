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

  
}