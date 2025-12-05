import Image from "next/image";
import { BiCalendarAlt, BiCamera } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import InfoRow from "../InfoRow";
import { GoShieldLock } from "react-icons/go";

export default function ProfileCardSection() {
  const user = {
    name: "Mostafa Hamdi",
    email: "armostafa982@gmail.com",
    role: "Owner",
    joined: "Nov 2023",
    lastLogin: "Today, 10:23 AM",
  };
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
              src="/default-avatar.png"
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
        <h2 className="text-xl dark:text-white font-bold">
          {user.name}
          <span className="ml-2 rounded-md font-medium px-2.5 py-0.5 text-xs bg-violet-100 text-violet-700 dark:bg-violet-700 dark:text-violet-100">
            {user.role}
          </span>
        </h2>

        <p className="mb-3 inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <MdOutlineEmail /> {user.email}
        </p>

        <InfoRow icon={<BiCalendarAlt />} label="Joined" value={user.joined} />
        <div className="h-px bg-slate-200 dark:bg-slate-500 my-3" />
        <InfoRow
          icon={<GoShieldLock />}
          label="Last Login"
          value={user.lastLogin}
        />
      </div>
    </section>
  );
}
