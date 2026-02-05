import { ErrorMessage } from "formik";
import React from "react";

const SpanError = ({ name }: { name: string }): React.ReactElement => {
  return (
    <div className="mt-1 ml-1 md:mt-2">
      <span className="text-[#FF5722] text-[14px] md:text-[16px]">
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export default SpanError;
