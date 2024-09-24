import Link from "next/link";
import React from "react";

const DashboardNavigationButtons = ({
  href,
  value,
}: {
  href: string;
  value: string;
}): React.ReactElement => {
  return (
    <>
      <Link
        href={href}
        className="relative flex items-center px-6 py-5 overflow-hidden font-medium transition-all bg-main-color rounded-md group"
      >
        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ce2367] rounded group-hover:-mr-4 group-hover:-mt-4">
          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#ffa2c7]"></span>
        </span>
        <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-[#ce2367] rounded group-hover:-ml-4 group-hover:-mb-4">
          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-[#ffa2c7]"></span>
        </span>
        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-[#ce2367] rounded-md group-hover:translate-x-0"></span>
        <span className="relative w-full text-center text-white text-lg transition-colors duration-200 ease-in-out group-hover:text-white">
          {value}
        </span>
      </Link>
    </>
  );
};

export default DashboardNavigationButtons;
