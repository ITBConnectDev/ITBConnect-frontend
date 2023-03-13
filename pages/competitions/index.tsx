import request from "@/api/request";
import Index1 from "@/assets/Index1.svg";
import Index2 from "@/assets/Index2.png";
import EventCard from "@/components/eventCard";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Pagination from "@/components/pagination";
import { useWindowSize } from "@/utils/windowsize";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";

const ListCompetition: NextPage = () => {
  const size = useWindowSize();
  const windowSize = size.width;

  const [page, setPage] = useState(1);

  const getDataComps = async (hal) => {
    const data = await request("/competition/?page=" + hal);
    return data;
  };
  // Using the hook
  const { data, error, isLoading } = useQuery({
    queryKey: ["competitions", page],
    queryFn: () => getDataComps(page),
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
          className={`text-center text-2xl md:text-8xl text-green-primary font-bold mt-[3%] lg:mx-0 mx-auto font-rubik`}
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
        With its Info Competition feature, students have the opportunity to
        showcase their skills and knowledge, competing against each other in a
        friendly and supportive environment.
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
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

      <div
        className={`grid grid-cols-2 md:grid-cols-4 gap-2 mt-12 mb-9 lg:mx-36 mx-7`}
      >
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

      {data && (
        <Pagination
          page={page}
          pageTotal={data.pageTotal}
          setPage={setPage}
          className="mb-8"
        />
      )}
      <Footer />
    </div>
  );
};

export default ListCompetition;
