"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { AuthCard } from "@/components/common";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/services/auth.service";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/store";
import { setCredentials } from "@/store/slices/authSlice";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  // Middleware handles redirects now, but we can keep this for client-side state sync if needed
  // or remove it to rely purely on middleware
  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const mutation = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      Cookies.set("token", data.token, { expires: 7 }); // Set cookie for 7 days
      dispatch(setCredentials({ user: data.user, token: data.token }));
      toast.success("Login successful");
      router.push("/");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <AuthCard
      title="Admin Portal"
      description="Enter your credentials to continue"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            {...formik.getFieldProps("email")}
            className={
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : ""
            }
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...formik.getFieldProps("password")}
              className={
                formik.touched.password && formik.errors.password
                  ? "border-red-500 pr-10"
                  : "pr-10"
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full h-11 bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-primary/25 rounded-xl font-medium text-base"
        >
          {mutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </AuthCard>
  );
};
