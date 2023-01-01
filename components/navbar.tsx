import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";
import Image from "next/image";
import Link from "next/link";
import LogoNavbar from "../assets/LogoNavbar.svg";

function Navbar() {
  const { user } = useAuth();
  const logout = useLogout();
  return (
    <nav className="bg-gray-200 border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src={LogoNavbar}
            alt="ITB Connect"
            className="h-6 mr-3 sm:h-9"
          />
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
            <li>
              <Link
                href="/"
                className="mt-1 block py-2 pl-3 pr-4 text-black rounded md:bg-transparent md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="mt-1 block py-2 pl-3 pr-4 text-black  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/about-us"
                className="mt-1 block py-2 pl-3 pr-4 text-black  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/competitions"
                className="mt-1 block py-2 pl-3 pr-4 text-black  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                Info
              </Link>
            </li>

            <li className="m-auto ml-0 bg-blue-primary p-1 rounded-full w-24 h-8 text-center text-white">
              {user ? (
                <button type="button" onClick={() => logout()}>
                  Logout
                </button>
              ) : (
                <Link href="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
