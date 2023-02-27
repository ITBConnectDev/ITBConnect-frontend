import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import sampleOrang from "../assets/sampleOrang.svg";

interface profileDetailCardProps {
  image: any;
  fullname: string;
  nickname: string;
  major: string;
  year: number;
  bio: string;
  phoneNumber: string;
  instagramURL: string;
  linkedinURL: string;
}

const ProfileDetailCard: React.FC<profileDetailCardProps> = ({
  image,
  fullname,
  nickname,
  major,
  year,
  bio,
  phoneNumber,
  instagramURL,
  linkedinURL,
}) => {
  const router = useRouter();
  return (
    <div
      className={
        "max-w-sm lg:max-w-full bg-white border-2 rounded-[16px] drop-shadow-lg mt-6"
      }
    >
      <div className="flex flex-col">
        <div className={`flex flex-row items-center justify-around mt-2`}>
          <div>
            <h1
              className={`text-center lg:text-4xl text-2xl text-blue-primary font-bold mt-[3%] mx-auto`}
            >
              Detail Profile
            </h1>
          </div>
          <div>
            <button
              className="bg-blue-primary text-white text-xs w-55 lg:px-4 py-3 px-3 rounded-md hover:bg-blue-500"
              onClick={() =>
                navigator.share({
                  url: window.location.href,
                  title: "Share this profile",
                })
              }
              type="button"
            >
              SHARE
            </button>
          </div>
        </div>
        <Image src={sampleOrang} alt="Foto profil" className="rounded-full" />
      </div>
    </div>
  );
};

export default ProfileDetailCard;
