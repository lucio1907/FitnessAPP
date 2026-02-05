"use client";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import FormFields from "../fields/FormFields";
import Select from "react-select";
import DropdownIndicator from "../buttons/DropdownIndicator";
import * as Yup from "yup";
import SubmitButton from "../buttons/SubmitButton";
import SpanError from "../errors/SpanError";
import axios from "axios";
import Navbar from "../navbar/Navbar";

interface ExerciseTypes {
  exercise_name: string;
  day: string;
  sets: string;
  reps: string;
  weight: string;
}

const INITIAL_VALUES: ExerciseTypes = {
  exercise_name: "",
  day: "",
  sets: "",
  reps: "",
  weight: "",
};

const daysOptions = [
  { value: "Lunes", label: "Monday" },
  { value: "Martes", label: "Tuesday" },
  { value: "Miercoles", label: "Wednesday" },
  { value: "Jueves", label: "Thursday" },
  { value: "Viernes", label: "Friday" },
  { value: "Sábado", label: "Saturday" },
];

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    padding: "4px",
    borderRadius: "0.75rem",
    width: "100%",
    outline: "none",
    boxShadow: "none",
    textAlign: "center",
    "&:focus": {
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
    },
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#fb4f93" : "white",
    color: state.isSelected ? "white" : "#333",
    "&:hover": {
      backgroundColor: "#d3e1f0",
    },
  }),
};

const AddExerciseToWorkoutComponent = ({
  workout_id,
  auth_token,
}: {
  workout_id: string;
  auth_token: string | undefined;
}): React.ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (
    values: ExerciseTypes,
    { resetForm }: FormikHelpers<ExerciseTypes>
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/workout/add-exercise",
        {
          workout_id,
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );

      if (response.status === 201) {
        setIsLoading(false);
        setSuccessMessage(response.data.response.message);
        resetForm();

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.response.data.response.message);
      resetForm();

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    console.log("Submitted values:", values);
  };

  const validationSchema = Yup.object().shape({
    exercise_name: Yup.string().required("Field required."),
    day: Yup.string().required("Field required."),
    sets: Yup.string()
      .required("Field required.")
      .min(1, "Must be at least 1 set."),
    reps: Yup.string()
      .required("Field required.")
      .min(1, "Must be at least 1 rep."),
    weight: Yup.string()
      .required("Field required.")
      .min(1, "Must be at least 1 kg."),
  });

  const validateFields = async (values: ExerciseTypes) => {
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
    <div className="w-full h-full flex flex-col justify-between items-center">
      <Navbar href={`/your-workouts/workout/${workout_id}`} />
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validateFields}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full flex flex-col justify-center items-center gap-8">
            <h2 className="text-main-color text-2xl">Add your exercises</h2>
            <FormFields
              type="text"
              name="exercise_name"
              classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
              placeholder="Exercise name"
            />

            <div className="w-[80%] flex flex-col justify-center items-center">
              <Select
                options={daysOptions}
                styles={customStyles}
                placeholder="Select a day"
                onMenuOpen={() => setIsMenuOpen(true)}
                onMenuClose={() => setIsMenuOpen(false)}
                components={{ DropdownIndicator }}
                value={daysOptions.find(
                  (option) => option.value === values.day
                )}
                onChange={(option) => setFieldValue("day", option?.value || "")}
                className="w-full"
                menuIsOpen={isMenuOpen}
              />
              <SpanError name="day" />
            </div>

            <FormFields
              type="text"
              name="sets"
              classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
              placeholder="Sets"
            />

            <FormFields
              type="text"
              name="reps"
              classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
              placeholder="Reps"
            />

            <FormFields
              type="text"
              name="weight"
              classname="p-3 rounded-xl outline-none placeholder:text-center w-[80%]"
              placeholder="Weight"
            />

            <SubmitButton
              value={isLoading ? "Adding exercise..." : "Add exercise"}
            />
          </Form>
        )}
      </Formik>
      <div className="px-5">
        <p
          className={`text-white p-4 text-center bg-red-500 rounded-md font-semibold ${
            !errorMessage && "hidden"
          }`}
        >
          {errorMessage}
        </p>
        <p
          className={`text-white p-4 text-center bg-green-500 rounded-md font-semibold mb-5 ${
            !successMessage && "hidden"
          }`}
        >
          {successMessage}
        </p>
      </div>
    </div>
  );
};

export default AddExerciseToWorkoutComponent;
