import { addUserSkill, deleteUserSkill } from "@/api/ProfileClient";
import AddIcon from "@/assets/AddIcon.svg";
import EditTextIcon from "@/assets/EditTextIcon.svg";
import CloseIcon from "@/assets/Close.svg";
import { IProfileUser } from "@/types/profile";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import Modal from "../modal";

export default function Interests({
  interests,
  editable,
}: {
  interests: IProfileUser["userInterests"];
  editable?: boolean;
}) {
  return (
    <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2">
      <div className="flex flex-row justify-between mb-5">
        <h3 className="text-green-primary text-xl md:text-2xl">
          Skills / Interest
        </h3>
        {editable && <AddEditButton interests={interests} />}
      </div>
      <ul className="flex flex-row flex-wrap">
        {interests.map((interest) => (
          <li className="w-1/2 first:mb-2" key={interest.id}>
            {interest.interest}
          </li>
        ))}
      </ul>
    </div>
  );
}

function InterestEdit({ id, interest }: { id: number; interest: string }) {
  const queryClient = useQueryClient();
  const handleClick = (e) => {
    e.preventDefault();
    deleteUserSkill(id)
      .catch(() => {
        alert("Skill/Interest gagal dihapus");
      })
      .then(() => {
        queryClient.invalidateQueries("profile");
      });
  };
  return (
    <li className="px-3 py-2 border-2 border-gray-200 rounded-lg flex flex-row justify-between">
      <p className="text-gray-600 font-medium">{interest}</p>
      <button type="button" onClick={handleClick}>
        <Image src={CloseIcon} alt="Delete skill/interest icon"></Image>
      </button>
    </li>
  );
}

interface FormState {
  skills: string;
}

function AddEditButton({
  interests,
}: {
  interests?: IProfileUser["userInterests"];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormState>({
    defaultValues: {
      skills: "",
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
            alt="Add skill/interest icon"
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
            alt="Edit skill/interest icon"
            className="bg-no-repeat bg-contain bg-left aspect-square w-4 md:w-6 ml-4"
          />
        </button>
      </div>
      {/* Modal for add */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Skill/Interest"
        className="w-[80%] max-w-md"
      >
        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit(async ({ ...data }) => {
            let promise = addUserSkill(data)
              .then(() => {
                setIsAddOpen(false);
                reset();
                alert("Skill/Interest berhasil ditambahkan");
              })
              .catch(() => {
                alert("Skill/Interest gagal ditambahkan");
              });
          })}
        >
          <div className="w-full mb-1 md:mb-0">
            <label className="block text-black text-sm font-bold mb-3">
              Skill/Interest
            </label>
            <input
              className="appearance-none border-2 rounded-lg w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              {...register("skills")}
              type="text"
              placeholder="Data Science"
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
        title="Edit Skill/Interest"
        className="w-[80%] max-w-md"
      >
        <ul className="flex flex-col gap-4">
          {interests?.map((interest) => (
            <InterestEdit key={interest.id} {...interest} />
          ))}
        </ul>
      </Modal>
    </>
  );
}
