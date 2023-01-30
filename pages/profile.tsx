import { getUserProfile, updateUserProfile } from "@/api/ProfileClient";
import Achievements from "@/components/profile/achievement";
import Interests from "@/components/profile/interests";
import Languages from "@/components/profile/languages";
import { IProfileUser } from "@/types/profile";
import jwtDecode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";
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
      redirect: {
        destination: "/login",
        permanent: false,
      },
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
      redirect: {
        destination: "/login",
        permanent: false,
      },
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

const Profile: NextPage<{ user: IProfileUser }> = ({ user }) => {
  const size = useWindowSize();
  const windowSize = size.width;
  const { register, handleSubmit } = useForm<ProfileInput>();

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
      <form
        onSubmit={handleSubmit(async (data) => {
          updateUserProfile(data)
            .then(() => {
              alert("Berhasil mengubah profile");
            })
            .catch(() => {
              alert("Terjadi kesalahan sistem, harap coba lagi");
            });
        })}
        className="bg-white rounded-lg drop-shadow-2xl my-16 p-8 w-[80%] border-2 m-auto"
      >
        <h1 className="text-blue-primary text-6xl mb-5 font-bold text-center md:text-left">
          Detail Profile
        </h1>
        <div
          className={`flex flex-row ${windowSize <= 1200 ? "flex-wrap" : ""}`}
        >
          <div
            className={`relative h-fit ${
              windowSize <= 1200 ? "mx-auto w-[30%] mb-[30%]" : "w-[20%]"
            }`}
          >
            <Image
              src={SampleProfile}
              alt="Picture of the author"
              className="absolute bg-no-repeat bg-contain bg-left h-100 w-[87%]"
            />
            <Image
              src={EditIcon}
              alt="Picture of the author"
              className="absolute bg-no-repeat bg-contain bg-left h-100 w-[15%] m-[37%]"
            />
          </div>
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%]">
          <label className="block text-black text-sm font-bold mb-2">Bio</label>
          <textarea
            className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
            defaultValue={user.profile?.bio}
            {...register("bio")}
          />
        </div>
        <div className="flex flex-row justify-between mt-4">
          <div className="flex flex-row">
            <Image
              src={LinkedinBlack}
              alt="Picture of the author"
              className="bg-no-repeat bg-contain bg-left h-100 w-fit"
            />
            <div className="w-full md:w-1/2 px-3">
              <input
                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                {...register("linkedinURL")}
                type="text"
                defaultValue={user.profile?.linkedinURL}
              />
            </div>
            <Image
              src={InstagramBlack}
              alt="Picture of the author"
              className="bg-no-repeat bg-contain bg-left h-100 w-fit"
            />
            <div className="w-full md:w-1/2 px-3">
              <input
                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                {...register("instagramURL")}
                type="text"
                defaultValue={user.profile?.instagramURL}
              />
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
      <div className="mx-auto">
        <div className="flex flex-row flex-wrap justify-center content-center w-full">
          <Achievements />
          <div
            className={`h-fit ${
              windowSize <= 1200 ? "mx-auto w-[80%]" : "ml-11 w-[40%]"
            }`}
          >
            <Interests interests={user.userInterests} />
            <Languages languages={user.userLanguages} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
