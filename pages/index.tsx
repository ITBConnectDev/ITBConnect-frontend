import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useEffect, useState } from "react";
import Index1 from "../assets/Index1.svg";
import Jumbotron1 from "../assets/Jumbotron1.svg";
import Jumbotron2 from "../assets/Jumbotron2.svg";
import Logo from "../assets/Logo.svg";
import TempImage1 from "../assets/temp_pict_1.svg";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useWindowSize } from "../utils/windowsize";

const Home: NextPage = () => {
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/flowbite@1.5.5/dist/flowbite.min.css"
        />
      </Head>
      <Script src="https://unpkg.com/flowbite@1.5.5/dist/flowbite.js"></Script>
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
              className={`m-auto w-6/12 relative ${
                windowSize > 1200 ? "top-[-25vmin]" : "mt-[10vmin]"
              }`}
            >
              <Image
                src={Logo}
                alt="Picture of the author"
                className="m-auto bg-no-repeat bg-contain h-full"
              />
              <div className="bg-green-200 w-6/12 m-auto mt-6">
                <h1 className="text-center font-bold">Ini contoh</h1>
              </div>
              <h1 className="text-center font-bold mt-6">
                Visioned to remove limitations between groups, encourage and
                amplify collaborations and innovations through out ITB
              </h1>
              <div className="m-auto bg-blue-primary p-1 rounded-full w-24 h-8 text-center text-white mt-6">
                Login
              </div>
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
            <div className="text-5xl font-bold text-white text-center mb-16">
              Feature Present
            </div>
            <div className="p-8 mx-24 bg-green-100 rounded-lg">
              <div className="grid grid-cols-4 gap-4">
                <div
                  className={`${
                    windowSize > 1200 ? "col-span-1" : "col-span-4"
                  }`}
                >
                  <Image
                    src={TempImage1}
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
                  <h1
                    className={`${
                      windowSize > 1200 ? "" : "text-center"
                    } text-blue-primary text-5xl font-bold mb-5`}
                  >
                    Competition Info
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas mollis convallis risus, eu porta est sodales ac. In
                    quis diam in sem auctor pharetra. Nunc scelerisque massa
                    quam, eget sollicitudin quam venenatis quis. Etiam at
                    ultricies mauris. Donec vel varius felis. Fusce id
                    sollicitudin urna, in ullamcorper tortor. Nulla gravida orci
                    vitae gravida aliquam. In semper ornare purus, sed viverra
                    dui dictum eu. Sed gravida mi nibh, quis rhoncus enim varius
                    id. Etiam vitae sollicitudin odio. Integer pulvinar nunc
                    consectetur molestie vehicula. Cras dignissim ac erat non
                    ultrices. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Proin mi ligula,
                    pharetra non arcu ac, laoreet viverra turpis. Cras posuere
                    tincidunt volutpat.
                  </p>
                  <div
                    className={`${
                      windowSize > 1200 ? "" : "mx-auto"
                    } bg-blue-primary p-1 rounded-lg w-max text-center text-white mt-6 py-3 px-12`}
                  >
                    LEARN MORE
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 mx-24 bg-green-100 rounded-lg mt-6">
              <div className="grid grid-cols-4 gap-4">
                <div
                  className={`${
                    windowSize > 1200 ? "col-span-1" : "col-span-4"
                  }`}
                >
                  <Image
                    src={TempImage1}
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
                  <h1
                    className={`${
                      windowSize > 1200 ? "" : "text-center"
                    } text-blue-primary text-5xl font-bold mb-5`}
                  >
                    Cari Teman
                  </h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas mollis convallis risus, eu porta est sodales ac. In
                    quis diam in sem auctor pharetra. Nunc scelerisque massa
                    quam, eget sollicitudin quam venenatis quis. Etiam at
                    ultricies mauris. Donec vel varius felis. Fusce id
                    sollicitudin urna, in ullamcorper tortor. Nulla gravida orci
                    vitae gravida aliquam. In semper ornare purus, sed viverra
                    dui dictum eu. Sed gravida mi nibh, quis rhoncus enim varius
                    id. Etiam vitae sollicitudin odio. Integer pulvinar nunc
                    consectetur molestie vehicula. Cras dignissim ac erat non
                    ultrices. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Proin mi ligula,
                    pharetra non arcu ac, laoreet viverra turpis. Cras posuere
                    tincidunt volutpat.
                  </p>
                  <div
                    className={`${
                      windowSize > 1200 ? "" : "mx-auto"
                    } bg-blue-primary p-1 rounded-lg w-max text-center text-white mt-6 py-3 px-12`}
                  >
                    LEARN MORE
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative pb-16 ${
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
              <h1
                className={`text-center text-5xl text-blue-primary font-bold mt-[3%] ${
                  windowSize > 1200 ? "" : "mx-auto"
                }`}
              >
                How does it work?
              </h1>
              <Image
                src={Index1}
                alt="Picture of the author"
                className={`bg-no-repeat bg-contain h-auto ${
                  windowSize > 1200 ? "w-[10%]" : "hidden"
                } relative`}
              />
            </div>
            <div className="bg-gray-200 text-5xl text-blue-primary font-bold mx-36 px-16 py-12 min-h-[500px] mt-12">
              <h1>
                Explore partners from around ITB, to help you achieve and
                overcome any challenges you face!
              </h1>
            </div>
          </div>
          <div className={`relative`}>
            <Footer />
          </div>
        </div>
      </main>
      {/*       <footer className="w-full">
        <Footer />
      </footer> */}
    </div>
  );
};

export default Home;
