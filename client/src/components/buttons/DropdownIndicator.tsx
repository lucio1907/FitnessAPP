import DropdownIconSvg from "@/svg/DropdownIconSvg";
import React from "react";
import { components } from "react-select";

const DropdownIndicator = (props: any): React.ReactElement => {
  const { menuIsOpen } = props.selectProps; // Detecta si el menú está abierto

  return (
    <components.DropdownIndicator {...props}>
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.3s ease",
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        <DropdownIconSvg classname="w-[25px]" />
      </span>
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;
