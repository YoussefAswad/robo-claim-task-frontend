"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotifications } from "@toolpad/core";
import { useLogin } from "@/api/services/login/hooks";
import Link from "next/link";
import { useProfile } from "@/api/services/profile/hooks";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const formSchema = z.object({
  email: z
    .string({
      message: "Email is required.",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string({
      message: "Password is required.",
    })
    .min(1),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const notifications = useNotifications();

  const loginMutation = useLogin();

  const { data: profile } = useProfile();

  React.useEffect(() => {
    if (profile) {
      router.push("/");
    }
  }, [profile, router]);

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    loginMutation.mutate(formData, {
      onSuccess: () => {
        console.log("Logged in successfully");
        notifications.show("Logged in successfully", {
          severity: "success",
        });
        router.push("/");
      },
      onError: (error) => {
        console.error(error);
        notifications.show(error.message, {
          severity: "error",
        });
      },
    });
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={form.handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                type="email"
                label="Email"
                autoFocus
                variant="outlined"
                autoComplete="email"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <TextField
                value={field.value}
                onChange={field.onChange}
                type="password"
                label="Password"
                variant="outlined"
                autoComplete="current-password"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Button type="submit" fullWidth variant="contained">
            {loginMutation.isPending ? "Loading..." : "Sign in"}
          </Button>

          <Link href="/register" className="text-sky-500">
            {"Don't have an account? Register here"}
          </Link>
        </Box>
      </Card>
    </SignInContainer>
  );
}
