import $ from "jquery";
import { AnimeData, Pagination } from "./types.js";
import { queryResults } from "../page-scripts/search.page.js";

export const itemQtyPerPage = 25;

/** @type {Array<AnimeData>} */
export let savedAnimes = loadSavedAnimes();

/** @type {Pagination} */
export let savedPageData = loadSavedPageData();

$("#detail-save-btn").on("click", (e) => {
  let target = e.target;
  let id = target.getAttribute("data-save-id");

  while (!id) {
    target = target.parentElement;

    id = target.getAttribute("data-save-id");
  }

  isSaved(id)
    ? removeSavedAnime(id)
    : saveAnime(queryResults.find((anime) => anime.id === id));

  // ganti dengan style baru
  const { content, classList } = btnStyle(isSaved(id));

  $("#detail-save-btn").attr("class", classList);
  $("#detail-save-btn").html(content);
});

// saved anime code
export function isSaved(id) {
  return savedAnimes.some((anime) => anime.id === id);
}
export function loadSavedAnimes() {
  const savedAnimes = localStorage.getItem("saved-animes");

  return savedAnimes ? JSON.parse(savedAnimes) : [];
}
export function saveAnime(newData) {
  savedAnimes.push(newData);

  localStorage.setItem("saved-animes", JSON.stringify(savedAnimes));

  updateTotalItemInPageData("increase");
}
export function removeSavedAnime(targetId) {
  savedAnimes = savedAnimes.filter((anime) => targetId !== anime.id);

  localStorage.setItem("saved-animes", JSON.stringify(savedAnimes));

  updateTotalItemInPageData("decrease");
}
export function btnStyle(isSaved) {
  const saveButtonBaseClass =
    "flex items-center justify-center gap-1 rounded px-5 py-2.5 font-medium text-white transition-colors focus:outline-none focus:ring-4 ";

  const result = {
    content: isSaved
      ? `<i class="fa-solid fa-bookmark text-sm"></i> Saved`
      : `<i class="fa-regular fa-bookmark text-sm"></i> Save`,

    classList: isSaved
      ? `${saveButtonBaseClass} bg-teal-600 focus:ring-teal-800 hover:bg-teal-700`
      : `${saveButtonBaseClass} bg-slate-500 focus:ring-slate-700 hover:bg-slate-600`,
  };

  return result;
}

// saved anime pages data code
/** @returns {Pagination} */
export function loadSavedPageData() {
  if (savedAnimes.length <= itemQtyPerPage) {
    return {
      currentPage: 1,
      hasNextPage: false,
      totalItem: savedAnimes.length,
      lastVisiblePage: 1,
    };
  } else {
    return {
      currentPage: 1,
      hasNextPage: true,
      totalItem: savedAnimes.length,
      lastVisiblePage: Math.ceil(savedAnimes.length / itemQtyPerPage),
    };
  }
}
/** @param {"increase" | "decrease"} operation */
export function updateTotalItemInPageData(operation) {
  const newTotal =
    operation === "decrease"
      ? savedPageData.totalItem - 1
      : savedPageData.totalItem + 1;

  const newLastVisiblePage = Math.ceil(savedAnimes.length / itemQtyPerPage);

  savedPageData = {
    ...savedPageData,
    totalItem: newTotal,
    hasNextPage: newLastVisiblePage > savedPageData.currentPage,
    lastVisiblePage: newLastVisiblePage,
  };
}
export function goToNextPage() {
  const newHasNextPage =
    savedPageData.lastVisiblePage > savedPageData.currentPage;

  if (newHasNextPage) {
    savedPageData = {
      ...savedPageData,
      currentPage: savedPageData + 1,
      hasNextPage: newHasNextPage,
    };
  }
}
export function resetPageDataOnUrlChange() {
  savedPageData = {
    ...savedPageData,
    currentPage: 1,
    hasNextPage: true,
  };
}
