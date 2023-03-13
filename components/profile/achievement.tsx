import {
  addUserAchievement,
  deleteUserAchievement,
  updateUserAchievement,
} from "@/api/ProfileClient";
import AddIcon from "@/assets/AddIcon.svg";
import EditTextIcon from "@/assets/EditTextIcon.svg";
import useAchievements from "@/hooks/useAchievements";
import { IAchievement } from "@/types/profile";
import classNames from "classnames";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import Modal from "../modal";
import Pagination from "../pagination";

export default function Achievements({
  userId,
  editable,
}: {
  userId?: number;
  editable?: boolean;
}) {
  const [page, setPage] = useState(1);
  const { data } = useAchievements(userId, page);

  useEffect(() => {
    if (data && data.pageTotal < page) {
      setPage(data.pageTotal);
    }
  }, [data, page]);

  return (
    <div
      className={`bg-white rounded-lg drop-shadow-2xl p-8 h-full border-2 flex flex-col justify-between`}
    >
      <div className="">
        <div className="flex flex-row justify-between mb-5">
          <h3 className="text-green-primary text-xl md:text-2xl">
            Achievement
          </h3>
          {editable && <AddEditButton />}
        </div>
        <ul className="flex flex-col gap-2.5">
          {data?.achievements.map((achievement) => (
            <Achievement
              key={achievement.id}
              achievement={achievement}
              editable={editable}
            />
          ))}
        </ul>
      </div>
      {data && (
        <Pagination
          page={page}
          setPage={setPage}
          pageTotal={data.pageTotal}
          className="mt-4"
        />
      )}
    </div>
  );
}

function Achievement({
  achievement,
  editable,
}: {
  achievement: IAchievement;
  editable?: boolean;
}) {
  return (
    <li>
      <div className="flex flex-row justify-between">
        <h4 className="text-xl">{achievement.achievement}</h4>
        {editable && <AddEditButton achievement={achievement} />}
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

  const { register, handleSubmit, reset } = useForm<FormState>({
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
            className="bg-no-repeat bg-contain bg-left aspect-square w-4 md:w-6"
          />
        ) : (
          <Image
            src={AddIcon}
            alt="Picture of the author"
            width={24}
            height={24}
            className="bg-no-repeat bg-contain bg-left aspect-square w-4 md:w-6"
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
                if (!isEdit) {
                  reset();
                }
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
              placeholder="Achievement"
            />
          </div>
          <div className="w-full mb-1 md:mb-0">
            <label className="block text-black text-sm font-bold mb-3">
              Penerbit
            </label>
            <input
              className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              {...register("issuer")}
              placeholder="Penerbit"
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
              placeholder="Deskripsi"
            />
          </div>
          <div
            className={classNames(
              "flex items-end",
              isEdit ? "justify-between" : "justify-end"
            )}
          >
            {isEdit && (
              <button
                type="button"
                className="text-gray-600 text-base hover:text-black hover:underline"
                onClick={() => {
                  deleteUserAchievement(achievement.id)
                    .then(() => {
                      setIsOpen(false);
                      queryClient.invalidateQueries("achievements");
                      alert("Achievement berhasil dihapus");
                    })
                    .catch(() => {
                      alert("Achievement gagal dihapus");
                    });
                }}
              >
                Hapus Achievement
              </button>
            )}
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
