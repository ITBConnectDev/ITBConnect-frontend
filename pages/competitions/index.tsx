import request from "@/api/request";
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

const ListCompetition: NextPage = () => {
  const size = useWindowSize();
  const windowSize = size.width;

  const [page, setPage] = useState(1);

  const getDataNews = async (hal) => {
    const data = await request("/competition/?page=" + hal);
    return data;
  };
  // Using the hook
  const { data, error, isLoading } = useQuery({
    queryKey: ["competitions", page],
    queryFn: () => getDataNews(page),
    keepPreviousData: true,
  });

  if (data) {
    console.log(data);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className={`flex justify-between`}>
        <Image
          src={windowSize > 1200 ? Index1 : Index2}
          alt="Picture of the author"
          className={`bg-no-repeat bg-contain h-auto "lg:w-[8%] w-[10%]" relative`}
        />
        <h1
          className={`text-center text-8xl text-green-primary font-bold mt-[3%] lg:mx-0 mx-auto font-rubik`}
        >
          Competitions
        </h1>
        <Image
          src={windowSize > 1200 ? Index1 : Index2}
          alt="Picture of the author"
          className={`bg-no-repeat bg-contain h-auto lg:w-[10%] w-[8%] relative`}
        />
      </div>
      <p className={`text-center mt-8 text-secondary lg:mx-64 mx-7`}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis
        convallis risus, eu porta est sodales ac. In quis diam in sem auctor
        pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis
        quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id
        sollicitudin urna, in ullamcorper tortor. Nulla gravida orci vitae
        gravida aliquam. In semper ornare purus, sed viverra dui dictum eu. Sed
        gravida mi nibh, quis rhoncus enim varius id. Etiam vitae sollicitudin
        odio. Integer pulvinar nunc consectetur molestie vehicula. Cras
        dignissim ac erat non ultrices. Orci varius natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Proin mi ligula, pharetra
        non arcu ac, laoreet viverra turpis. Cras posuere tincidunt volutpat.
      </p>
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
          data.competitions.map((d, i) => {
            return (
              <div
                key={i}
                className={`lg:col-span-1 lg:mx-0 col-span-2 mx-auto`}
              >
                <EventCard
                  link={"/competitions/" + d.id}
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
            <a className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
                <li key={i} onClick={() => setPage(Math.max(i + 1, 0))}>
                  <a className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {i + 1}
                  </a>
                </li>
              );
            })}
          <li onClick={() => setPage(Math.min(page + 1, data.pageTotal))}>
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

export default ListCompetition;
