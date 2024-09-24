import { Field } from "formik";
import React from "react";
import SpanError from "../errors/SpanError";

interface FieldProps {
  name: string;
  type: string;
  classname?: string;
  placeholder?: string;
}

const FormFields = (props: FieldProps): React.ReactElement => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center">
        <Field
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          className={props.classname}
        />
      </div>
      <SpanError name={props.name} />
    </div>
  );
};

export default FormFields;
