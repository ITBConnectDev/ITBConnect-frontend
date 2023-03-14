import { addUserLanguage, deleteUserLanguage } from "@/api/ProfileClient";
import AddIcon from "@/assets/AddIcon.svg";
import CloseIcon from "@/assets/Close.svg";
import EditTextIcon from "@/assets/EditTextIcon.svg";
import { IProfileUser } from "@/types/profile";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import Modal from "../modal";

export default function Languages({
  languages,
  editable,
}: {
  languages: IProfileUser["userLanguages"];
  editable?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2">
      <div className="flex flex-row justify-between mb-5">
        <h3 className="text-green-primary text-xl md:text-2xl">Fluent In</h3>
        {editable && <AddEditButton languages={languages} />}
      </div>

      <ul className="flex flex-row flex-wrap">
        {languages.map((language) => (
          <li key={language.id} className="w-full first:mb-2">
            {language.language}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LanguageEdit({ id, language }: { id: number; language: string }) {
  const queryClient = useQueryClient();
  const handleClick = (e) => {
    e.preventDefault();
    deleteUserLanguage(id)
      .catch(() => {
        alert("Language gagal dihapus");
      })
      .then(() => {
        queryClient.invalidateQueries("profile");
      });
  };
  return (
    <li className="px-3 py-2 border-2 border-gray-200 rounded-lg flex flex-row justify-between">
      <p className="text-gray-600 font-medium">{language}</p>
      <button type="button" onClick={handleClick}>
        <Image src={CloseIcon} alt="Delete language icon"></Image>
      </button>
    </li>
  );
}

interface FormState {
  language: string;
}

function AddEditButton({
  languages,
}: {
  languages?: IProfileUser["userLanguages"];
}) {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormState>({
    defaultValues: {
      language: "",
    },
  });

  return (
    <>
      <div className="flex flex-row mr-4">
        <button
          type="button"
          className={classNames("flex-shrink-0 w-6 h-6")}
          onClick={() => setIsAddOpen(true)}
        >
          <Image
            src={AddIcon}
            alt="Add language icon"
            className="bg-no-repeat bg-contain bg-left aspect-square w-4 md:w-6"
          />
        </button>
        <button
          type="button"
          className={classNames("flex-shrink-0 w-6 h-6")}
          onClick={() => setIsEditOpen(true)}
        >
          <Image
            src={EditTextIcon}
            alt="Edit language icon"
            className="bg-no-repeat bg-contain bg-left aspect-square w-4 md:w-6 ml-4"
          />
        </button>
      </div>
      {/* Modal for add */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Language"
        className="w-[80%] max-w-md"
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(async ({ ...data }) => {
            let promise = addUserLanguage(data)
              .then(() => {
                queryClient.invalidateQueries("profile");
                setIsAddOpen(false);
                reset();
                alert("Language berhasil ditambahkan");
              })
              .catch(() => {
                alert("Language gagal ditambahkan");
              });
          })}
        >
          <div className="w-full mb-1 md:mb-0">
            <label className="block text-black text-sm font-bold mb-3">
              Language
            </label>
            <input
              className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              {...register("language")}
              type="text"
              placeholder="English"
            />
          </div>
          <div className={classNames("flex items-end justify-end")}>
            <button
              type="submit"
              className="py-2 px-10 bg-white border-2 rounded-full border-secondary font-bold text-xl"
            >
              Simpan
            </button>
          </div>
        </form>
      </Modal>
      {/* Modal for edit */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Language"
        className="w-[80%] max-w-md"
      >
        <ul className="flex flex-col gap-4">
          {languages?.map((language) => (
            <LanguageEdit key={language.id} {...language} />
          ))}
        </ul>
      </Modal>
    </>
  );
}
