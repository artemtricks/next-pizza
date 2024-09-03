"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="812226d631e1c143288f9689cdca11921617aca4"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
