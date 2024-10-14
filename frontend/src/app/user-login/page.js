"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { loginUser, registerUser } from "@/service/auth.service";
import toast from "react-hot-toast";

const Page = () => {
  const router = useRouter();
  const [isLoading,setIsLoading]= useState(true)

  const registerSchema = yup.object().shape({
    username: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    dateOfBirth: yup.date().required("Birth date is required"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"], "please select a gender")
      .required("Gender is required"),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    reset: resetLoginForm,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    reset: resetSignUpForm,
    formState: { errors: errorsSignUp },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });


  const onSubmitRegister = async(data) =>{
    try {
       const result = await registerUser(data)
        if(result.status === 'success'){
          router.push('/')
        }
        toast.success('User register successfully')
    } catch (error) {
      console.error(error);
      toast.error('email already exist')
    }finally{
      setIsLoading(false);
    }
  }


  //reset the form
  useEffect(() =>{
     resetLoginForm();
     resetSignUpForm()
  },[resetLoginForm,resetSignUpForm])


  const onSubmitLogin = async(data) =>{
    try {
       const result = await loginUser(data)
        if(result.status === 'success'){
          router.push('/')
        }
        toast.success('User login successfully')
    } catch (error) {
      console.error(error);
      toast.error('invalid email or password')
    }finally{
      setIsLoading(false);
    }
  }


  const handleGoogleLogin = () =>{
    window.location.href= `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md dark:text-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              <span>Facebook</span>
            </CardTitle>
            <CardDescription className="text-center">
              Connect with frineds and the world around you on facebook
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loginEmail">Email</Label>
                      <Input
                        id="loginEmail"
                        name="email"
                        type="email"
                        {...registerLogin("email")}
                        placeholder="Enter your email"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsLogin.email && (
                        <p className="text-red-500">
                          {errorsLogin.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="loginPassword">Password</Label>
                      <Input
                        id="loginPassword"
                        name="password"
                        type="password"
                        {...registerLogin("password")}
                        placeholder="Enter your Password"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsLogin.password && (
                        <p className="text-red-500">
                          {errorsLogin.password.message}
                        </p>
                      )}
                    </div>
                    <Button className="w-full" type="submit">
                      <LogIn className="mr-2 w-4 h-4" /> Log in
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSubmitSignUp(onSubmitRegister)}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupName">Username</Label>
                      <Input
                        id="signupName"
                        name="username"
                        type="text"
                        {...registerSignUp("username")}
                        placeholder="Enter your username"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.username && (
                        <p className="text-red-500">
                          {errorsSignUp.username.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <Input
                        id="signupEmail"
                        name="email"
                        type="email"
                        {...registerSignUp("email")}
                        placeholder="Enter your email"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.email && (
                        <p className="text-red-500">
                          {errorsSignUp.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <Input
                        id="signPassword"
                        name="password"
                        type="password"
                        {...registerSignUp("password")}
                        placeholder="Enter your Password"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.password && (
                        <p className="text-red-500">
                          {errorsSignUp.password.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupBirthday">Birthdate</Label>
                      <Input
                        id="signupBirthday"
                        name="dateOfBirth"
                        type="date"
                        {...registerSignUp("dateOfBirth")}
                        placeholder="Enter your Password"
                        className="col-span-3 dark:border-gray-400"
                      />
                      {errorsSignUp.dateOfBirth && (
                        <p className="text-red-500">
                          {errorsSignUp.dateOfBirth.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup
                        className="flex justify-between "
                        defaultValue="male"
                        {...registerSignUp("gender")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                      {errorsSignUp.gender && (
                        <p className="text-red-500">
                          {errorsSignUp.gender.message}
                        </p>
                      )}
                    </div>

                    <Button className="w-full" type="submit">
                      <LogIn className="mr-2 w-4 h-4" /> Sign Up
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
                 <div className="absolute inset-0 flex items-center">
                   <span className="w-[30%] border-t border-muted-foreground"></span>
                   <div className="w-[40%]"> </div>
                   <span className="w-[30%] border-t border-muted-foreground">
                   </span>
                   
                 </div>
                 <div className="relative flex justify-center text-xs uppercase">
                    <span className=" px-2 text-muted-foreground">Or continue with</span>
                 </div>
            </div>
            <div className="w-full gap-4">
                <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.95}}>
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin} >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                 Google

                    </Button>

                </motion.div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Page;
