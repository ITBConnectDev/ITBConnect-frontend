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
import FriendAchievements from "@/components/profile/friendAchievement";

const FriendDetailPage: NextPage = () => {
  const size = useWindowSize();
  // BESOK GET USER based on user ID, pake data type USER, trus achievement dll
  const router = useRouter();
  const userId = router.query.userId as string;
  const [windowSize, setWindowSize] = useState(0);
  const [page, setPage] = useState(1);
  const [showCopySuccess, setShowCopySuccess] = useState(false);
  const { data } = useQuery(
    ["user", userId],
    () => getUserProfile(parseInt(userId)),
    { enabled: userId !== undefined }
  );
  const { data: achievements } = useQuery(
    ["userAchievements", userId],
    () => getUserAchievements(parseInt(userId), page),
    { enabled: userId !== undefined }
  );

  const copyToClipboard = () => {
    const url = document.location.href;
    navigator.clipboard.writeText(url);
    setShowCopySuccess(true);
    setTimeout(() => {
      setShowCopySuccess(false);
    }, 2000);
  };

  const showCopySuccessMessage = () => {
    return (
      <div className="flex flex-row items-center justify-center">
        <p className="text-green-primary text-xs font-bold">
          Link berhasil disalin
        </p>
      </div>
    );
  };

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
          <div id="share">
            <button
              className="bg-blue-primary text-white text-xs w-55 lg:px-12 py-3 px-3 rounded-md hover:bg-blue-500"
              type="button"
              onClick={copyToClipboard}
            >
              SHARE
            </button>
            {showCopySuccess ? showCopySuccessMessage() : ""}
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
                <p className="text-md text-gray-600">{data?.fullname}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-black text-md font-bold">
                  Nama Panggilan
                </label>
                <p className="text-md text-gray-600">{data?.nickname}</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                <label className="block text-black text-md font-bold">
                  Jurusan
                </label>
                <p className="text-md text-gray-600">{data?.major}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block text-black text-md font-bold">
                  NIM
                </label>
                <p className="text-md text-gray-600">{data?.nim}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] mt-5">
          <label className="block text-black text-md font-bold">Bio</label>
          <p className="text-md text-gray-600">{data?.profile?.bio}</p>
        </div>
        <div className="flex flex-row justify-between mt-5">
          <div className="flex flex-row">
            {data?.profile?.linkedinURL && (
              <Link href={data?.profile.linkedinURL}>
                <button>
                  <Image
                    src={LinkedinBlack}
                    alt="LinkedIn logo"
                    className="bg-no-repeat bg-contain bg-left h-100 w-fit"
                  />
                </button>
              </Link>
            )}
            {data?.profile?.instagramURL && (
              <Link href={data?.profile.instagramURL}>
                <button>
                  <Image
                    src={InstagramBlack}
                    alt="Instagram Logo"
                    className="bg-no-repeat bg-contain bg-left h-100 w-fit"
                  />
                </button>
              </Link>
            )}
          </div>
          {data?.profile?.phoneNumber && (
            <button
              className="bg-blue-primary text-white text-sm lg:px-5 py-3 px-4 rounded-md hover:bg-blue-500 flex flex-row items-center"
              type="button"
            >
              <Image src={IconWA} alt="Whatsapp Logo" className="mr-2" />
              {data?.profile.phoneNumber}
            </button>
          )}
        </div>
      </div>
      {/* Bagian Detail */}
      <div className="mx-auto w-full">
        <div className="flex flex-row flex-wrap justify-center content-center">
          <FriendAchievements userId={parseInt(userId)} />
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
              <div className="flex flex-row flex-wrap">
                {data?.userInterests?.map((interest) => {
                  return (
                    <h1 key={interest.id} className="w-[50%] mb-2">
                      {interest.interest}
                    </h1>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
              <div className="flex flex-row justify-between mb-5">
                <h1 className="text-green-primary text-3xl">Fluent In</h1>
                <div className="flex flex-row mr-4"></div>
              </div>
              <div className="flex flex-row flex-wrap">
                {data?.userLanguages?.map((language) => {
                  return (
                    <h1 key={language.id} className="w-[100%] mb-2">
                      {language.language}
                    </h1>
                  );
                })}
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
