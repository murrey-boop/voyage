'use client';

import { signUp } from "auth/react"; // only if auth.js has signUp
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(data => data.password === data.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: any) => {
    // Implement your own POST /api/auth/signup or use auth.js credentials flow
    await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    signIn("credentials", { email: data.email, password: data.password, redirect: false });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input type="email" placeholder="Email" {...register("email")} />
          <Input type="password" placeholder="Password" {...register("password")} />
          <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          <Button type="submit" className="w-full">Create Account</Button>
        </form>
        <p className="text-sm">
          Already have an account? <Link href="/auth/sign-in" className="text-blue-500 hover:underline">Sign In</Link>
        </p>
      </Card>
    </div>
  );
}
