import { register as registerUser } from "@/api/AuthClient";
import useMajors from "@/hooks/useMajors";
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
  fullname: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  NIM: string;
};

const Register: NextPage = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    watch,
  } = useForm<FormValues>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const majors = useMajors();

  const registerMutation = useMutation(registerUser, {
    onSuccess(data, variables, context) {
      queryClient.setQueryData("authUser", data);
      router.push("/");
    },
    onError(err, variables, context) {
      alert("Terjadi kesalahan sistem, harap coba lagi")
    }
  });

  const onSubmit = (data: any) => {
    registerMutation.mutate(data);
  };

  const onError = () => {
    if(Object.values(errors)[0] === undefined) {
      alert("Data wajib diisi")
    } else {
      alert(Object.values(errors)[0]?.message)
    }
  }

  const jurusan = majors[watch("NIM")?.slice(0, 3)];
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
        <div className="px-20 pt-20 lg:pt-32">
          <h1 className="text-blue-primary font-bold text-4xl">Register</h1>
          <div className="flex pt-2">
            <h5 className="text-blue-700 pr-1">Already have account? </h5>
            <Link href="/login">
              <h5 className="text-green-primary"> Sign in</h5>
            </Link>
          </div>
          <div className="">
            <form className="pt-6" onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="mb-4">
                <label className="block text-blue-primary text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("email", {
                    required: "Email wajib diisi.",
                    validate: (value) =>
                      validateEmail(value) || "Email tidak valid.",
                  })}
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                  <label className="block text-blue-primary text-sm font-bold mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    {...register("fullname", {
                      required: "Nama lengkap wajib diisi.",
                      minLength: {
                        value: 4,
                        message: "Nama lengkap minimal 4 karakter.",
                      },
                    })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-blue-primary text-sm font-bold mb-2">
                    Nama Panggilan
                  </label>
                  <input
                    className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    {...register("nickname", {
                      required: "Nama panggilan wajib diisi.",
                      minLength: {
                        value: 2,
                        message: "Nama panggilan minimal 2 karakter.",
                      },
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                  <label className="block text-blue-primary text-sm font-bold mb-2">
                    NIM
                  </label>
                  <input
                    className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    {...register("NIM", {
                      required: "NIM wajib diisi.",
                      validate: (value) =>
                        (value.length === 8 &&
                          Object.keys(majors).includes(value.slice(0, 3))) ||
                        "NIM tidak valid.",
                    })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-blue-primary text-sm font-bold mb-2">
                    Jurusan
                  </label>
                  <input
                    className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    readOnly
                    value={jurusan || ""}
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-2">
                <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                  <label className="block text-blue-primary text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    {...register("password", {
                      required: "Password wajib diisi.",
                      minLength: {
                        value: 6,
                        message: "Password minimal 6 karakter.",
                      },
                    })}
                  />
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-blue-primary text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    {...register("confirmPassword", {
                      validate: (value) =>
                        getValues("password") === value ||
                        "Password tidak sama.",
                    })}
                  />
                </div>
              </div>
              <label className="block text-blue-primary text-sm font-bold mb-4">
                Or Sign Up with
              </label>
              <div className="flex items-center justify-between">
                <button
                  className="bg-white text-blue-primary border-blue-primary border-2 py-2 px-12 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Google
                </button>
                <button
                  className="inline-block align-baseline bg-blue-primary hover:bg-blue-700 text-white py-2 px-8 rounded focus:outline-none focus:shadow-outline border-blue-primary border-2"
                  type="submit"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
