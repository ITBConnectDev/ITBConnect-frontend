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
            className={`text-center text-8xl text-green-primary font-bold my-auto ${
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
                <div className="w-[40%] mr-8 ml-24">
                    <h1 className="text-5xl font-bold text-blue-primary lg:mb-8">Manifesto</h1>
                    <p className="text-base text-secondary font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis convallis risus, eu porta est sodales ac. In quis diam in sem auctor pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id sollicitudin urna, in ullamcorper tortor. Nulla gravida orci vitae gravida aliquam. In semper ornare purus, sed viverra dui dictum eu. Sed gravida mi nibh, quis rhoncus enim varius id. Etiam vitae sollicitudin odio. Integer pulvinar nunc consectetur molestie vehicula. Cras dignissim ac erat non ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin mi ligula, pharetra non arcu ac, laoreet viverra turpis. Cras posuere tincidunt volutpat.</p>
                </div>
                <Image
                src={sampleAboutUs1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto mr-12 ${
                    windowSize > 1200 ? "w-[50%]" : ""
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
                    windowSize > 1200 ? "w-[50%]" : ""
                } relative`}
                />
                <div className="w-[40%] ml-12 mr-24">
                    <h1 className="text-5xl font-bold text-blue-primary mb-8">Mind Map</h1>
                    <p className="text-base text-secondary font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis convallis risus, eu porta est sodales ac. In quis diam in sem auctor pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id sollicitudin urna, in ullamcorper tortor. Nulla gravida orci vitae gravida aliquam. In semper ornare purus, sed viverra dui dictum eu. Sed gravida mi nibh, quis rhoncus enim varius id. Etiam vitae sollicitudin odio. Integer pulvinar nunc consectetur molestie vehicula. Cras dignissim ac erat non ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin mi ligula, pharetra non arcu ac, laoreet viverra turpis. Cras posuere tincidunt volutpat.</p>
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
                <p className="text-base text-secondary font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis convallis risus, eu porta est sodales ac. In quis diam in sem auctor pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id sollicitudin urna, in ullamcorper tortor. Nulla gravida orci vitae gravida aliquam. In semper ornare purus, sed viverra dui dictum eu. Sed gravida mi nibh, quis rhoncus enim varius id. Etiam vitae sollicitudin odio. Integer pulvinar nunc consectetur molestie vehicula. Cras dignissim ac erat non ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin mi ligula, pharetra non arcu ac, laoreet viverra turpis. Cras posuere tincidunt volutpat.</p>
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
                <p className="text-base text-secondary font-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis convallis risus, eu porta est sodales ac. In quis diam in sem auctor pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id sollicitudin urna, in ullamcorper tortor. Nulla gravida orci vitae gravida aliquam. In semper ornare purus, sed viverra dui dictum eu. Sed gravida mi nibh, quis rhoncus enim varius id. Etiam vitae sollicitudin odio. Integer pulvinar nunc consectetur molestie vehicula. Cras dignissim ac erat non ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin mi ligula, pharetra non arcu ac, laoreet viverra turpis. Cras posuere tincidunt volutpat.</p>
            </div>
        </div>}
        {windowSize > 1200 ? 
        <div className="flex flex-row mx-32 my-12">
            <div className="mr-32">
                <h1 className="text-blue-primary text-3xl font-bold">About Us</h1>
                <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis convallis risus, eu porta est sodales ac. In quis diam in sem auctor pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id sollicitudin urna, in ullamcorper tortor.</p>
                <div className="flex flex-row bg-blue-primary p-2 text-center w-[30%] mt-4 items-center justify-center rounded">
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
            <h1 className="text-blue-primary text-3xl font-bold">About Us</h1>
            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis convallis risus, eu porta est sodales ac. In quis diam in sem auctor pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id sollicitudin urna, in ullamcorper tortor.</p>
            <div className="flex flex-row items-center justify-between mt-4">
                <div className="flex flex-row bg-blue-primary p-2 text-center w-[30%] mt-4 items-center justify-center rounded">
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
