import { deleteEvent } from "@/api/CMSClient";
import request from "@/api/request";
import AdminOrRedirect from "@/components/AdminOrRedirect";
import Pagination from "@/components/pagination";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../../components/navbar";

const CMSEvent: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const getDataNews = async (hal) => {
    const data = await request("/news/?page=" + hal);
    return data;
  };

  const { data, error, refetch } = useQuery({
    queryKey: ["competitions", page],
    queryFn: () => getDataNews(page),
    keepPreviousData: true,
  });

  const newData = () => {
    router.push({
      pathname: `/cms/crud` /* this path field is based on your project */,
      query: {
        isNew: true,
        isCompetitions: false,
        id: null,
      } /* pass state data to app page */,
    });
  };

  const editData = (id: number) => {
    router.push({
      pathname: `/cms/crud` /* this path field is based on your project */,
      query: {
        isNew: false,
        isCompetitions: false,
        id,
      } /* pass state data to app page */,
    });
  };

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
      <AdminOrRedirect>
        <div className="m-12">
          <div className="text-sm font-medium text-center text-gray-500">
            <ul className="flex flex-wrap -mb-px">
              <li className="mr-2">
                <Link
                  href="/cms/event"
                  className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  aria-current="page"
                >
                  Event
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href="/cms/competition"
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg"
                >
                  Competition
                </Link>
              </li>
            </ul>
          </div>

          <div className="relative overflow-x-auto shadow-md mt-4">
            {data && (
              <Pagination
                page={page}
                pageTotal={data.pageTotal}
                setPage={setPage}
              />
            )}
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
                  <th scope="col" className="px-6 py-3"></th>
                  <th
                    scope="col"
                    className="px-6 py-3"
                    onClick={() => newData()}
                    role="button"
                  >
                    <div className="m-auto bg-blue-primary p-1 rounded-full w-24 h-8 text-center text-white pt-2">
                      Add New
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.news.map((d, i) => {
                    return (
                      <tr key={i} className="border-b bg-gray-200">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {d.name}
                        </th>
                        <td className="px-6 py-4">{d.description}</td>
                        <td className="px-6 py-4">{d.organizer}</td>
                        <td className="px-6 py-4">
                          {" "}
                          {new Date(d.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{d.location}</td>
                        <td className="px-6 py-4">{d.url}</td>
                        <td onClick={() => editData(d.id)} role="button">
                          <div className="m-auto bg-white border-2 border-blue-primary p-1.5 rounded-full w-24 text-center text-blue-primary">
                            Edit
                          </div>
                        </td>
                        <td
                          role="button"
                          onClick={() => {
                            if (
                              confirm("Are you sure want to delete this event?")
                            ) {
                              deleteEvent(d.id).then(() => {
                                refetch();
                                alert("Event deleted");
                              });
                            }
                          }}
                        >
                          <div className="m-auto bg-alerts-red-300 p-1.5 rounded-full w-24 text-center text-white">
                            Delete
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {data && (
              <Pagination
                page={page}
                pageTotal={data.pageTotal}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </AdminOrRedirect>
    </div>
  );
};

export default CMSEvent;
