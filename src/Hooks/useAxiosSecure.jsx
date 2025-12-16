import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, signOute } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterSep = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    // interseptor responsive
    const resInterSep = axiosSecure.interceptors.response.use(
      (responce) => {
        return responce;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          signOute().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterSep);
      axiosSecure.interceptors.response.eject(resInterSep);
    };
  }, [user, signOute, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
