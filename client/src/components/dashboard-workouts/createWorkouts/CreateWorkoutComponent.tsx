"use client";
import SubmitButton from "@/components/buttons/SubmitButton";
import FormFields from "@/components/fields/FormFields";
import axios from "axios";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

const INITIAL_VALUES = {
  user_id: "",
  workout_name: "",
  description: "",
};

interface WorkoutBody {
  user_id: string;
  workout_name: string;
  description: string;
}

const CreateWorkoutComponent = ({ user_id }: { user_id: string | undefined }): React.ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const router = useRouter();

  const handleSubmit = async (values: WorkoutBody) => {
    const { workout_name, description } = values;
    setIsLoading(true);

    const token = Cookies.get("auth_token");

    try {
      const response = await axios.post(
        "http://localhost:8080/workout",
        {
          user_id,
          workout_name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.response.message);

      if (token) {
        const workoutId = response.data.response.newWorkout.workout_id;

        setTimeout(() => {
          setIsLoading(false);
          router.push(`/your-workouts/workout/${workoutId}`);
        }, 1000);
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
    workout_name: Yup.string()
      .min(3, "3 characters min.")
      .max(25, "25 characters max.")
      .required("Field required."),
  });

  const validateFields = async (values: WorkoutBody) => {
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
    <div className="w-full min-h-[90dvh] flex flex-col justify-center items-center">
      <h2 className="mb-10 text-3xl text-main-color">Create a new workout</h2>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={handleSubmit}
        validate={validateFields}
      >
        <Form className="w-full flex flex-col items-center gap-10">
          <FormFields
            name="workout_name"
            type="text"
            placeholder="Workout name"
            classname="w-[80%] p-4 rounded-xl placeholder:text-center outline-none font-medium"
          />
          <FormFields
            name="description"
            type="text"
            placeholder="Description"
            classname="w-[80%] p-4 rounded-xl placeholder:text-center outline-none font-medium"
          />
          <SubmitButton value={isLoading ? "Creating workout..." : "Create"} />
        </Form>
      </Formik>

      <div className="mt-10 text-center flex flex-col gap-5">
        {successMessage && (
          <>
            {" "}
            <p className="text-green-500 text-xl">{successMessage}!</p>
            <p className="text-green-500 text-xl animate-pulse">
              Redirecting to your new workout...
            </p>{" "}
          </>
        )}
        {errorMessage && <p className="text-red-500 text-xl">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CreateWorkoutComponent;
