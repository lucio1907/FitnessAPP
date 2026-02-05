"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import FormFields from "../fields/FormFields";
import * as Yup from "yup";
import axios from "axios";
import SubmitButton from "../buttons/SubmitButton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

interface LoginFields {
  email: string;
  password: string;
}

const Login = (): React.ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (values: LoginFields) => {
    const { email, password } = values;
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, access_token } = response.data.response.data;
        const {
          id: userId,
          credentials: { email, name, lastname },
        } = user;

        if (access_token) {
          setIsLoading(false);
          Cookies.set("user_id", userId);
          Cookies.set("auth_token", access_token);
          Cookies.set("email", email);
          Cookies.set("name", name);
          Cookies.set("lastname", lastname);
          router.push("/dashboard");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.response.data.response.message);

      setTimeout(() => {
        setErrorMessage("");
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
        <p className="font-semibold text-main-color">
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

          <div className="flex flex-col w-full items-center gap-3 mt-5">
            <SubmitButton
              value={
                isLoading
                  ? "Logging in..."
                  : errorMessage
                  ? errorMessage
                  : "Login"
              }
            />
            <span className="text-main-color text-lg">- or -</span>
            <Link
              href="/register"
              className="bg-main-color text-white p-3 rounded-xl font-semibold text-lg text-center w-[60%] text-nowrap"
            >
              Create your account
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
