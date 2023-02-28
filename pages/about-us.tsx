import type { NextPage } from "next";
import Image from "next/image";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import sampleAboutUs1 from "../assets/sampleAboutUs1.svg";
import Index3 from "../assets/Index3.svg";
import Index4 from "../assets/Index4.svg";
import Index1 from "../assets/Index1.svg";
import AboutUs1 from "../assets/AboutUs1.svg"
import Whatsapp from "../assets/Whatsapp.svg"
import PeopleBehind1 from "../assets/people-behind-1.svg";
import PeopleBehind2 from "../assets/people-behind-2.svg";
import { useWindowSize } from "../utils/windowsize";
import { useState, useEffect } from "react";

const AboutUs: NextPage = () => {
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
        <div className={`flex justify-between`}>
            <Image
            src={Index1}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-auto ${
                windowSize > 1200 ? "w-[10%]" : "w-[10vmin]"
            } relative`}
            />
            <h1
            className={`text-center text-2xl md:text-8xl text-green-primary font-bold my-auto ${
                windowSize > 1200 ? "text-8xl" : "mx-auto text-5xl"
            }`}
            >
            About Us
            </h1>
            <Image
            src={Index1}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-auto ${
                windowSize > 1200 ? "w-[10%]" : "w-[10vmin]"
            } relative`}
            />
        </div>
        {windowSize > 1200 ? 
        <div className="max-w-full">
            <div className="flex flex-row mt-8 mx-auto">
                <div className="w-[50%] mr-8 ml-24">
                    <h1 className="text-5xl font-bold text-blue-primary lg:mb-8">Manifesto</h1>
                    <p className="text-base text-secondary font-normal">In a world of endless possibilities and endless challenges, college students embarked on a quest to shape their future. They journeyed through the treacherous landscape of higher education, armed only with their passion and their determination. Along the way, they encountered many obstacles. They struggled to find the resources they needed, to connect with others who shared their interests, and to bring their ideas to life. But they refused to be defeated. And then, a glimmer of hope appeared on the horizon. ITBConnect, a powerful and revolutionary platform, arose to empower the next generation of innovators. With its Info Competition feature, students could showcase their skills and knowledge, competing with each other in a fierce yet friendly battle. And with Explore Friends, students could connect with others who shared their major and interests, forming a community of like-minded individuals who would support and inspire each other. But ITBConnect was not just a tool for connection; it was also a weapon of change. With its proposal funding feature, students could secure the resources they needed to bring their ideas to life, igniting a fire of progress and innovation that would burn bright for generations to come. This was no mere platform; this was an epic adventure, a quest to shape the future and empower the next generation. Join us on ITBConnect, and become a hero in this tale of progress and triumph.</p>
                </div>
                <Image
                src={sampleAboutUs1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto mr-12 ${
                    windowSize > 1200 ? "w-[40%]" : ""
                } relative`}
                />
                <Image
                src={Index3}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain ${
                    windowSize > 1200 ? "w-[7%]" : ""
                } relative`}
                />
            </div>
            <div className="flex flex-row mt-24 mx-auto">
                <Image
                src={Index3}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain mr-12 ${
                    windowSize > 1200 ? "w-[7%]" : ""
                } relative`}
                />
                <Image
                src={sampleAboutUs1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto ${
                    windowSize > 1200 ? "w-[40%]" : ""
                } relative`}
                />
                <div className="w-[50%] ml-12 mr-24">
                    <h1 className="text-5xl font-bold text-blue-primary mb-8">Mind Map</h1>
                    <p className="text-base text-secondary font-normal">The mind map for ITBConnect would have a central idea or theme that encompasses all three features of the platform (Info Competition, Explore Friends, and Proposal Funding). From this central idea, branches would radiate out, each branch representing one of the three features.
Info Competition: This branch would explore the benefits of the competition feature, how it works, and how it benefits students. It could also highlight success stories or past competitions.
Explore Friends: This branch would discuss the importance of connecting with others who share your major and interests, how the Explore Friends feature makes this possible, and the benefits of forming these connections.
Proposal Funding: This branch would delve into the proposal funding feature, explaining how it works and how it provides students with the resources they need to bring their ideas to life. It could also highlight successful proposals that have received funding in the past.
The branches could also contain sub-branches or subtopics that further elaborate on each feature and their benefits. The overall goal of the mind map would be to provide a comprehensive and clear picture of what ITBConnect is and what it offers to students.</p>
                </div>
            </div>
        </div> 
        : 
        <div>
            <div className="m-8">
                <div className="flex justify-between">
                    <h1 className="text-5xl font-bold text-blue-primary">Manifesto</h1>
                    <Image
                        src={Index4}
                        alt="Picture of the author"
                        className={`bg-no-repeat bg-contain w-[15%] relative`}
                    />
                </div>
                <Image
                src={sampleAboutUs1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto w-[100%] relative my-2`}
                />
                <p className="text-base text-secondary font-normal">In a world of endless possibilities and endless challenges, college students embarked on a quest to shape their future. They journeyed through the treacherous landscape of higher education, armed only with their passion and their determination. Along the way, they encountered many obstacles. They struggled to find the resources they needed, to connect with others who shared their interests, and to bring their ideas to life. But they refused to be defeated. And then, a glimmer of hope appeared on the horizon. ITBConnect, a powerful and revolutionary platform, arose to empower the next generation of innovators. With its Info Competition feature, students could showcase their skills and knowledge, competing with each other in a fierce yet friendly battle. And with Explore Friends, students could connect with others who shared their major and interests, forming a community of like-minded individuals who would support and inspire each other. But ITBConnect was not just a tool for connection; it was also a weapon of change. With its proposal funding feature, students could secure the resources they needed to bring their ideas to life, igniting a fire of progress and innovation that would burn bright for generations to come. This was no mere platform; this was an epic adventure, a quest to shape the future and empower the next generation. Join us on ITBConnect, and become a hero in this tale of progress and triumph.</p>
            </div>
            <div className="m-8">
                <div className="flex justify-between">
                    <h1 className="text-5xl font-bold text-blue-primary">Mind Map</h1>
                    <Image
                        src={Index4}
                        alt="Picture of the author"
                        className={`bg-no-repeat bg-contain w-[15%] relative`}
                    />
                </div>
                <Image
                src={sampleAboutUs1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto w-[100%] relative my-2`}
                />
                <p className="text-base text-secondary font-normal">The mind map for ITBConnect would have a central idea or theme that encompasses all three features of the platform (Info Competition, Explore Friends, and Proposal Funding). From this central idea, branches would radiate out, each branch representing one of the three features.
Info Competition: This branch would explore the benefits of the competition feature, how it works, and how it benefits students. It could also highlight success stories or past competitions.
Explore Friends: This branch would discuss the importance of connecting with others who share your major and interests, how the Explore Friends feature makes this possible, and the benefits of forming these connections.
Proposal Funding: This branch would delve into the proposal funding feature, explaining how it works and how it provides students with the resources they need to bring their ideas to life. It could also highlight successful proposals that have received funding in the past.
The branches could also contain sub-branches or subtopics that further elaborate on each feature and their benefits. The overall goal of the mind map would be to provide a comprehensive and clear picture of what ITBConnect is and what it offers to students.</p>
            </div>
        </div>}
        <h1
        className={`text-center text-8xl text-green-primary font-bold my-auto mt-8 ${
            windowSize > 1200 ? "text-8xl" : "mx-auto text-5xl"
        }`}
        >
        People Behind
        </h1>
        <div className="flex flex-col md:flex-row mx-auto mt-12">
            <Image
            src={PeopleBehind1}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-[48vmin] w-[auto] relative my-2`}
            />
            <Image
            src={PeopleBehind2}
            alt="Picture of the author"
            className={`bg-no-repeat ml-0 md:ml-8 bg-contain h-[48vmin] w-[auto] relative my-2`}
            />
        </div>
        {windowSize > 1200 ? 
        <div className="flex flex-row mx-32 my-12 justify-between">
            <div className="mr-32">
                <h1 className="text-blue-primary text-3xl font-bold">Contact Us</h1>
                <p className="mt-4">ITB Connect</p>
                <div className="flex flex-row bg-blue-primary p-2 text-center w-[100%] mt-4 justify-between rounded">
                    <Image
                    src={Whatsapp}
                    alt="Picture of the author"
                    className={`bg-no-repeat bg-contain h-auto w-[10%] relative`}
                    />
                    <p className="text-white ml-2">081081081081</p>
                </div>
            </div>
            <Image
            src={AboutUs1}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-[18vmin] w-[auto] relative my-2`}
            />
        </div>
         :
        <div className="m-8">
            <h1 className="text-blue-primary text-3xl font-bold">Contact Us</h1>
            <p className="mt-4">ITB Connect</p>
            <div className="flex flex-row justify-between mt-4">
                <div className="flex flex-row bg-blue-primary p-2 text-center w-[47%] mt-4 items-center justify-center rounded">
                    <Image
                    src={Whatsapp}
                    alt="Picture of the author"
                    className={`bg-no-repeat bg-contain h-auto w-[10%] relative`}
                    />
                    <p className="text-white ml-2">081081081081</p>
                </div>
                <Image
                src={AboutUs1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-[14vmin] w-[auto] relative my-2`}
                />
            </div>
        </div>}
      <Footer />
    </div>
  );
};

export default AboutUs;
