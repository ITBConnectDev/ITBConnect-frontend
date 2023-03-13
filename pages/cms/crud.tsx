/* eslint-disable @next/next/no-img-element */
import { addCompetition, editCompetition } from "@/api/CMSClient";
import { uploadPhoto } from "@/api/ProfileClient";
import request from "@/api/request";
import AdminOrRedirect from "@/components/AdminOrRedirect";
import { ICompetition } from "@/types/competition";
import { IEvent } from "@/types/event";
import classNames from "classnames";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import Navbar from "../../components/navbar";

type crudValues = {
  name: string;
  organizer: string;
  organizerDescription: string;
  date: string;
  location: string;
  description: string;
  instagramURL: string;
  url: string;
  tags: string;
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
    { enabled: !isNew, staleTime: Infinity }
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      setPhoto(acceptedFiles[0]);
    }, []),
  });

  const uploadMutation = useMutation(uploadPhoto);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<crudValues>();

  useEffect(() => {
    setValue("name", data?.name ?? "");
    setValue("organizer", data?.organizer ?? "");
    setValue("organizerDescription", data?.organizerDescription ?? "");
    setValue(
      "date",
      data?.date ? new Date(data.date).toISOString().slice(0, 16) : ""
    );
    setValue("location", data?.location ?? "");
    setValue("description", data?.description ?? "");
    setValue("instagramURL", data?.instagramURL ?? "");
    setValue("url", data?.url ?? "");
    setValue("tags", data?.competitionTags?.map((t) => t.tag).join(",") ?? "");
  }, [data, setValue]);

  const onSubmit: SubmitHandler<crudValues> = async (v) => {
    if (uploadMutation.isLoading) {
      alert("Please wait for the upload to finish");
      return;
    }
    const toUpload = photo;
    if (isNew && !toUpload) {
      alert("Poster is required");
      return;
    }
    let imageUrl = data?.photoURLs[0]?.url ?? "";
    if (toUpload) {
      try {
        const res = await uploadMutation.mutateAsync([toUpload]);
        imageUrl = res[0];
      } catch (err) {
        alert("Failed to upload poster");
        return;
      }
    }
    if (isCompetition) {
      const body = {
        ...v,
        poster: undefined,
        photoURLs: [{ photoURL: imageUrl }],
        url: v.url,
        tags: v.tags.split(",").map((t) => ({ tag: t })),
      };
      if (isNew) {
        await addCompetition(body)
          .then(() => {
            alert("Competition added");
            router.push("/cms/competition");
          })
          .catch(() => {
            alert("Failed to add competition");
          });
      } else {
        await editCompetition(id, body)
          .then(() => {
            alert("Competition edited");
            router.push("/cms/competition");
          })
          .catch(() => {
            alert("Failed to edit competition");
          });
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col max-w-full">
      <Navbar />
      <AdminOrRedirect>
        <div className="m-auto my-12 w-[60%] drop-shadow-2xl p-2">
          <h1 className="text-blue-primary text-6xl font-bold">
            {isNew ? "New" : "Edit"} {isCompetition ? "Competition" : "Event"}
          </h1>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Title
              </label>
              <input
                {...register("name", { required: "Title is required" })}
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Title"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Organizer
              </label>
              <input
                {...register("organizer", {
                  required: "Organizer is required",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Organizer"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Organizer Description
              </label>
              <textarea
                {...register("organizerDescription")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Organizer description"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Date and Time
              </label>
              <input
                {...register("date", {
                  required: "Date and time is required",
                })}
                type="datetime-local"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Location
              </label>
              <input
                {...register("location", {
                  required: "Location is required",
                })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Location"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Details
              </label>
              <textarea
                {...register("description")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Details"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Instagram URL
              </label>
              <input
                {...register("instagramURL", {
                  required: "Instagram URL is required",
                })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Instagram URL"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                URL
              </label>
              <input
                {...register("url", {
                  required: "URL is required",
                })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="URL"
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
                  required
                />
              </div>
            )}
            <div className="mb-6">
              <label className="block mb-2 text-2xl font-bold text-black">
                Poster
              </label>
              <div
                className={classNames(
                  "flex items-center justify-center w-full",
                  isDragActive && "opacity-50"
                )}
                {...getRootProps()}
              >
                <label
                  className={classNames(
                    "flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-white",
                    !photo && !data?.photoURLs[0] && "h-64"
                  )}
                  role="button"
                >
                  {photo || data?.photoURLs[0] ? (
                    <img
                      className="h-full"
                      alt="poster"
                      src={
                        photo
                          ? URL.createObjectURL(photo)
                          : data?.photoURLs[0].url
                      }
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
                    {...getInputProps()}
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
