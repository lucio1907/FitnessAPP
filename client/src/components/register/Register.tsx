"use client";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import FormFields from "../fields/FormFields";
import SubmitButton from "../buttons/SubmitButton";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/hooks/useContext";

const INITIAL_VALUES = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  phone_number: "",
};

interface RegisterFields {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone_number: string;
}

const Register = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (
    values: RegisterFields,
    { resetForm }: FormikHelpers<RegisterFields>
  ) => {
    const { name, lastname, email, password, phone_number } = values;
    setIsLoading(true);

    try {
      const axiosResponse = await axios.post(
        "http://localhost:8080/users/register",
        {
          name,
          lastname,
          email,
          password,
          phone_number,
        }
      );

      if (axiosResponse.status === 201) {
        setIsLoading(false);
        setSuccess(axiosResponse.data.response.message);

        router.push("/login");
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.response.data.response.message);

      setTimeout(() => {
        setErrorMessage("");
        resetForm();
      }, 3000);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Field required."),
    lastname: Yup.string().required("Field required."),
    email: Yup.string().email("Email not valid.").required("Field required."),
    password: Yup.string()
      .min(3, "Your password has to be longer than 3 characters")
      .max(25, "Your password has to be lower than 25 characters."),
    phone_number: Yup.string()
      .matches(/^[0-9]+$/, "Only numbers are allowed")
      .min(7, "Number should have 7 digits at least.")
      .max(15, `Numbers should'nt have more than 15 characters.`)
      .required("Field required."),
  });

  const validateFields = async (values: RegisterFields) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
    } catch (error: any) {
      const errors: Record<string, string> = {};
      error.inner.forEach((e: any) => {
        errors[e.path] = e.message;
      });

      return errors;
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-white text-5xl font-semibold">Fitness APP</h1>
        <p className="font-semibold text-main-color">
          Make your training easier.
        </p>
      </div>

      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={(values, resetForm) => handleSubmit(values, resetForm)}
        validate={validateFields}
      >
        <Form className="flex flex-col items-center justify-center w-full gap-8 h-[600px]">
          <h2 className="text-white font-semibold text-4xl">Register</h2>
          <FormFields
            name="name"
            type="text"
            placeholder="Name"
            classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
          />
          <FormFields
            name="lastname"
            type="text"
            placeholder="Lastname"
            classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
          />
          <FormFields
            name="email"
            type="email"
            placeholder="Email"
            classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
          />
          <FormFields
            name="password"
            type="password"
            placeholder="Password"
            classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
          />
          <FormFields
            name="phone_number"
            type="text"
            placeholder="Phone number (only numbers)"
            classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
          />

          <SubmitButton
            value={isLoading ? "Creating account..." : "Register"}
          />
        </Form>
      </Formik>
      <p className="text-red-500 px-5 pb-5 text-center">{errorMessage}</p>
      <p className="text-green-500 px-5 pb-5 text-center">{success}</p>
    </div>
  );
};

export default Register;
