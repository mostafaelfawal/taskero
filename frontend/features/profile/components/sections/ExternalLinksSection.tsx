import { FormEvent, useState } from "react";
import { FiGithub, FiLinkedin, FiSave } from "react-icons/fi";
import { MdLanguage } from "react-icons/md";

export default function ExternalLinksSection() {
  const [url, setUrl] = useState({
    gitHubProfile: "",
    linkedInProfile: "",
    portfolioWebsite: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(url);
  };

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold dark:text-white">
          External Links
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Connect your professional profiles.
        </p>
      </div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="p-6 pt-0 grid gap-2 grid-cols-1 md:grid-cols-2">
          <div className="space-y-1 flex flex-col w-full">
            <label htmlFor="github" className="dark:text-slate-200">
              GitHub Profile
            </label>
            <div className="relative">
              <input
                id="github"
                type="url"
                value={url.gitHubProfile}
                onChange={(e) =>
                  setUrl({ ...url, gitHubProfile: e.target.value })
                }
                placeholder="enter your github profile..."
                className="w-full border border-gray-200 dark:border-slate-700 dark:bg-slate-700 dark:text-white shadow rounded-md pl-7 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-shadow dark:placeholder-slate-400"
              />
              <FiGithub className="absolute top-2 left-2 text-slate-500 dark:text-slate-400" />
            </div>
          </div>

          <div className="space-y-1 flex flex-col w-full">
            <label htmlFor="linkedIn" className="dark:text-slate-200">
              LinkedIn Profile
            </label>
            <div className="relative">
              <input
                id="linkedIn"
                type="url"
                value={url.linkedInProfile}
                onChange={(e) =>
                  setUrl({ ...url, linkedInProfile: e.target.value })
                }
                placeholder="enter your linkedIn profile..."
                className="w-full border border-gray-200 dark:border-slate-700 dark:bg-slate-700 dark:text-white shadow rounded-md pl-7 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-shadow dark:placeholder-slate-400"
              />
              <FiLinkedin className="absolute top-2 left-2 text-slate-500 dark:text-slate-400" />
            </div>
          </div>
          <div className="space-y-1 md:col-span-2 flex flex-col w-full">
            <label htmlFor="portfolio" className="dark:text-slate-200">
              Portfolio Website
            </label>
            <div className="relative">
              <input
                id="portfolio"
                type="url"
                value={url.portfolioWebsite}
                onChange={(e) =>
                  setUrl({ ...url, portfolioWebsite: e.target.value })
                }
                placeholder="enter your portfolio URL..."
                className="w-full border border-gray-200 dark:border-slate-700 dark:bg-slate-700 dark:text-white shadow rounded-md pl-7 py-1 px-2 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-shadow dark:placeholder-slate-400"
              />
              <MdLanguage className="absolute top-2 left-2 text-slate-500 dark:text-slate-400" />
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-t-gray-200 dark:border-t-slate-600 bg-gray-50 dark:bg-slate-700 mt-4 p-5">
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
