import AddIcon from "@/assets/AddIcon.svg";
import EditTextIcon from "@/assets/EditTextIcon.svg";
import { IProfileUser } from "@/types/profile";
import Image from "next/image";

export default function Languages({
  languages,
}: {
  languages: IProfileUser["userLanguages"];
}) {
  return (
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
