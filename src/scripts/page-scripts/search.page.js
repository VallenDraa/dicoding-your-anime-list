import $ from "jquery";
import * as T from "../helpers/types.js";
import observe from "../helpers/intersectionObserver.js";
import { formatAnimeData, formatPageData } from "../helpers/data-formatter.js";

let query = "";

/** @type {T.AnimeData[]} */
export let queryResults = [];

/** @type {T.Pagination} */
let pagesData = {};

// akan dieksekusi setiap hash pada url menjadi #search
export default function searchPage() {
  query = $("#search-bar").val();

  if (query) {
    renderSkeleton();

    // ajax ke jikan-api untuk mengambil data
    $.ajax(`https://api.jikan.moe/v4/anime?q=${query}&page=1`, {
      success: (res) => {
        resetData();
        const { pagination, data: animeData } = res;

        if (animeData.length === 0) {
          renderEmptySearch();
        } else {
          // ubah format data sesuai dengan kebutuhan
          pagesData = formatPageData(pagination);
          queryResults = formatAnimeData(animeData);

          renderSearchResults(query);
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}

// inisialisasi infinite scroller
const loadMoreObserver = document.querySelector("#load-more-observer");
observe(loadMoreObserver, loadMoreResults);

/* Helpers
============================================* */
// renderers
function renderSearchResults(queryString) {
  $("body").css("overflow", "auto");
  $("#anime-preview-skeleton").addClass("hidden").removeClass("grid");
  $("#empty-search").addClass("hidden").removeClass("flex");
  $("#search-list-wrapper").removeClass("hidden").addClass("grid");

  // update specifier
  $("#query-specifier").text(`"${queryString}"`);
  $("#result-qty-specifier").text(`Found ${pagesData.totalItem} results`);

  renderPreviews(queryResults);
}

function renderEmptySearch() {
  $("body").css("overflow", "auto");
  $("#anime-preview-skeleton").addClass("hidden").removeClass("grid");
  $("#search-list-wrapper").addClass("hidden").removeClass("grid");
  $("#empty-search").removeClass("hidden").addClass("flex");
}

function renderPreviews(results) {
  // render the results
  results.forEach((data) => {
    $("#search-list").append(
      `<anime-preview
        data-id="${data.id}"
        image="${data.imageUrl}"
        alt="${data.title}"
        class="h-[600px] sm:h-80 w-full rounded-lg sm:w-56"
       >
        <span
          slot="score"
          class="flex items-center gap-1 text-sm font-medium text-amber-400"
        >
          <i class="fa-solid fa-star"></i>
          ${data.score}
        </span>
        <span
          slot="title"
          class="w-full break-words font-bold text-slate-300"
        >
          ${data.title}
        </span>
        <span slot="rating" class="pb-3 text-sm text-slate-300/90">${data.rating}</span>
      </anime-preview>`
    );
  });
}

function renderSkeleton() {
  $("body").css("overflow", "hidden");
  $("#search-list-wrapper").addClass("hidden").removeClass("grid");
  $("#empty-search").addClass("hidden").removeClass("flex");
  $("#anime-preview-skeleton").removeClass("hidden").addClass("grid");

  $("#search-list").html("");
}

function loadMoreResults() {
  if (pagesData.hasNextPage) {
    const url = `https://api.jikan.moe/v4/anime?q=${query}&page=${
      pagesData.currentpage + 1
    }`;

    $.ajax(url, {
      success: (res) => {
        const { pagination, data: animeData } = res;

        pagesData = formatPageData(pagination);

        const newAnimeData = formatAnimeData(animeData);
        queryResults.push(...newAnimeData);

        renderPreviews(newAnimeData);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // ubah indikator loading konten sesuai kondisi
  $("#more-content-indicator").html(
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
