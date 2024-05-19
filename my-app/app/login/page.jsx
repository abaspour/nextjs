"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const handelChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        "content-type": "application/json",
      });
      if (!res.ok) {
        // If response status is not OK, throw an error
        throw new Error("Network response was not ok");
      }
      const data = await res.json();

      // Extract the token and user information from the response data
      const { token, user, errors } = data;

      if (token && user) {
        // Token and user data are available
        console.log("Token:", token);
        console.log("User:", user);
        // Proceed with your application logic using the token and user data
        router.push("/");
        router.refresh();
      } else if (errors) {
        // Errors occurred during authentication
        console.error("Authentication errors:", errors);
        setErrors(errors.map((error) => error.msg));
        // Handle errors (e.g., display error message to the user)
      } else {
        // Unexpected response format
        console.error("Unexpected response format");
        // Handle unexpected response (e.g., display generic error message to the user)
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error.message);
      // Display error message to the user or handle it as appropriate
    }
  };
  let loginData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(loginData);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handelSubmit}
      >
        <h3> Enter your credentials</h3>
        <label>Email</label>
        <input
          id="email"
          name="email"
          onChange={handelChange}
          required={true}
          value={formData.email}
        />
        <label>Password</label>
        <input
          id="password"
          name="password"
          onChange={handelChange}
          required={true}
          value={formData.password}
        />
        <input type="submit" className="btn max-w-xs" value="Login" />

        {errors.length > 0 && (
          <div>
            <h3 className="text-red-300">Error(s) occurred:</h3>
            <ul>
              {errors.map((error, index) => (
                <li className="text-red-200" key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
export default LoginForm;
