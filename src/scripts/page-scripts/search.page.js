import $ from "jquery";
import * as T from "../helpers/types.js";
import observe from "../helpers/intersectionObserver.js";
import { formatAnimeData, formatPageData } from "../helpers/data-formatter.js";
import {
  renderAnimeList,
  renderEmptyList,
  renderPreviews,
  renderSkeleton,
} from "../helpers/render-data.js";

let query = "";

/** @type {T.AnimeData[]} */
export let queryResults = [];

/** @type {T.Pagination} */
let pagesData = {};

// akan dieksekusi setiap hash pada url menjadi #search
export default function searchPage() {
  query = $("#search-bar").val();

  if (query) {
    renderSkeleton({
      listWrapperId: "#search-list-wrapper",
      emptyId: "#empty-search",
      listId: "#search-list",
    });

    // ajax ke jikan-api untuk mengambil data
    $.ajax(`https://api.jikan.moe/v4/anime?q=${query}&page=1`, {
      success: (res) => {
        resetData();
        const { pagination, data: animeData } = res;

        if (animeData.length === 0) {
          renderEmptyList({
            listWrapperId: "#search-list-wrapper",
            emptyId: "#empty-search",
          });
        } else {
          // ubah format data sesuai dengan kebutuhan
          pagesData = formatPageData(pagination);
          queryResults = formatAnimeData(animeData);

          renderAnimeList({
            listId: "#search-list",
            listWrapperId: "#search-list-wrapper",
            emptyId: "#empty-search",
          });

          renderPreviews({
            listId: "#search-list",
            animeData: queryResults,
          });

          // update specifier
          $("#query-specifier").text(`"${query}"`);
          $("#result-qty-specifier").text(
            `Found ${pagesData.totalItem} results`
          );
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

$("#search-button").on("click", () => {
  if (window.location.hash === "#search") {
    searchPage();
  }
});

// inisialisasi infinite scroller
const loadMoreObserver = $("#load-more-search").get()[0];
observe(loadMoreObserver, loadMoreResults);

/* Helpers
============================================* */
function loadMoreResults() {
  if (pagesData.hasNextPage) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&page=${
      pagesData.currentPage + 1
    }`;

    $.ajax(url, {
      success: (res) => {
        const { pagination, data: animeData } = res;

        pagesData = formatPageData(pagination);

        const newAnimeData = formatAnimeData(animeData);
        queryResults.push(...newAnimeData);

        renderPreviews({
          listId: "#search-list",
          animeData: newAnimeData,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // ubah indikator loading konten sesuai kondisi
  $("#load-more-search").html(
    pagesData.hasNextPage
      ? '<i class="fas fa-spinner animate-spin"></i>'
      : "End of search results"
  );
}

// data
function resetData() {
  pagesData = {};
  queryResults = [];
}
