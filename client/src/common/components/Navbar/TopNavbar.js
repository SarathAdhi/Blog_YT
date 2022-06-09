import React from "react";
import { Divider } from "../elements/Divider";
import { H3 } from "../elements/Text";

export const TopNavbar = ({ title }) => {
  return (
    <div className="sticky top-0 bg-[#111] z-40">
      <H3 className="text-xl md:text-3xl text-center py-3">{title}</H3>
      <Divider />
    </div>
  );
};
