import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, FetchData } from "../Pages";
export const Allroutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<FetchData />} />
    </Routes>
  );
};
