import Image from "next/image";
import { BiCalendarAlt, BiCamera } from "react-icons/bi";
import { MdLanguage, MdOutlineEmail } from "react-icons/md";
import InfoRow from "../InfoRow";
import { GoShieldLock } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function ProfileCardSection() {
  const user = useSelector((state: RootState) => state.user);
  const formatDate = (strDate: string) =>
    new Intl.DateTimeFormat("en", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(strDate));

  return (
    <section className="bg-white dark:bg-slate-800 overflow-hidden rounded-xl shadow dark:shadow-lg">
      <div className="relative h-32">
        <Image
          src="/default-cover.jpg"
          alt="cover"
          fill
          className="object-cover"
        />

        <div className="absolute -bottom-12 left-5 w-24 h-24">
          <div className="relative w-full h-full rounded-full border-4 border-white shadow-lg overflow-hidden dark:border-slate-800">
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 rounded-full bg-violet-600 hover:bg-violet-500 text-white p-1 border-2">
            <BiCamera color="white" />
          </button>
        </div>
      </div>

      <div className="p-6 pt-14">
        <h2 className="text-xl dark:text-white font-bold">{user.name}</h2>

        <p className=" inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <MdOutlineEmail /> {user.email}
        </p>

        <div className="mb-4 flex gap-3 mt-2">
          {user.linkedInProfile && (
            <a
              href={user.linkedInProfile}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-xl 
                 bg-white dark:bg-slate-700 
                 border border-gray-200 dark:border-slate-600
                 dark:text-slate-400
                 shadow-sm hover:shadow-md 
                 hover:bg-violet-600 hover:text-white 
                 hover:border-transparent
                 transition-all duration-200"
            >
              <FiLinkedin size={18} />
            </a>
          )}

          {user.gitHubProfile && (
            <a
              href={user.gitHubProfile}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-xl 
                 bg-white dark:bg-slate-700 
                 border border-gray-200 dark:border-slate-600
                 dark:text-slate-400
                 shadow-sm hover:shadow-md 
                 hover:bg-violet-600 hover:text-white 
                 hover:border-transparent
                 transition-all duration-200"
            >
              <FiGithub size={18} />
            </a>
          )}

          {user.portfolioWebsite && (
            <a
              href={user.portfolioWebsite}
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-xl 
                 bg-white dark:bg-slate-700 
                 border border-gray-200 dark:border-slate-600
                 dark:text-slate-400
                 shadow-sm hover:shadow-md 
                 hover:bg-violet-600 hover:text-white 
                 hover:border-transparent
                 transition-all duration-200"
            >
              <MdLanguage size={18} />
            </a>
          )}
        </div>

        <InfoRow
          icon={<BiCalendarAlt />}
          label="Joined"
          value={formatDate(user.createdAt!)}
        />
        <div className="h-px bg-slate-200 dark:bg-slate-500 my-3" />
        <InfoRow
          icon={<GoShieldLock />}
          label="Last Login"
          value={formatDate(user.updatedAt!)}
        />
      </div>
    </section>
  );
}
