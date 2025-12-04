import { FiGithub, FiLinkedin, FiSave } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";

export default function ExternalLinksSection() {
  return (
    <section className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold">External Links</h2>
        <p className="text-sm text-slate-500">
          Connect your professional profiles.
        </p>
      </div>
      <form>
        <div className="p-6 pt-0 grid gap-2 grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col w-full">
            <label htmlFor="github">GitHub Profile</label>
            <div className="relative">
              <input
                id="github"
                type="text"
                placeholder="enter your github profile..."
                className="w-full border border-gray-200 shadow rounded-md pl-7 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-shadow"
              />
              <FiGithub className="absolute top-2 left-2 text-slate-500" />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="linkedIn">LinkedIn Profile</label>
            <div className="relative">
              <input
                id="linkedIn"
                type="text"
                placeholder="enter your linkedIn profile..."
                className="w-full border border-gray-200 shadow rounded-md pl-7 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-shadow"
              />
              <FiLinkedin className="absolute top-2 left-2 text-slate-500" />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col w-full">
            <label htmlFor="portfolio">Portfolio Website</label>
            <div className="relative">
              <input
                id="portfolio"
                type="text"
                placeholder="enter your portfolio URL..."
                className="w-full border border-gray-200 shadow rounded-md pl-7 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-shadow"
              />
              <MdLanguage className="absolute top-2 left-2 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-t-gray-200 bg-gray-50 mt-4 p-5">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm transition-colors disabled:opacity-50 font-semibold px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
}
