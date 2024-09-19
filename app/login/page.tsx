import { Metadata } from "next";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const metadata: Metadata = {
  title: "Login page",
  description: "login page description",
};

const LoginPage = () => {
  return (
    <div className='w-[350px] mx-auto flex justify-center items-center h-screen'>
      <Card>
        <CardHeader>
          <CardTitle>Login with Google</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full space-x-2" variant= 'outline'>
            <FcGoogle className="'w-5 h-5 text-white"/>
            <span>Continue with Google</span>
          </Button>
        </CardContent>
       
      </Card>
    </div>
  );
};

export default LoginPage;
