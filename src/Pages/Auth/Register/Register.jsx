import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();
  const handleRegistration = (data) => {
    console.log("after regis", data);
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome to Zap-Shift</h3>
      <p className="text-center">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is requiered</p>
          )}
          {/* pass */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
              //   pattern: /^[A-Za-z]+$/i,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">password is requiered</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">password must be 6 charecters</p>
          )}
          {/* {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              password must have an Upper case a lower case, num and charecter{" "}
            </p>
          )} */}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>{" "}
        </p>
      </form>
        <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
