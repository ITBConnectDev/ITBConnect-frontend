/* eslint-disable @next/next/no-img-element */
import request from "@/api/request";
import AdminOrRedirect from "@/components/AdminOrRedirect";
import { ICompetition } from "@/types/competition";
import { IEvent } from "@/types/event";
import classNames from "classnames";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Navbar from "../../components/navbar";

type crudValues = {
  title: string;
  organizer: string;
  datetime: string;
  details: string;
  tags: string;
  poster: FileList;
};

export function getServerSideProps(ctx) {
  return {
    props: ctx.query,
  };
}

async function getDetailComp(id: number) {
  return await request<ICompetition>("/competition/" + id);
}

async function getDetailEvent(id: number) {
  return await request<IEvent>("/news/" + id);
}

const CMSCrud: NextPage = (props: any) => {
  const router = useRouter();
  const isNew = props.isNew === "true";
  const isCompetition = props.isCompetitions === "true";
  const id = parseInt(props.id);
  const { data } = useQuery<IEvent | ICompetition>(
    [isCompetition ? "competition" : "event", id],
    () => (isCompetition ? getDetailComp(id) : getDetailEvent(id)),
    { enabled: !isNew }
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<crudValues>();
  const image = watch("poster")?.item(0);

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
      <AdminOrRedirect>
        <div className="m-auto my-12 w-[60%] drop-shadow-2xl p-2">
          <h1 className="text-blue-primary text-6xl font-bold">
            {isNew ? "New" : "Edit"} {isCompetition ? "Competition" : "Event"}
          </h1>
          <form className="mt-6">
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Title
              </label>
              <input
                {...register("title")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Tulis deskripsi proposal di sini"
                defaultValue={data?.name}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Organizer
              </label>
              <input
                {...register("organizer")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Tulis deskripsi proposal di sini"
                defaultValue={data?.organizer}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Date and Time
              </label>
              <input
                {...register("datetime")}
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Tulis deskripsi proposal di sini"
                defaultValue={
                  data?.date
                    ? new Date(data.date).toISOString().split("T")[0]
                    : ""
                }
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Details
              </label>
              <textarea
                {...register("details")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Tulis deskripsi proposal di sini"
                defaultValue={data?.description}
                required
              />
            </div>
            {isCompetition && (
              <div className="mb-6">
                <label className="block mb-2 text-2xl font-bold text-black">
                  Tags
                </label>
                <input
                  {...register("tags")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Tulis tags di sini (pisahkan dengan koma)"
                  defaultValue={data?.competitionTags
                    ?.map((t) => t.tag)
                    .join(",")}
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Poster
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  className={classNames(
                    "flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white",
                    !image && "h-64"
                  )}
                  role="button"
                >
                  {image ? (
                    <img
                      className=""
                      alt="poster"
                      src={URL.createObjectURL(image)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    {...register("poster")}
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Upload
            </button>
          </form>
        </div>
      </AdminOrRedirect>
    </div>
  );
};

export default CMSCrud;
