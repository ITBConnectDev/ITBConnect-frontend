import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useWindowSize } from "@/utils/windowsize";
import Link from "next/link";
import ProfileDetailCard from "@/components/profileDetailCard";
import IconWA from "../../assets/IconWA.svg";
import InstagramBlack from "../../assets/InstagramBlack.svg";
import LinkedinBlack from "../../assets/LinkedinBlack.svg";
import sampleOrang from "../../assets/sampleOrang.svg";
import index1 from "../../assets/Index1.svg";
import index6 from "../../assets/Index6.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import useAchievements from "@/hooks/useAchievements";
import { useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { getUserAchievements, getUserProfile } from "@/api/ProfileClient";
import { IAchievement, IProfileUser } from "@/types/profile";
import { GetServerSideProps, NextPage } from "next";
import jwtDecode from "jwt-decode";
import { getAllFriend, getFriendProfile } from "@/api/FriendsClient";
import { useQuery } from "react-query";

const FriendDetailPage: NextPage = () => {
  const size = useWindowSize();
  // BESOK GET USER based on user ID, pake data type USER, trus achievement dll
  const router = useRouter();
  const userId = router.query.userId as string;
  const [windowSize, setWindowSize] = useState(0);
  const [page, setPage] = useState(1);
  const { data } = useQuery(
    ["user", userId],
    () => {
      getUserProfile(parseInt(userId));
    },
    { enabled: userId !== undefined }
  );
  console.log(userId, data);
  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-row items-center justify-between">
        {windowSize <= 1200 ? (
          ""
        ) : (
          <Image
            src={index1}
            alt="Decorative image"
            className="lg:max-h-48 max-h-28 -z-10"
          />
        )}
        <h1
          className={`text-center w-screen lg:text-6xl text-4xl text-green-primary mt-[5%] lg:mt-0 font-bold mx-auto`}
        >
          Cari Teman
        </h1>
        {windowSize <= 1200 ? (
          ""
        ) : (
          <Image
            src={index1}
            alt="Decorative image"
            className="lg:max-h-48 max-h-28 -z-10"
          />
        )}
      </div>
      <div className="bg-white rounded-[16px] drop-shadow-2xl my-16 p-8 w-[80%] border-2 m-auto">
        <div className={`flex flex-row items-center justify-between mb-7`}>
          <div>
            <h1 className="text-blue-primary text-2xl md:text-5xl font-bold text-center md:text-left">
              Detail Profile
            </h1>
          </div>
          <div>
            <button
              className="bg-blue-primary text-white text-xs w-55 lg:px-12 py-3 px-3 rounded-md hover:bg-blue-500"
              type="button"
            >
              SHARE
            </button>
          </div>
        </div>
        <div
          className={`flex flex-row ${
            windowSize <= 1200 ? "flex-wrap" : "items-center"
          }`}
        >
          <div
            className={`relative h-fit ${
              windowSize <= 1200 ? "mx-auto w-[50%] mb-[5%]" : "w-[20%]"
            }`}
          >
            <Image
              src={sampleOrang}
              alt="Picture of the author"
              className="bg-no-repeat bg-contain bg-left h-100 w-[87%] rounded-full"
            />
          </div>
          <div
            className={`w-[100%] md:w-[80%] ${
              windowSize <= 1200 ? "" : "ml-5"
            }`}
          >
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                <label className="block text-black text-md font-bold">
                  Nama
                </label>
                <p className="text-md text-gray-600">John Doe</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-black text-md font-bold">
                  Nama Panggilan
                </label>
                <p className="text-md text-gray-600">John</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                <label className="block text-black text-md font-bold">
                  Jurusan
                </label>
                <p className="text-md text-gray-600">John Doe</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-black text-md font-bold">
                  NIM
                </label>
                <p className="text-md text-gray-600">13520000</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-5">
          <label className="block text-black text-md font-bold">Bio</label>
          <p className="text-md text-gray-600">John Doe</p>
        </div>
        <div className="flex flex-row justify-between mt-5">
          <div className="flex flex-row">
            <button>
              <Image
                src={LinkedinBlack}
                alt="LinkedIn logo"
                className="bg-no-repeat bg-contain bg-left h-100 w-fit"
              />
            </button>
            <button className="mx-5">
              <Image
                src={InstagramBlack}
                alt="Instagram Logo"
                className="bg-no-repeat bg-contain bg-left h-100 w-fit"
              />
            </button>
          </div>
          <button
            className="bg-blue-primary text-white text-sm lg:px-5 py-3 px-4 rounded-md hover:bg-blue-500 flex flex-row items-center"
            type="button"
          >
            <Image src={IconWA} alt="Whatsapp Logo" className="mr-2" />
            08080880808080
          </button>
        </div>
      </div>
      {/* Bagian Detail */}
      <div className="mx-auto">
        <div className="flex flex-row flex-wrap justify-center content-center">
          <div
            className={`bg-white rounded-lg drop-shadow-2xl p-8 h-fit border-2 ${
              windowSize <= 1200 ? "mx-auto w-[80%] mb-5" : "w-[38%]"
            }`}
          >
            <div className="flex flex-row justify-between mb-5">
              <h1 className="text-green-primary text-3xl">Achievement</h1>
            </div>
            {/* TODO: Integrate with Backend */}
            <div>
              <div className="flex flex-row justify-between">
                <h1 className="text-xl">
                  Juara 1 Data Science Competition Arkavidia 8.0
                </h1>
              </div>
              <p className="text-gray-500 my-1">
                Issued by HMIF Institut Teknologi Bandung . Mar 2023
              </p>
              <p className="text-gray-600 mb-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque,
                egestas sapien nunc, quis viverra nisl vitae risus, lectus. Est
                ornare hac scelerisque tempor. A, quam in faucibus bibendum.
                Cursus dictumst etiam quis molestie.
              </p>
              <hr />
            </div>
            {/* TODO: Integrate pagination with Backend */}
            <nav aria-label="Page navigation example" className="m-auto mb-8">
              <ul className="inline-flex items-center -space-x-px">
                <li onClick={() => setPage(Math.max(page - 1, 0))}>
                  <a
                    href="#"
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
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li>
                {/* {data &&
                  Array.from(Array(data.data.pageTotal), (e, i) => {
                    return (
                      <li key={i} onClick={() => setPage(Math.max(i + 1, 0))}>
                        <a
                          href="#"
                          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                          {i + 1}
                        </a>
                      </li>
                    );
                  })}
                <li
                  onClick={() =>
                    setPage(Math.min(page + 1, data.data.pageTotal))
                  }
                >
                  <a className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </li> */}
              </ul>
            </nav>
          </div>
          <div
            className={`h-fit ${
              windowSize <= 1200 ? "mx-auto w-[80%]" : "ml-11 w-[40%]"
            }`}
          >
            <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
              <div className="flex flex-row justify-between mb-5">
                <h1 className="text-green-primary text-3xl">
                  Skills / Interest
                </h1>
                <div className="flex flex-row mr-4"></div>
              </div>
              {/* TODO: Integrate skills with Backend */}
              <div className="flex flex-row flex-wrap">
                <h1 className="w-[50%] mb-2">Data scientist</h1>
                <h1 className="w-[50%]">UI UX</h1>
                <h1 className="w-[50%]">Web</h1>
              </div>
            </div>
            <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
              <div className="flex flex-row justify-between mb-5">
                <h1 className="text-green-primary text-3xl">Fluent In</h1>
                <div className="flex flex-row mr-4"></div>
              </div>
              {/* TODO: Integrate language with Backend */}
              <div className="flex flex-row flex-wrap">
                <h1 className="w-[100%] mb-2">Bahasa Indonesia</h1>
                <h1 className="w-[100%]">English</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={index6}
        alt="Decoration"
        className="self-end lg:max-h-44 hidden lg:block mt-[5%]"
      />
      <Footer />
    </div>
  );
};

export default FriendDetailPage;
