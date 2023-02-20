import type { NextPage } from "next";
import Image from "next/image";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useWindowSize } from "../../utils/windowsize";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

const CMSCrud: NextPage = () => {
  const query = useRouter();
  console.log(query)
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  let data = [[
    "data1", "data1","data1", "data1","data1", "data1","data1"
  ],[
    "data1", "data1","data1", "data1","data1", "data1","data1"
  ],[
    "data1", "data1","data1", "data1","data1", "data1","data1"
  ]]

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
      <div className="m-auto my-12 w-[60%] drop-shadow-2xl p-2">
        <h1 className="text-blue-primary text-6xl font-bold">{query.query.isNew === "true" ? "New" : "Edit"} {query.query.isCompetitions === "true" ? "Competition" : "Event"}</h1>
        <form className="mt-6">
          <div className="mb-6">
            <label className="block mb-2 text-2xl font-bold text-black">Title</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Tulis deskripsi proposal di sini" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-2xl font-bold text-black">Organizer</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Tulis deskripsi proposal di sini" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-2xl font-bold text-black">Date and Time</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Tulis deskripsi proposal di sini" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-2xl font-bold text-black">Details</label>
            <textarea id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Tulis deskripsi proposal di sini" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-2xl font-bold text-black">Tags</label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Tulis deskripsi proposal di sini" required />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-2xl font-bold text-black">Poster</label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div> 
          </div>
          <button type="submit" className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default CMSCrud;
