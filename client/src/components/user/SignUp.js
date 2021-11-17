import React, {useState} from "react";
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from "react-router-dom";
import { signUp } from "../../actions/userActions";
import { useHistory } from "react-router";
const schema = yup.object({
  email: yup.string().email(),
  password: yup.string().required().min(8).matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special case character"
  ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
}).required();


function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [error, setError] = useState('')
  const history = useHistory()

  const onSubmit = data => {
    signUp(data).then((res) => {
      console.log(res.data.status)
      history.push('/login')}
    ).catch((error) => {
      console.log(error.message)
      setError(error.message)
    }) 
  };

  return (
    <div className="container">
      <div className="narrow-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" className="form-control" type="email" {...register("email")} />
            <p>{errors.email?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input name="password" className="form-control" type="password" {...register("password")} />
            <p>{errors.password?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input name="confirmPassword" className="form-control" type="password" {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
          </div>
          <div className="form-group">
            <p>{error}</p>
          </div>
          <div className="form-group">
            <input className="btn btn-primary mr-2" type="submit" />
          </div>
        </form>

        <p>Already have an account? {' '}
          <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );

}

export default SignUp