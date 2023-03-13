import useAuth from "@/hooks/useAuth";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FotoCompetition from "../assets/foto_competition.svg";
import FotoFindFriend from "../assets/foto_find_friends.svg";
import Index1 from "../assets/Index1.svg";
import Jumbotron1 from "../assets/Jumbotron1.svg";
import Jumbotron2 from "../assets/Jumbotron2.svg";
import Logo from "../assets/Logo.svg";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useWindowSize } from "../utils/windowsize";

const Home: NextPage = () => {
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();
  const { user } = useAuth();

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex w-full h-max">
        <div className="w-full h-40">
          <div className="max-h-max">
            <Image
              src={Jumbotron1}
              alt="Picture of the author"
              className="ml-auto mr-0 h-full bg-no-repeat bg-contain h-auto w-[70%]"
            />
            <div
              className={`m-auto w-3/4 md:w-1/2 relative ${
                windowSize > 1200 ? "top-[-25vmin]" : "mt-[10vmin]"
              }`}
            >
              <Image
                src={Logo}
                alt="Picture of the author"
                className="m-auto bg-no-repeat bg-contain h-full"
              />
              <div className="bg-green-200 w-auto m-auto mt-6">
                <p className="text-center font-extrabold text-xs md:text-xl">
                  #UniteITBInnovate #ITBInnovationUnity #CollaborateITBThrive
                </p>
              </div>
              <h1 className="text-center font-bold mt-6 text-xs md:text-xl">
                Visioned to remove limitations between groups, encourage and
                amplify collaborations and innovations through out ITB
              </h1>
              {user ? (
                ""
              ) : (
                <div className="m-auto bg-blue-primary p-1 rounded-full w-24 h-8 text-center text-white mt-6">
                  <Link href="/login">Login</Link>
                </div>
              )}
            </div>
            <Image
              src={Jumbotron2}
              alt="Picture of the author"
              className={`bg-no-repeat bg-contain h-auto w-[20%] relative ${
                windowSize > 1200 ? "top-[-35vmin]" : "mt-[10vmin]"
              }`}
            />
          </div>
          <div
            className={`min-h-max py-12 bg-green-primary w-full relative ${
              windowSize > 1200 ? "top-[-35vmin]" : ""
            }`}
          >
            <div className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Feature Present
            </div>
            <div className="p-8 mx-8 md:mx-24 bg-green-100 rounded-lg">
              <div className="grid grid-cols-4 gap-4">
                <div
                  className={`${
                    windowSize > 1200 ? "col-span-1" : "col-span-4"
                  }`}
                >
                  <Image
                    src={FotoCompetition}
                    alt="Picture of the author"
                    className={`bg-no-repeat bg-contain h-auto ${
                      windowSize > 1200 ? "w-[88%]" : "w-[50%]"
                    } mx-auto relative`}
                  />
                </div>
                <div
                  className={`${
                    windowSize > 1200 ? "col-span-3" : "col-span-4"
                  }`}
                >
                  <h2
                    className={`${
                      windowSize > 1200 ? "" : "text-center"
                    } text-blue-primary text-2xl md:text-5xl font-bold mb-5`}
                  >
                    Competition Info
                  </h2>
                  <p>
                    With the Info Competition feature, students have the
                    opportunity to showcase their skills and knowledge,
                    competing against each other in a friendly and supportive
                    environment. Whether you&apos;re looking to build your
                    resume, connect with others in your field, or simply
                    challenge yourself, ITBConnect&apos;s Info Competition is
                    the perfect platform to help you achieve your goals. So why
                    wait? Join ITBConnect today and start competing!
                  </p>
                  <Link
                    className={`${
                      windowSize > 1200 ? "" : "mx-auto"
                    } bg-blue-primary p-1 rounded-lg w-max text-center text-white mt-6 py-3 px-12 block`}
                    href="/competitions"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-8 mx-8 md:mx-24 bg-green-100 rounded-lg mt-6">
              <div className="grid grid-cols-4 gap-4">
                <div
                  className={`${
                    windowSize > 1200 ? "col-span-1" : "col-span-4"
                  }`}
                >
                  <Image
                    src={FotoFindFriend}
                    alt="Picture of the author"
                    className={`bg-no-repeat bg-contain h-auto ${
                      windowSize > 1200 ? "w-[88%]" : "w-[50%]"
                    } mx-auto relative`}
                  />
                </div>
                <div
                  className={`${
                    windowSize > 1200 ? "col-span-3" : "col-span-4"
                  }`}
                >
                  <h2
                    className={`${
                      windowSize > 1200 ? "" : "text-center"
                    } text-blue-primary text-5xl font-bold mb-5`}
                  >
                    Find Friends
                  </h2>
                  <p>
                    With its Find Friends feature, students can connect with
                    others who share their major and interests, forming a
                    community of like-minded individuals who can support and
                    inspire each other. Whether you&apos;re looking for study
                    partners, networking opportunities, or simply a place to
                    connect with others, ITBConnect&apos;s Find Friends feature
                    is the perfect solution. So why wait? Join ITBConnect today
                    and start building meaningful connections with others!
                  </p>
                  <Link
                    className={`${
                      windowSize > 1200 ? "" : "mx-auto"
                    } bg-blue-primary p-1 rounded-lg w-max text-center text-white mt-6 py-3 px-12 block`}
                    href="/explore"
                  >
                    LEARN MORE
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative pb-16 mt-8 ${
              windowSize > 1200 ? "top-[-35vmin]" : ""
            }`}
          >
            <div className={`flex justify-between`}>
              <Image
                src={Index1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto ${
                  windowSize > 1200 ? "w-[10%]" : "hidden"
                } relative`}
              />
              <h2
                className={`text-center text-5xl text-blue-primary font-bold mt-[3%] ${
                  windowSize > 1200 ? "" : "mx-auto"
                }`}
              >
                How does it work?
              </h2>
              <Image
                src={Index1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto ${
                  windowSize > 1200 ? "w-[10%]" : "hidden"
                } relative`}
              />
            </div>
            <div className="bg-gray-200 mx-4 md:mx-36 px-8 md:px-16 py-12 min-h-[500px] mt-12 text-base md:text-xl text-black">
              <p className="">
                ITBConnect is a simple and intuitive platform that makes it easy
                for college students to connect, compete, and bring their ideas
                to life. Here&apos;s how it works:
              </p>
              <ol className="ml-8 my-4 list-decimal flex flex-col gap-2">
                <li>
                  Sign up: To get started, simply sign up for an ITBConnect
                  account using your college email address. This will give you
                  access to all of the platform&apos;s features.
                </li>
                <li>
                  Explore: Browse the platform to find information about
                  upcoming competitions, connect with others who share your
                  major and interests, and explore funding opportunities for
                  your proposals.
                </li>
                <li>
                  Compete: If you&apos;re interested in participating in the
                  Info Competition, simply sign up and start competing.
                  You&apos;ll have the opportunity to showcase your skills and
                  knowledge, and compete against other students in your field.
                </li>
                <li>
                  Connect: With the Find Friends feature, you can connect with
                  others who share your major and interests. Whether you&apos;re
                  looking for study partners, networking opportunities, or
                  simply a place to connect with others, ITBConnect makes it
                  easy to find and connect with like-minded individuals.
                </li>
                <li>
                  Fund: If you have a proposal that you would like to bring to
                  life, ITBConnect&apos;s Proposal Funding feature can help.
                  Simply submit your proposal, and if it meets the criteria, you
                  may be eligible for funding to help make your idea a reality.
                </li>
              </ol>
              <p>
                With ITBConnect, college students have the tools and resources
                they need to succeed. So why wait? Sign up today and start
                exploring the endless possibilities of ITBConnect!
              </p>
            </div>
          </div>
          <div className={`relative`}>
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
