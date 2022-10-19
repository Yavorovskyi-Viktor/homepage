import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import classNames from "classnames";

import { resolveIcon } from "./services/item";

export default function QuickLaunch({servicesAndBookmarks, searchString, setSearchString, isOpen, close}) {
  const { t } = useTranslation();

  const searchField = useRef();

  const [results, setResults] = useState([]);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);

  function openCurrentItem() {
    const result = results[currentItemIndex];
    window.open(result.href, '_blank');
  }

  function resetAndClose() {
    setSearchString("");
    close(false);
  }

  function handleSearchChange(event) {
    setSearchString(event.target.value.toLowerCase())
  }

  function handleSearchKeyDown(event) {
    if (event.key === "Escape") {
      resetAndClose();
    } else if (event.key === "Enter" && results.length) {
      resetAndClose();
      openCurrentItem();
    } else if (event.key === "ArrowDown" && results[currentItemIndex + 1]) {
      setCurrentItemIndex(currentItemIndex + 1);
      event.preventDefault();
    } else if (event.key === "ArrowUp" && currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
      event.preventDefault();
    }
  }

  function handleItemHover(event) {
    setCurrentItemIndex(parseInt(event.target?.dataset?.index));
  }

  function handleItemClick() {
    resetAndClose();
    openCurrentItem();
  }

  useEffect(() => {
    if (searchString.length === 0) setResults([]);
    else {
      const newResults = servicesAndBookmarks.filter(r => r.name.toLowerCase().includes(searchString));
      setResults(newResults);
      if (newResults.length) {
        setCurrentItemIndex(0);
      }
    }
  }, [searchString, servicesAndBookmarks])


  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    if (isOpen) {
      searchField.current.focus();
      setHidden(false);
    } else {
      setTimeout(() => {
        setHidden(true);
      }, 300); // disable on close
    }
  }, [isOpen])

  return (
    <div className={classNames(
      "relative z-10 ease-in-out duration-300 transition-opacity",
      hidden && !isOpen && "hidden",
      !hidden && isOpen && "opacity-100",
      !isOpen && "opacity-0",
    )} role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50" />
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full min-w-full items-start justify-center text-center">
          <div className="mt-[10%] min-w-[80%] md:min-w-[40%] rounded-md font-medium text-theme-700 dark:text-theme-200 dark:hover:text-theme-300 shadow-md shadow-theme-900/10 dark:shadow-theme-900/20 bg-theme-50 dark:bg-theme-800">
            <input placeholder="Search" className={classNames(
              results.length > 0 && "rounded-t-md",
              results.length === 0 && "rounded-md",
              "w-full p-4 m-0 border-0 border-b border-slate-700 focus:border-slate-700 focus:outline-0 focus:ring-0 text-sm md:text-xl text-theme-700 dark:text-theme-200 bg-theme-60 dark:bg-theme-800"
              )} type="text" ref={searchField} value={searchString} onChange={handleSearchChange} onKeyDown={handleSearchKeyDown} />
            {results.length > 0 && <ul className="max-h-[60vh] overflow-y-auto m-2">
              {results.map((r, i) => (
                <li key={r.name}>
                  <button data-index={i} onMouseEnter={handleItemHover} className={classNames(
                    "flex flex-row w-full items-center justify-between rounded-md text-sm md:text-xl py-2 px-4 cursor-pointer text-theme-700 dark:text-theme-200",
                    i === currentItemIndex && "bg-theme-300/50 dark:bg-theme-700/50",
                    )} onClick={handleItemClick}>
                    <div className="flex flex-row items-center mr-4 pointer-events-none">
                      <div className="w-5 text-xs mr-4">
                        {r.icon && resolveIcon(r.icon)}
                        {r.abbr && r.abbr}
                      </div>
                      {r.name}
                    </div>
                    <div className="text-xs text-theme-600 pointer-events-none">{r.abbr ? t("homepagesearch.bookmark") : t("homepagesearch.service")}</div>
                  </button>
                </li>
              ))}
            </ul>}
          </div>
        </div>
      </div>
    </div>
  );
}
