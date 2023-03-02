import request from "@/api/request";
import Carousel1 from "@/assets/Carousel1.svg";
import Index1 from "@/assets/Index1.svg";
import Index2 from "@/assets/Index2.png";
import EventCard from "@/components/eventCard";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useWindowSize } from "@/utils/windowsize";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ListNews: NextPage = () => {
  const size = useWindowSize();
  const windowSize = size.width;
  const [page, setPage] = useState(1);

  const getDataNews = async (hal) => {
    const data = await request("/news/?page=" + hal);
    return data;
  };
  // Using the hook
  const { data, error, isLoading } = useQuery({
    queryKey: ["news", page],
    queryFn: () => getDataNews(page),
    keepPreviousData: true,
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Carousel showArrows={true} showIndicators={true} className="m-0">
        <div>
          <Image
            src={Carousel1}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-auto lg:w-[10%] w-[8%] relative`}
          />
        </div>
        <div>
          <Image
            src={Carousel1}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-auto lg:w-[10%] w-[8%] relative`}
          />
        </div>
      </Carousel>
      <div className={`flex justify-between`}>
        <Image
          src={windowSize > 1200 ? Index1 : Index2}
          alt="Picture of the author"
          className={`bg-no-repeat bg-contain h-auto lg:w-[10%] w-[8%] relative`}
        />
        <h1
          className={`text-center lg:text-8xl text-2xl text-green-primary font-bold mt-[3%] lg:mx-0 mx-auto`}
        >
          Event News
        </h1>
        <Image
          src={windowSize > 1200 ? Index1 : Index2}
          alt="Picture of the author"
          className={`bg-no-repeat bg-contain h-auto lg:w-[10%] w-[8%] relative`}
        />
      </div>
      <form className={`mt-8 flex flex-row lg:mx-56 mx-7`}>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-3 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
        <button
          type="submit"
          className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-1 ml-2"
        >
          Filter
        </button>
      </form>

      <div className={`grid grid-cols-4 gap-2 mt-12 mb-9 lg:mx-36 mx-7`}>
        {data &&
          data.news.map((d, i) => {
            return (
              <div
                key={i}
                className={`lg:col-span-1 lg:mx-0 col-span-2 mx-auto`}
              >
                <EventCard
                  link={"/events/" + d.id}
                  title={d.name}
                  date={d.date.slice(0, 10)}
                  views="9999"
                  image={d.photoURLs[0].url}
                />
              </div>
            );
          })}
      </div>

      <nav aria-label="Page navigation example" className="m-auto mb-8">
        <ul className="inline-flex items-center -space-x-px">
          <li onClick={() => setPage(Math.max(page - 1, 0))}>
            <a
              href="#"
              className="block px-3 py-2 ml-0 leading-tight rounded-l-lg bg-white text-green-500 hover:bg-green-500 hover:text-white"
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
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
          {data &&
            Array.from(Array(data.pageTotal), (e, i) => {
              return (
                <li key={i}>
                  <a
                    href="#"
                    className={`px-3 py-2 leading-tight hover:bg-green-500 hover:text-white rounded ${i + 1 === page ? "bg-green-500 text-white" : "bg-white text-green-500"}`}
                  >
                    {i + 1}
                  </a>
                </li>
              );
            })}
          <li onClick={() => setPage(Math.min(page + 1, data.pageTotal))}>
            <a className="block px-3 py-2 leading-tight rounded-r-lg bg-white text-green-500 hover:bg-green-500 hover:text-white">
              <span className="sr-only">Next</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <Footer />
    </div>
  );
};

export default ListNews;
