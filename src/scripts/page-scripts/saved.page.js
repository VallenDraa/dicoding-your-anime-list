import { closeDialog } from "../component-scripts/dialog.js";
import observe from "../helpers/intersectionObserver.js";
import {
  renderAnimeList,
  renderEmptyList,
  renderPreviews,
  renderSkeleton,
} from "../helpers/render-data.js";
import {
  isSaved,
  resetPageDataOnUrlChange,
  savedAnimes,
  savedPageData,
} from "../helpers/saved-anime.js";

import $ from "jquery";

let hasExitPage = false;

let startIdx = 0,
  endIdx = savedAnimes.length < 25 ? savedAnimes.length : 25;

// akan dieksekusi setiap hash pada url menjadi #saved
export default function savedPage() {
  hasExitPage = false;

  renderSkeleton({
    listId: "#saved-list",
    emptyId: "#empty-saved",
    listWrapperId: "#saved-list-wrapper",
  });

  // pake set timeout biar keliatan skeletonnya hehe
  setTimeout(() => {
    if (savedAnimes.length === 0) {
      renderEmptyList({
        emptyId: "#empty-saved",
        listWrapperId: "#saved-list-wrapper",
      });
    } else {
      renderAnimeList({
        listId: "#search-list",
        listWrapperId: "#saved-list-wrapper",
        emptyId: "#empty-saved",
      });

      renderPreviews({
        animeData: savedAnimes.slice(startIdx, endIdx),
        listId: "#saved-list",
      });
    }
  }, 500);
}

// akan dieksekusi setiap berganti url dari halaman saved animes
$(window).on("popstate", () => {
  if (!hasExitPage && window.location.hash !== "#saved") {
    resetData();

    $("#saved-list").html("");

    hasExitPage = true;
  }
});

// inisialisasi infinite scroller
const loadMoreObserver = $("#load-more-saved").get()[0];
observe(loadMoreObserver, loadMoreResults);

$("#detail-save-btn").on("click", (e) => {
  if (window.location.hash === "#saved") {
    const id = e.target.getAttribute("data-save-id");

    !isSaved(id) && onUnsaveInSavedPage(id);
  }
});

/* Helpers
============================================* */
function loadMoreResults() {
  if (savedPageData.hasNextPage) {
    let newEndIdx = endIdx + 25;

    if (endIdx < savedPageData.totalItem) {
      startIdx += 25;
    }

    if (newEndIdx > savedPageData.totalItem) {
      endIdx = savedPageData.totalItem;
      savedPageData.hasNextPage = false;
    } else {
      endIdx = newEndIdx;
    }

    renderPreviews({
      animeData: savedAnimes.slice(startIdx, endIdx),
      listId: "#saved-list",
    });
  }

  // ubah indikator loading konten sesuai kondisi
  $("#load-more-saved").html(
    savedPageData.hasNextPage
      ? '<i class="fas fa-spinner animate-spin"></i>'
      : "End of search results"
  );
}

function resetData() {
  startIdx = 0;
  endIdx = 25;

  resetPageDataOnUrlChange();
}

export function onUnsaveInSavedPage(idOfAnimeToRemove) {
  // cek apakah dialog di buka di halaman save
  $(`[data-preview-id="${idOfAnimeToRemove}"]`).remove();
  closeDialog();

  if (savedAnimes.length === 0) {
    renderEmptyList({
      emptyId: "#empty-saved",
      listWrapperId: "#saved-list-wrapper",
    });
  }
}
