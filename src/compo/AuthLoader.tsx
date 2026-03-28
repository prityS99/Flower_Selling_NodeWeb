"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/Hooks/Redux/store";
import { setUser } from "../Hooks/Redux/Slices/authSlice";

export default function AuthLoader() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const loadUser = async () => {
      try {
        const res = await fetch("http://localhost:3002/app/v1/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          dispatch(
            setUser({
              ...data.data,
              token,
              isAuthenticated: true,
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadUser();
  }, [dispatch]);

  return null;
}