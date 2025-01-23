"use client";
import { useProfile } from "@/api/services/profile/hooks";
import React, { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: profile, isPending: isProfilePending } = useProfile();

  useEffect(() => {
    // If the user is not authenticated, redirect to the login page
    if (!profile && !isProfilePending) {
      window.location.href = "/login";
    }
  }, [isProfilePending, profile]);

  // If the user is authenticated, render the WrappedComponent
  // Otherwise, render null while the redirection is in progress
  return profile ? children : null;
};
