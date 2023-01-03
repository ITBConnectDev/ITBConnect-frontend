import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import sample from "../assets/sample.svg";
import viewsImage from "../assets/views.svg";

interface EventCardProps {
  image: any;
  date: string;
  views: string;
  title: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  date,
  views,
  title,
  link,
}) => {

  return (
    <Link
      className="max-w-sm bg-white border-2 border-gray-200 rounded-lg"
      href={link}
    >
      <Image
        src={sample}
        alt="Picture of the author"
        className={`bg-no-repeat bg-contain rounded-t-lg`}
      />
      <div className="p-6">
        <div className={`flex lg:justify-between lg:flex-row flex-col mb-2.5`}>
          <p className="text-green-primary">{date}</p>
          <div className={`flex flex-row`}>
            <Image
              src={viewsImage}
              alt="Picture of the author"
              className={`rounded-t-lg`}
            />
            <p className="text-blue-primary ml-2.5">{views}</p>
          </div>
        </div>
        <div className="font-bold text-2xl">
          <h1>{title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
