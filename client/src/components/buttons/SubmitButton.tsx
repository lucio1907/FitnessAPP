import React from "react";

const SubmitButton = ({ value }: { value: string }) => {
  return (
    <button
      type="submit"
      className="bg-[#fb4f93] text-white p-3 rounded-xl font-semibold text-lg w-[60%] text-nowrap"
    >
      {value}
    </button>
  );
};

export default SubmitButton;
