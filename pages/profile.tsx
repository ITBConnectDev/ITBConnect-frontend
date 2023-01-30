import { getUserProfile, updateUserProfile } from "@/api/ProfileClient";
import useAchievements from "@/hooks/useAchievements";
import useAuth from "@/hooks/useAuth";
import { IAchievement, IProfileUser } from "@/types/profile";
import jwtDecode from "jwt-decode";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddIcon from "../assets/AddIcon.svg";
import EditIcon from "../assets/EditIcon.svg";
import EditTextIcon from "../assets/EditTextIcon.svg";
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

function Achievements() {
  const size = useWindowSize();
  const { user } = useAuth();
  const windowSize = size.width;
  const [page, setPage] = useState(0);
  const { data } = useAchievements(user?.id, page);

  return (
    <div
      className={`bg-white rounded-lg drop-shadow-2xl p-8 h-fit border-2 ${
        windowSize <= 1200 ? "mx-auto w-[80%] mb-5" : "w-[38%]"
      }`}
    >
      <div className="flex flex-row justify-between mb-5">
        <h2 className="text-green-primary text-3xl">Achievement</h2>
        <Image
          src={AddIcon}
          alt="Picture of the author"
          className="bg-no-repeat bg-contain bg-left h-100 w-[10%] md:w-[5%]"
        />
      </div>
      <ul>
        {data?.achievements.map((achievement) => (
          <Achievement key={achievement.id} achievement={achievement} />
        ))}
      </ul>
      <nav aria-label="Page navigation example" className="m-auto mb-8">
        <ul className="inline-flex items-center -space-x-px">
          <li
            role="button"
            onClick={() => setPage(Math.max(page - 1, 0))}
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
          {data &&
            Array.from(Array(data.pageTotal), (e, i) => {
              return (
                <li
                  role="button"
                  key={i}
                  onClick={() => setPage(Math.max(i + 1, 0))}
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {i + 1}
                </li>
              );
            })}
          <li
            role="button"
            onClick={() =>
              setPage(Math.min(page + 1, data?.pageTotal ?? page + 1))
            }
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Achievement({ achievement }: { achievement: IAchievement }) {
  return (
    <li>
      <div className="flex flex-row justify-between">
        <h4 className="text-xl">{achievement.achievement}</h4>
        <Image
          src={EditTextIcon}
          alt="Picture of the author"
          className="bg-no-repeat bg-contain bg-left h-100 w-[15%] md:w-[5%]"
        />
      </div>
      <p className="text-gray-500 my-1">
        Issued by {achievement.issuer} .{" "}
        {new Date(achievement.date).toLocaleDateString("en", {
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="text-gray-600 mb-2">{achievement.description}</p>
      <hr />
    </li>
  );
}

function Interests({
  interests,
}: {
  interests: IProfileUser["userInterests"];
}) {
  return (
    <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
      <div className="flex flex-row justify-between mb-5">
        <h2 className="text-green-primary text-3xl">Skills / Interest</h2>
        <div className="flex flex-row mr-4">
          <Image
            src={AddIcon}
            alt="Picture of the author"
            className="bg-no-repeat bg-contain bg-left h-100 w-[60%]"
          />
          <Image
            src={EditTextIcon}
            alt="Picture of the author"
            className="bg-no-repeat bg-contain bg-left h-100 w-[60%] ml-4"
          />
        </div>
      </div>
      <ul className="flex flex-row flex-wrap">
        {interests.map((interest) => (
          <li className="w-1/2 first:mb-2" key={interest.id}>
            {interest.interest}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Languages({
  languages,
}: {
  languages: IProfileUser["userLanguages"];
}) {
  return (
    <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
      <div className="flex flex-row justify-between mb-5">
        <h1 className="text-green-primary text-3xl">Fluent In</h1>
        <div className="flex flex-row mr-4">
          <Image
            src={AddIcon}
            alt="Picture of the author"
            className="bg-no-repeat bg-contain bg-left h-100 w-[60%]"
          />
          <Image
            src={EditTextIcon}
            alt="Picture of the author"
            className="bg-no-repeat bg-contain bg-left h-100 w-[60%] ml-4"
          />
        </div>
      </div>

      <ul className="flex flex-row flex-wrap">
        {languages.map((language) => (
          <li key={language.id} className="w-full first:mb-2">
            {language.language}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
