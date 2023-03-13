/* eslint-disable @next/next/no-img-element */
import {
  getUserProfile,
  updateUserProfile,
  uploadPhoto,
} from "@/api/ProfileClient";
import Achievements from "@/components/profile/achievement";
import Interests from "@/components/profile/interests";
import Languages from "@/components/profile/languages";
import useAuth from "@/hooks/useAuth";
import { IProfileUser } from "@/types/profile";
import jwtDecode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import EditIcon from "../assets/EditIcon.svg";
import InstagramBlack from "../assets/InstagramBlack.svg";
import LinkedinBlack from "../assets/LinkedinBlack.svg";
import SampleProfile from "../assets/SampleProfile.svg";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useWindowSize } from "../utils/windowsize";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { token } = req.cookies;
  if (!token) {
    return {
      props: {},
    };
  }
  try {
    const { id } = jwtDecode<{ id: number }>(token);
    const user = await getUserProfile(id, {
      cookie: req.headers.cookie,
    });
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

interface ProfileInput {
  fullname: string;
  nickname: string;
  phoneNumber: string;
  bio: string;
  linkedinURL: string;
  instagramURL: string;
}

const Profile: NextPage<{ user?: IProfileUser }> = ({ user: initialUser }) => {
  const size = useWindowSize();
  const windowSize = size.width;
  const { register, handleSubmit } = useForm<ProfileInput>();
  const [photo, setPhoto] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { user: userAuth } = useAuth();
  const { data: user } = useQuery(
    ["profile", userAuth?.id],
    () => getUserProfile(userAuth!.id),
    {
      enabled: !!userAuth,
      initialData: initialUser,
    }
  );

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
      {user && (
        <div className="w-full md:w-[80%] mx-auto px-4">
          <form
            onSubmit={handleSubmit(async (data) => {
              let photoURL: string | undefined = undefined;
              if (photo) {
                try {
                  const res = await uploadPhoto([photo]);
                  photoURL = res[0];
                } catch {
                  alert("Gagal mengupload foto. Harap coba lagi");
                  return;
                }
              }
              updateUserProfile(photoURL ? { ...data, photoURL } : data)
                .then(() => {
                  alert("Berhasil mengubah profile");
                })
                .catch(() => {
                  alert("Terjadi kesalahan sistem, harap coba lagi");
                });
            })}
            className="bg-white rounded-lg drop-shadow-2xl my-16 p-8 w-full border-2 m-auto"
          >
            <h1 className="text-blue-primary text-5xl mb-5 font-bold font-rubik text-center md:text-left">
              Detail Profile
            </h1>
            <div
              className={`flex flex-row  items-center gap-10 lg:gap-20 ${
                windowSize <= 1200 ? "flex-wrap" : ""
              }`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileRef}
                onChange={(e) => {
                  if (e.target.files) {
                    setPhoto(e.target.files[0]);
                  }
                }}
              />
              <button
                type="button"
                className={`relative aspect-square rounded-full flex-shrink-0 group ${
                  windowSize <= 1200
                    ? "mx-auto w-full max-w-[127px]"
                    : "w-[20%]"
                }`}
                onClick={() => fileRef.current?.click()}
              >
                <Image
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : user.photo
                      ? user.photo.url
                      : SampleProfile
                  }
                  fill
                  alt="Picture of the author"
                  className="object-cover bg-left rounded-full w-full h-full"
                />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 duration-300 flex items-center justify-center bg-white/50">
                  <Image
                    src={EditIcon}
                    alt="Picture of the author"
                    height={72}
                    width={72}
                    className="bg-no-repeat bg-contain bg-left"
                  />
                </div>
              </button>
              <div className="w-[100%] md:w-[80%]">
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                    <label className="block text-black text-sm font-bold mb-2">
                      Nama
                    </label>
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("fullname")}
                      type="text"
                      defaultValue={user.fullname}
                      placeholder="Nama"
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-black text-sm font-bold mb-2">
                      Nama Panggilan
                    </label>
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("nickname")}
                      type="text"
                      defaultValue={user.nickname}
                      placeholder="Nama panggilan"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                    <label className="block text-black text-sm font-bold mb-2">
                      Jurusan
                    </label>
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={user.major}
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-black text-sm font-bold mb-2">
                      NIM
                    </label>
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={user.nim}
                      readOnly
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                    <label className="block text-black text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block text-black text-sm font-bold mb-2">
                      Nomor HP
                    </label>
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("phoneNumber")}
                      type="tel"
                      defaultValue={user.profile?.phoneNumber}
                      placeholder="Nomor HP"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%]">
              <label className="block text-black text-sm font-bold mb-2">
                Bio
              </label>
              <textarea
                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={user.profile?.bio}
                {...register("bio")}
                placeholder="Bio"
              />
            </div>
            <div className="flex flex-row justify-between mt-4 items-end">
              <div className="flex flex-1 flex-col md:flex-row items-center">
                <div className="flex items-center flex-1 w-full">
                  <Image
                    src={LinkedinBlack}
                    alt="Picture of the author"
                    className="bg-no-repeat bg-contain bg-left h-100 w-fit"
                  />
                  <div className="px-3 w-full lg:w-3/4">
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("linkedinURL")}
                      type="text"
                      defaultValue={user.profile?.linkedinURL}
                      placeholder="https://linkedin.com/in/john"
                    />
                  </div>
                </div>
                <div className="flex items-center flex-1 w-full">
                  <Image
                    src={InstagramBlack}
                    alt="Picture of the author"
                    className="bg-no-repeat bg-contain bg-left h-100 w-fit"
                  />
                  <div className="px-3 w-full lg:w-3/4">
                    <input
                      className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                      {...register("instagramURL")}
                      type="text"
                      defaultValue={user.profile?.instagramURL}
                      placeholder="https://instagram.com/john"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="py-2 px-2 bg-white border-2 rounded-lg border-secondary"
              >
                Ubah
              </button>
            </div>
          </form>
          <div className="w-full mb-8">
            <div className="grid lg:grid-cols-2 w-full gap-x-10 gap-y-5 items-stretch">
              <Achievements />
              <div className={`h-full flex flex-col gap-5`}>
                <Interests interests={user.userInterests} />
                <Languages languages={user.userLanguages} />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Profile;
