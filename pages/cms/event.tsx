import type { NextPage } from "next";
import Image from "next/image";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useWindowSize } from "../../utils/windowsize";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

const CMSEvent: NextPage = () => {
    const router = useRouter();
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  let data = [[
    "data1", "data1","data1", "data1","data1", "data1"
  ],[
    "data1", "data1","data1", "data1","data1", "data1"
  ],[
    "data1", "data1","data1", "data1","data1", "data1"
  ]]

  const newData = () => {
    router.push({
        pathname: `/cms/crud`, /* this path field is based on your project */
        query: {
            isNew: true,
            isCompetitions: false,
            id: null
        } /* pass state data to app page */,
    });
  }

  const editData = (id: number) => {
    router.push({
        pathname: `/cms/crud`, /* this path field is based on your project */
        query: {
            isNew: true,
            isCompetitions: false,
            id: null
        } /* pass state data to app page */,
    });
  }

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
      <div className="m-12">
        <div className="text-sm font-medium text-center text-gray-500">
            <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                    <a href="/cms/event" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Event</a>
                </li>
                <li className="mr-2">
                    <a href="/cms/competition" className="inline-block p-4 border-b-2 border-transparent rounded-t-lg">Competition</a>
                </li>
            </ul>
        </div>
        
        <div className="relative overflow-x-auto shadow-md mt-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Event Desc
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Organizer Desc
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Data and Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Location
                        </th>
                        <th scope="col" className="px-6 py-3">
                            IG URL
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                        <th scope="col" className="px-6 py-3" onClick={() => newData()}>
                            <div className="m-auto bg-blue-primary p-1 rounded-full w-24 h-8 text-center text-white pt-2">
                                <h1>Add New</h1>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((d, i) => {
                        return(
                            <tr className="bg-white border-b bg-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                    {d[0]}
                                </th>
                                <td className="px-6 py-4">
                                    {d[1]}
                                </td>
                                <td className="px-6 py-4">
                                    {d[2]}
                                </td>
                                <td className="px-6 py-4">
                                    {d[3]}
                                </td>
                                <td className="px-6 py-4">
                                    {d[4]}
                                </td>
                                <td className="px-6 py-4">
                                    {d[5]}
                                </td>
                                <td onClick={() => editData(i)}>
                                    <div className="m-auto bg-white border-2 border-blue-primary p-1.5 rounded-full w-24 text-center text-blue-primary">
                                        Edit
                                    </div>
                                </td>
                                <td>
                                    <div className="m-auto bg-alerts-red-300 p-1.5 rounded-full w-24 text-center text-white">
                                        Delete
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
      </div>

    </div>
  );
};

export default CMSEvent;
