
import useAchievements from "@/hooks/useAchievements";
import { IAchievement } from "@/types/profile";
import { useWindowSize } from "@/utils/windowsize";
import { useState } from "react";

type AchievementProps = {
  userId: number;
};

export default function FriendAchievements({ userId }: AchievementProps) {
  const size = useWindowSize();
  const windowSize = size.width;
  const [page, setPage] = useState(0);
  const { data } = useAchievements(userId, page);

  return (
    <div
      className={`bg-white rounded-lg drop-shadow-2xl p-8 h-fit border-2 ${
        windowSize <= 1200 ? "mx-auto w-[80%] mb-5" : "w-[38%]"
      }`}
    >
      <div className="flex flex-row justify-between mb-5">
        <h2 className="text-green-primary text-3xl">Achievement</h2>
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
                fillRule="evenodd"
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
                fillRule="evenodd"
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
