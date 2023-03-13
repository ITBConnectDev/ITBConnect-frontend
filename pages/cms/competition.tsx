import { deleteCompetition } from "@/api/CMSClient";
import request from "@/api/request";
import AdminOrRedirect from "@/components/AdminOrRedirect";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Navbar from "../../components/navbar";
import { useWindowSize } from "../../utils/windowsize";

const CMSCompetition: NextPage = () => {
  const router = useRouter();
  const [windowSize, setWindowSize] = useState(0);
  const size = useWindowSize();
  const [page, setPage] = useState(1);
  const getDataNews = async (hal) => {
    const data = await request("/competition/?page=" + hal);
    return data;
  };

  // Using the hook
  const { data, error, refetch } = useQuery({
    queryKey: ["competitions", page],
    queryFn: () => getDataNews(page),
    keepPreviousData: true,
  });

  useEffect(() => {
    setWindowSize(size.width);
  }, [size.width]);

  const newData = () => {
    router.push({
      pathname: `/cms/crud` /* this path field is based on your project */,
      query: {
        isNew: true,
        isCompetitions: true,
        id: null,
      } /* pass state data to app page */,
    });
  };

  const editData = (id: number) => {
    router.push({
      pathname: `/cms/crud` /* this path field is based on your project */,
      query: {
        isNew: false,
        isCompetitions: true,
        id: id,
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
                  className="inline-block p-4 border-b-2 border-transparent rounded-t-lg"
                >
                  Event
                </Link>
              </li>
              <li className="mr-2">
                <Link
                  href="/cms/competition"
                  className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                  aria-current="page"
                >
                  Competition
                </Link>
              </li>
            </ul>
          </div>

          <div className="relative overflow-x-auto shadow-md mt-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-hidden">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Event Desc
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Organizer Desc
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date and Time
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
                  data.competitions.map((c, i) => {
                    return (
                      <tr key={c.id} className="border-b bg-gray-200">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap"
                        >
                          {c.name}
                        </th>
                        <td className="px-6 py-4">
                          {c.competitionTags.map((t) => t.tag).join(", ")}
                        </td>
                        <td className="px-6 py-4">{c.description}</td>
                        <td className="px-6 py-4">{c.organizer}</td>
                        <td className="px-6 py-4">
                          {new Date(c.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">{c.location}</td>
                        <td className="px-6 py-4">{c.instagramURL}</td>
                        <td onClick={() => editData(c.id)} role="button">
                          <div className="m-auto bg-white border-2 border-blue-primary p-1.5 rounded-full w-24 text-center text-blue-primary">
                            Edit
                          </div>
                        </td>
                        <td
                          role="button"
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure want to delete this competition?"
                              )
                            ) {
                              deleteCompetition(c.id).then(() => {
                                refetch();
                                alert("Competition deleted");
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
          </div>
        </div>
      </AdminOrRedirect>
    </div>
  );
};

export default CMSCompetition;
