"use client";
import React from "react";

interface FilterDayButtonProps {
  day: string;
  setSelectedDay: (day: string) => void;
}

const FilterDayButton: React.FC<FilterDayButtonProps> = ({
  day,
  setSelectedDay,
}) => {
  return (
    <button
      onClick={() => setSelectedDay(day)}
      className="px-4 py-2 w-[40%] bg-slate-900 text-white hover:bg-main-color hover:text-white rounded-md"
    >
      {day}
    </button>
  );
};

export default FilterDayButton;
