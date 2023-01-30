import { addUserAchievement, updateUserAchievement } from "@/api/ProfileClient";
import AddIcon from "@/assets/AddIcon.svg";
import EditTextIcon from "@/assets/EditTextIcon.svg";
import useAchievements from "@/hooks/useAchievements";
import useAuth from "@/hooks/useAuth";
import { IAchievement } from "@/types/profile";
import { useWindowSize } from "@/utils/windowsize";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import Modal from "../modal";

export default function Achievements() {
  const size = useWindowSize();
  const { user } = useAuth();
  const windowSize = size.width;
  const [page, setPage] = useState(0);
  const { data } = useAchievements(user?.id, page);

  return (
    <div
      className={`bg-white rounded-lg drop-shadow-2xl p-8 h-fit border-2 ${
        windowSize <= 1200 ? "mx-auto w-[80%] mb-5" : "w-[38%]"
      }`}
    >
      <div className="flex flex-row justify-between mb-5">
        <h2 className="text-green-primary text-3xl">Achievement</h2>
        <AddEditButton />
      </div>
      <ul>
        {data?.achievements.map((achievement) => (
          <Achievement key={achievement.id} achievement={achievement} />
        ))}
      </ul>
      <nav aria-label="Page navigation example" className="m-auto mb-8">
        <ul className="inline-flex items-center -space-x-px">
          <li
            role="button"
            onClick={() => setPage(Math.max(page - 1, 0))}
            className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
          {data &&
            Array.from(Array(data.pageTotal), (e, i) => {
              return (
                <li
                  role="button"
                  key={i}
                  onClick={() => setPage(Math.max(i + 1, 0))}
                  className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {i + 1}
                </li>
              );
            })}
          <li
            role="button"
            onClick={() =>
              setPage(Math.min(page + 1, data?.pageTotal ?? page + 1))
            }
            className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Achievement({ achievement }: { achievement: IAchievement }) {
  return (
    <li>
      <div className="flex flex-row justify-between">
        <h4 className="text-xl">{achievement.achievement}</h4>
        <AddEditButton achievement={achievement} />
      </div>
      <p className="text-gray-500 my-1">
        Issued by {achievement.issuer} .{" "}
        {new Date(achievement.date).toLocaleDateString("en", {
          month: "short",
          year: "numeric",
        })}
      </p>
      <p className="text-gray-600 mb-2">{achievement.description}</p>
      <hr />
    </li>
  );
}

interface FormState {
  achievement: string;
  issuer: string;
  month: number;
  year: number;
  description: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function AddEditButton({ achievement }: { achievement?: IAchievement }) {
  const [isOpen, setIsOpen] = useState(false);
  const isEdit = !!achievement;
  const now = new Date();

  const { register, handleSubmit } = useForm<FormState>({
    defaultValues: {
      achievement: achievement?.achievement ?? "",
      issuer: achievement?.issuer ?? "",
      month: achievement?.date
        ? new Date(achievement.date).getMonth()
        : now.getMonth(),
      year: achievement?.date
        ? new Date(achievement.date).getFullYear()
        : now.getFullYear(),
      description: achievement?.description ?? "",
    },
  });
  const queryClient = useQueryClient();

  return (
    <>
      <button
        type="button"
        className={classNames("flex-shrink-0 w-6 h-6")}
        onClick={() => setIsOpen(true)}
      >
        {isEdit ? (
          <Image
            src={EditTextIcon}
            alt="Picture of the author"
            width={24}
            height={24}
            className="bg-no-repeat bg-contain bg-left"
          />
        ) : (
          <Image
            src={AddIcon}
            alt="Picture of the author"
            width={24}
            height={24}
            className="bg-no-repeat bg-contain bg-left"
          />
        )}
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={isEdit ? "Edit Achievement" : "Add Achievement"}
        className="w-[80%] max-w-md"
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(async ({ month, year, ...data }) => {
            const date = new Date(year, month);
            let promise: Promise<any>;
            if (isEdit) {
              promise = updateUserAchievement(achievement.id, {
                ...data,
                date: date.toISOString(),
              });
            } else {
              promise = addUserAchievement({
                ...data,
                date: date.toISOString(),
              });
            }
            promise
              .then(() => {
                setIsOpen(false);
                queryClient.invalidateQueries("achievements");
                alert(
                  isEdit
                    ? "Achievement berhasil diubah"
                    : "Achievement berhasil ditambahkan"
                );
              })
              .catch(() => {
                alert(
                  isEdit
                    ? "Achievement gagal diubah"
                    : "Achievement gagal ditambahkan"
                );
              });
          })}
        >
          <div className="w-full mb-1 md:mb-0">
            <label className="block text-black text-sm font-bold mb-3">
              Judul
            </label>
            <input
              className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              {...register("achievement")}
              type="text"
            />
          </div>
          <div className="w-full mb-1 md:mb-0">
            <label className="block text-black text-sm font-bold mb-3">
              Penerbit
            </label>
            <input
              className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              {...register("issuer")}
              type="text"
            />
          </div>
          <div className="">
            <label className="block text-black text-sm font-bold mb-3">
              Tanggal Pembuatan
            </label>
            <div className="grid grid-cols-2 gap-6">
              <select
                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                {...register("month")}
              >
                {months.map((month, index) => (
                  <option key={index} value={index}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
                {...register("year")}
              >
                {Array.from(
                  { length: 10 },
                  (_, i) => now.getFullYear() - 9 + i
                ).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-black text-sm font-bold mb-3">
              Deskripsi
            </label>
            <textarea
              className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              {...register("description")}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-10 bg-white border-2 rounded-full border-secondary font-bold text-xl"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
