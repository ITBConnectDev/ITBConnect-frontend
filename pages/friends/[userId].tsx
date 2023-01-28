import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { useWindowSize } from "@/utils/windowsize";
import Link from "next/link";
import ProfileDetailCard from "@/components/profileDetailCard";

function FriendDetailPage() {
  const size = useWindowSize();
  const windowSize = size.width;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="w-full max-w-screen-lg mx-auto items-center flex flex-col">
        <h1
          className={`text-center lg:text-6xl text-4xl text-green-primary font-bold mt-[5%] mx-auto`}
        >
          Cari Teman
        </h1>
        <ProfileDetailCard
          image={"dasdas"}
          fullname={"Nama Orang"}
          nickname={"Nama panggilan"}
          major={"Jurusan"}
          year={2020}
          bio={
            "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
          }
          phoneNumber={"081234567890"}
          instagramURL={"https://www.instagram.com/"}
          linkedinURL={"https://www.linkedin.com/"}
        />
      </div>
      <Footer />
    </div>
  );
}

export default FriendDetailPage;
