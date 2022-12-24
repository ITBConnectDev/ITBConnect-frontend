import Image from "next/image";
import React, { useEffect, useState } from "react";
import sampleOrang from "../assets/sampleOrang.svg";
import { useWindowSize } from "../utils/windowsize";

interface EventCardProps {
  image: any;
  role: string;
  company: string;
  nama_orang: string;
  tag: string;
  link: string;
}

const ExploreCard: React.FC<EventCardProps> = ({
  image,
  role,
  company,
  tag,
  nama_orang,
  link,
}) => {
  const changePage = () => {
    window.location.href = link;
  };

  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  return (
    <div className="max-w-sm bg-white border-2 border-gray-200 rounded-lg">
      <a href={link}>
        <Image
          src={sampleOrang}
          alt="Picture of the author"
          className={`bg-no-repeat bg-contain rounded-t-lg`}
        />
      </a>
      <div className="p-6">
        <h1 className="font-bold text-2xl">{nama_orang}</h1>
        <p className="text-base text-green-primary font-semibold">{role}</p>
        <p className="text-base text-green-primary font-semibold">{company}</p>
        <div className="bg-green-primary px-4 py-2 rounded-lg text-center text-white mt-2.5">
          {tag}
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
