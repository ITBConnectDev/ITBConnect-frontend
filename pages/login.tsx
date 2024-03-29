import { login } from "@/api/AuthClient";
import { APIError } from "@/api/request";
import { validateEmail } from "@/utils/string";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import LoginImage from "../assets/LoginImage.png";
import Logo from "../assets/Logo.png";

type FormValues = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const loginMutation = useMutation(login, {
    onSuccess(data, variables, context) {
      queryClient.setQueryData("authUser", data);
      router.push("/");
    },
    onError(err, variables, context) {
      if (
        err instanceof APIError &&
        typeof err.data === "string" &&
        err.status < 500
      ) {
        alert(err.data);
      } else {
        alert("Terjadi kesalahan sistem, harap coba lagi");
      }
    },
  });
  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  const onError = () => {
    if (errors) {
      if (Object.values(errors)[0] === undefined) {
        alert("Data wajib diisi");
      } else {
        alert(Object.values(errors)[0]?.message);
      }
    }
  };

  return (
    <div className="flex h-screen flex-row">
      <Image
        src={LoginImage}
        alt="Picture of the author"
        className="hide-items bg-no-repeat bg-contain bg-left h-100 w-fit"
      />
      <div className="w-full">
        <h1 className="show-items text-center text-green-primary text-xl font-semibold mt-20 mb-8">
          Selamat datang!
        </h1>
        <Image
          src={Logo}
          alt="Picture of the author"
          className="show-items m-auto w-6/12"
        />
        <div className="px-4 md:px-20 pt-20 lg:pt-32">
          <h1 className="text-blue-primary font-bold text-4xl">Login</h1>
          <div className="flex pt-2">
            <h5 className="text-blue-700 pr-1">Don&apos;t have account? </h5>
            <Link href="/register">
              <h5 className="text-green-primary"> Sign up</h5>
            </Link>
          </div>
          <div className="">
            <form
              className="pt-6 pb-12"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <div className="mb-4">
                <label className="block text-blue-primary text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  {...register("email", {
                    required: "Email wajib diisi.",
                    validate: (value) =>
                      validateEmail(value) || "Email tidak valid.",
                  })}
                  placeholder="Email"
                />
              </div>
              <div className="mb-1">
                <label className="block text-blue-primary text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password wajib diisi.",
                  })}
                />
              </div>
              <div className="flex items-center justify-between mb-12">
                <button
                  className="inline-block align-baseline bg-blue-primary hover:bg-blue-700 text-white py-2 px-12 rounded focus:outline-none focus:shadow-outline border-blue-primary border-2"
                  type="submit"
                >
                  Login
                </button>
              </div>
              {/* <div className="flex pt-8">
                <h5 className="text-blue-700 pr-1">Forgot your password? </h5>
                <h5 className="text-green-primary">Reset password</h5>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
