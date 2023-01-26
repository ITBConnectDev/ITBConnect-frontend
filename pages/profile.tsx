import type { NextPage } from "next";
import Image from "next/image";
import EditIcon from "../assets/EditIcon.svg";
import AddIcon from "../assets/AddIcon.svg";
import EditTextIcon from "../assets/EditTextIcon.svg";
import SampleProfile from "../assets/SampleProfile.svg";
import InstagramBlack from "../assets/InstagramBlack.svg";
import LinkedinBlack from "../assets/LinkedinBlack.svg";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { useWindowSize } from "../utils/windowsize";
import { useState, useEffect } from "react";

const Profile: NextPage = () => {
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
        <div className="bg-white rounded-lg drop-shadow-2xl my-16 p-8 w-[80%] border-2 m-auto">
            <h1 className="text-blue-primary text-6xl mb-5 font-bold text-center md:text-left">Detail Profile</h1>
            <div className={`flex flex-row ${
            windowSize <= 1200 ? "flex-wrap" : ""
          }`}>
                <div className={`relative h-fit ${
            windowSize <= 1200 ? "mx-auto w-[30%] mb-[30%]" : "w-[20%]"
          }`}>
                    <Image
                        src={SampleProfile}
                        alt="Picture of the author"
                        className="absolute bg-no-repeat bg-contain bg-left h-100 w-[87%]"
                    />
                    <Image
                        src={EditIcon}
                        alt="Picture of the author"
                        className="absolute bg-no-repeat bg-contain bg-left h-100 w-[15%] m-[37%]"
                    />
                </div>
                <div className="w-[100%] md:w-[80%]">
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                            <label className="block text-black text-sm font-bold mb-2">
                                Nama
                            </label>
                            <input
                                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                            />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block text-black text-sm font-bold mb-2">
                                Nama Panggilan
                            </label>
                            <input
                                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                            <label className="block text-black text-sm font-bold mb-2">
                                Jurusan
                            </label>
                            <input
                                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                            />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                            <label className="block text-black text-sm font-bold mb-2">
                                NIM
                            </label>
                            <input
                                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-1 md:mb-0">
                            <label className="block text-black text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block text-black text-sm font-bold mb-2">
                                Nomor HP
                            </label>
                            <input
                                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%]">
                <label className="block text-black text-sm font-bold mb-2">
                    Bio
                </label>
                <textarea
                    className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                    readOnly
                />
            </div>
            <div className="flex flex-row justify-between mt-4">
                <div className="flex flex-row">
                    <Image
                        src={LinkedinBlack}
                        alt="Picture of the author"
                        className="bg-no-repeat bg-contain bg-left h-100 w-fit"
                    />
                    <div className="w-full md:w-1/2 px-3">
                        <input
                            className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            readOnly
                        />
                    </div>
                    <Image
                        src={InstagramBlack}
                        alt="Picture of the author"
                        className="bg-no-repeat bg-contain bg-left h-100 w-fit"
                    />
                    <div className="w-full md:w-1/2 px-3">
                        <input
                            className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            readOnly
                        />
                    </div>
                </div>
                <div className="py-2 px-2 bg-white border-2 rounded-lg border-secondary">
                    Ubah
                </div>
            </div>
        </div>
        <div className="mx-auto">
            <div className="flex flex-row flex-wrap justify-center content-center">
                <div className={`bg-white rounded-lg drop-shadow-2xl p-8 h-fit border-2 ${
            windowSize <= 1200 ? "mx-auto w-[80%] mb-5" : "w-[38%]"
          }`}>
                    <div className="flex flex-row justify-between mb-5">
                        <h1 className="text-green-primary text-3xl">Achievement</h1>
                        <Image
                            src={AddIcon}
                            alt="Picture of the author"
                            className="bg-no-repeat bg-contain bg-left h-100 w-[10%] md:w-[5%]"
                        />
                    </div>
                    {/* TODO: Integrate with Backend */}
                    <div>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-xl">Juara 1 Data Science Competition Arkavidia 8.0</h1>
                            <Image
                                src={EditTextIcon}
                                alt="Picture of the author"
                                className="bg-no-repeat bg-contain bg-left h-100 w-[15%] md:w-[5%]"
                            />
                        </div>
                        <p className="text-gray-500 my-1">Issued by HMIF Institut Teknologi Bandung . Mar 2023</p>
                        <p className="text-gray-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, egestas sapien nunc, quis viverra nisl vitae risus, lectus. Est ornare hac scelerisque tempor. A, quam in faucibus bibendum. Cursus dictumst etiam quis molestie.</p>
                        <hr />
                    </div>
                        {/* TODO: Integrate pagination with Backend */}
{/*                     <nav aria-label="Page navigation example" className="m-auto mb-8">
                        <ul className="inline-flex items-center -space-x-px">
                            <li onClick={() => setPage(Math.max(page - 1,0))}>
                                <a href="#" className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span className="sr-only">Previous</span>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                </a>
                            </li>
                        {data && Array.from(Array(data.data.pageTotal), (e, i) => {
                            return(
                            <li key={i} onClick={() => setPage(Math.max(i+1,0))}>
                            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{i + 1}</a>
                            </li>
                            )
                        })}
                        <li onClick={() => setPage(Math.min(page + 1,data.data.pageTotal))}>
                            <a className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <span className="sr-only">Next</span>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            </a>
                        </li>
                        </ul>
                    </nav> */}
                </div>
                <div className={`h-fit ${
            windowSize <= 1200 ? "mx-auto w-[80%]" : "ml-11 w-[40%]"
          }`}>
                    <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
                        <div className="flex flex-row justify-between mb-5">
                            <h1 className="text-green-primary text-3xl">Skills / Interest</h1>
                            <div className="flex flex-row mr-4">
                                 <Image
                                    src={AddIcon}
                                    alt="Picture of the author"
                                    className="bg-no-repeat bg-contain bg-left h-100 w-[60%]"
                                />
                                <Image
                                    src={EditTextIcon}
                                    alt="Picture of the author"
                                    className="bg-no-repeat bg-contain bg-left h-100 w-[60%] ml-4"
                                />
                            </div>
                        </div>
                        {/* TODO: Integrate skills with Backend */}
                        <div className="flex flex-row flex-wrap">
                            <h1 className="w-[50%] mb-2">
                                Data scientist
                            </h1>
                            <h1 className="w-[50%]">
                                UI UX
                            </h1>
                            <h1 className="w-[50%]">
                                Web
                            </h1>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
                        <div className="flex flex-row justify-between mb-5">
                            <h1 className="text-green-primary text-3xl">Fluent In</h1>
                            <div className="flex flex-row mr-4">
                                 <Image
                                    src={AddIcon}
                                    alt="Picture of the author"
                                    className="bg-no-repeat bg-contain bg-left h-100 w-[60%]"
                                />
                                <Image
                                    src={EditTextIcon}
                                    alt="Picture of the author"
                                    className="bg-no-repeat bg-contain bg-left h-100 w-[60%] ml-4"
                                />
                            </div>
                        </div>
                        {/* TODO: Integrate language with Backend */}
                        <div className="flex flex-row flex-wrap">
                            <h1 className="w-[100%] mb-2">
                                Bahasa Indonesia
                            </h1>
                            <h1 className="w-[100%]">
                                English
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      <Footer />
    </div>
  );
};

export default Profile;
