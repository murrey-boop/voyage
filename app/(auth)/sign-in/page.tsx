'use client';

import { signIn } from "@auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Icons } from "lucide-react";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function SignInPage() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: any) => {
    const result = await signIn("credentials", { ...data, redirect: false });
    if (result?.ok) window.location.href = "/booking";
    else console.error("Login failed:", result.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input type="email" placeholder="Email" {...register("email")} />
          <Input type="password" placeholder="Password" {...register("password")} />
          <Button type="submit" className="w-full">Continue</Button>
        </form>
        <div className="flex items-center gap-2">
          <span>or sign in with Google</span>
          <Button variant="outline" onClick={() => signIn("google")}>
            <Icons.google className="mr-2" /> Google
          </Button>
        </div>
        <p className="text-sm">
          New here? <Link href="/auth/sign-up" className="text-blue-500 hover:underline">Create an account</Link>
        </p>
      </Card>
    </div>
  );
}

