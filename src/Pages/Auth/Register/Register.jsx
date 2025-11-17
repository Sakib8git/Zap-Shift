import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleRegistration = (data) => {
    console.log("after regis", data.photo[0]);
    // Get the file from form data
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        //1. store photo in form data
        const formData = new FormData();
        formData.append("image", profileImg);

        // 2. send the photo to srote and get url
        const Image_Api_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(Image_Api_Url, formData).then((res) => {
          console.log("after img uplode", res.data.data.url);

          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then(() => {
              console.log("user profile update done");
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        });
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
          {/* name */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Your Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is requiered</p>
          )}
          {/* Image */}
          <label className="label">Uplode a Photo</label>
          {/* <input type="file" className="file-input file-input-ghost" /> */}
          <input
            type="file"
            {...register("photo", { required: true })}
            className="file-input"
            placeholder="Your Image"
          />
          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is requiered</p>
          )}
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
          <Link state={location.state} className="text-blue-600" to="/login">
            Login
          </Link>{" "}
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
