import Image from "next/image";
import { Component } from "react";
import IconWhite from "../assets/IconWhite.svg";
import Instagram from "../assets/Instagram.svg";
import Line from "../assets/Line.svg";
import Linkedin from "../assets/Linkedin.svg";
import Twitter from "../assets/Twitter.svg";
import Youtube from "../assets/Youtube.svg";

class Footer extends Component {
  render() {
    return (
      <div className="px-[5%] py-16 min-h-max h-60 w-full items-center border-t bg-blue-primary">
        <div className="flex justify-between mb-4">
          <div>
            <Image
              onClick={() => window.location.href = "itb-connect.com"}
              src={IconWhite}
              alt="Picture of the author"
              className="h-full bg-no-repeat bg-contain w-[7rem] md:w-[10rem]"
            />
          </div>
          <div className="flex">
            <Image
              onClick={() => window.location.href = "itb-connect.com"}
              src={Instagram}
              alt="Picture of the author"
              className="h-full bg-no-repeat bg-contain w-[3rem]"
            />
            <Image
              onClick={() => window.location.href = "itb-connect.com"}
              src={Linkedin}
              alt="Picture of the author"
              className="h-full bg-no-repeat bg-contain w-[3rem]"
            />
            <Image
              onClick={() => window.location.href = "itb-connect.com"}
              src={Twitter}
              alt="Picture of the author"
              className="h-full bg-no-repeat bg-contain w-[3rem]"
            />
            <Image
              onClick={() => window.location.href = "itb-connect.com"}
              src={Line}
              alt="Picture of the author"
              className="h-full bg-no-repeat bg-contain w-[3rem]"
            />
            <Image
              onClick={() => window.location.href = "itb-connect.com"}
              src={Youtube}
              alt="Picture of the author"
              className="h-full bg-no-repeat bg-contain w-[3rem]"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-white">Kementrian Kolaborasi dan Inovasi</h1>
            <h1 className="text-white">Kemenkoan Karya dan Inovasi</h1>
            <h1 className="text-white">Kabinet Cita Raya</h1>
          </div>
          <div>
            <div className="text-white">© 2022 ITBConnect</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
