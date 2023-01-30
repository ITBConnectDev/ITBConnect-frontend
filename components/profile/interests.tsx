import AddIcon from "@/assets/AddIcon.svg";
import EditTextIcon from "@/assets/EditTextIcon.svg";
import { IProfileUser } from "@/types/profile";
import Image from "next/image";

export default function Interests({
  interests,
}: {
  interests: IProfileUser["userInterests"];
}) {
  return (
    <div className="bg-white rounded-lg drop-shadow-2xl p-8 w-[100%] border-2 mb-5">
      <div className="flex flex-row justify-between mb-5">
        <h2 className="text-green-primary text-3xl">Skills / Interest</h2>
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
        {interests.map((interest) => (
          <li className="w-1/2 first:mb-2" key={interest.id}>
            {interest.interest}
          </li>
        ))}
      </ul>
    </div>
  );
}
