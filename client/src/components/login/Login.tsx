"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormFields from "../fields/FormFields";
import * as Yup from "yup";
import axios from "axios";
import SubmitButton from "../buttons/SubmitButton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

interface LoginFields {
  email: string;
  password: string;
}

const Login = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  
  const router = useRouter();

  const handleSubmit = async (values: LoginFields) => {
    const { email, password } = values;
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        const { user, access_token } = response.data.response.data;
        const { id: userId, credentials: { email, name, lastname } } = user;

        if (access_token) {
          setIsLoading(false);
          Cookies.set("user_id", userId);
          Cookies.set("auth_token", access_token);
          Cookies.set("email", email);
          Cookies.set("name", name);
          Cookies.set("lastname", lastname);
          router.push('/dashboard');
        }
      }
    } catch (error: any) {
        setIsLoading(false);
        setLoginError(error.response.data.response.message)
        
        setTimeout(() => {
            setLoginError('')
        }, 3000);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email not valid").required("Field required."),
    password: Yup.string()
      .min(3, "Your password has to be longer than 3 characters.")
      .max(25, "Your password has to be lower than 25 characters")
      .required("Field required."),
  });

  const validateFields = async (values: LoginFields) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (error: any) {
      const errors: Record<string, string> = {};
      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });

      return errors;
    }
  };

  return (
    <div className="w-full h-dvh flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-5xl font-semibold">Fitness APP</h1>
        <p className="font-semibold text-[#fb4f93]">
          Make your training easier.
        </p>
      </div>

      <h2 className="text-white font-semibold text-4xl">Login</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values) => handleSubmit(values)}
        validate={validateFields}
      >
        <Form className="flex flex-col justify-center items-center w-full gap-8">
          <FormFields
            name="email"
            type="email"
            placeholder="Email"
            classname="w-[80%] p-4 rounded-xl placeholder:text-center outline-none font-medium"
          />
          <FormFields
            name="password"
            type="password"
            placeholder="Password"
            classname="w-[80%] p-4 rounded-xl placeholder:text-center outline-none font-medium"
          />

          <SubmitButton value={ isLoading ? "Logging in..." : loginError ? loginError : "Login"} />
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
