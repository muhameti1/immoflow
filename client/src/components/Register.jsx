import { useState } from "react";
import axiosInstance from "../api/axios";
import { Button } from "./ui/button";
import { RegisterForm } from "./register-form";

const Register = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
