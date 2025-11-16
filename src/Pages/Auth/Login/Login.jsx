import React from "react";
import { useForm } from "react-hook-form";
import { CgLayoutGrid } from "react-icons/cg";
import { data, Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const handleLogin = (data) => {
    // console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h3 className="text-3xl text-center">Welcome Back</h3>
      <p className="text-center">Please Login</p>
      <form onClick={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
          {/* email */}
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
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password requiered</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Pass must have 6 charecters</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p className="text-center">
          New to Zap-Shift?{" "}
          <Link className="text-blue-600" to="/register">
            Register
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
