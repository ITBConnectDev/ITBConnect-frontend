import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import Index1 from "../assets/Index1.svg"
import Index2 from "../assets/Index2.png"
import { useWindowSize } from '../utils/windowsize'
import EventCard from '../components/eventCard';

const ListCompetition: NextPage = () => {
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize()

  useEffect(() => {
    setWindowSize(size.width);
}, [size.width]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
        <div className={`flex justify-between`}>
          <Image
            src={windowSize > 1200 ? Index1 : Index2}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-auto ${windowSize <= 1200 ? "w-[8%]" : "w-[10%]"} relative`}
          />
          <h1 className={`text-center text-8xl text-green-primary font-bold mt-[3%] ${windowSize > 1200 ? "" : "mx-auto"}`}>
          Competitions
          </h1>
          <Image
            src={windowSize > 1200 ? Index1 : Index2}
            alt="Picture of the author"
            className={`bg-no-repeat bg-contain h-auto ${windowSize > 1200 ? "w-[10%]" : "w-[8%]"} relative`}
          />
        </div>
        <p className={`text-center mt-8 text-secondary ${windowSize > 1200 ? "mx-64" : "mx-7"}`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mollis convallis risus, eu porta est sodales ac. In quis diam in sem auctor pharetra. Nunc scelerisque massa quam, eget sollicitudin quam venenatis quis. Etiam at ultricies mauris. Donec vel varius felis. Fusce id sollicitudin urna, in ullamcorper tortor. Nulla gravida orci vitae gravida aliquam. In semper ornare purus, sed viverra dui dictum eu. Sed gravida mi nibh, quis rhoncus enim varius id. Etiam vitae sollicitudin odio. Integer pulvinar nunc consectetur molestie vehicula. Cras dignissim ac erat non ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin mi ligula, pharetra non arcu ac, laoreet viverra turpis. Cras posuere tincidunt volutpat.
        </p>
        <form className={`mt-8 flex flex-row ${windowSize > 1200 ? "mx-56" : "mx-7"}`}>   
          <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" className="block w-full px-4 py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search" required />
          </div>
          <button type="submit" className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-8 py-1 ml-2">Filter</button>
      </form>
    

      <div className={`grid grid-cols-4 gap-2 mt-12 mb-9 ${windowSize > 1200 ? "mx-36" : "mx-7"}`}>
        <div className={`${windowSize > 1200 ? "col-span-1" : "col-span-2 mx-auto"}`}>
          <EventCard link="/" title="Event News" date="DD/MM/YYYY" views="9999" image="pp" />
        </div>
        <div className={`${windowSize > 1200 ? "col-span-1" : "col-span-2 mx-auto"}`}>
          <EventCard link="/" title="Event News" date="DD/MM/YYYY" views="9999" image="pp" />
        </div>
        <div className={`${windowSize > 1200 ? "col-span-1" : "col-span-2 mx-auto"}`}>
          <EventCard link="/" title="Event News" date="DD/MM/YYYY" views="9999" image="pp" />
        </div>
        <div className={`${windowSize > 1200 ? "col-span-1" : "col-span-2 mx-auto"}`}>
          <EventCard link="/" title="Event News" date="DD/MM/YYYY" views="9999" image="pp" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ListCompetition;
