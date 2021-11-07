import React from "react";
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from "react-router-dom";
import {login} from "./../../actions/userActions"
import { useHistory } from "react-router";

const schema = yup.object({
  email: yup.string().email(),
  password: yup.string().required(),
}).required();


function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const history = useHistory()
  const onSubmit = (data) => {
    login(data).then(
      history.push('/')
    )
  }

  return (
    <div className="container">
      <div className="narrow-form">
        <h1>Login</h1>
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
            <input className="btn btn-primary mr-2" type="submit" />
          </div>
        </form>

        <p>Don't have an account? {' '}
          <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );

}

export default Login