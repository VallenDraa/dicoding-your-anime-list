import $ from "jquery";
import { queryResults } from "../page-scripts/search-page.js";
import { btnStyle, isSaved, savedAnimes } from "../helpers/saved-anime.js";

import { AnimeData } from "../helpers/types.js";

const dialog = $("#anime-detail-dialog").get()[0];
const closeDialogBtn = $("#close-dialog").get()[0];

// untuk membuka dan mentutup dialog
$(document).on("click", (e) => {
  const targetTag = e.target.tagName.toLowerCase();

  if (targetTag === "anime-preview") {
    const id = $(e.target).attr("data-preview-id");
    let animeData = {};

    if (window.location.hash === "#search") {
      animeData = queryResults.find((data) => data.id === id);
    } else {
      animeData = savedAnimes.find((data) => data.id === id);
    }

    document.querySelector("body").style.overflow = "hidden";

    setDialogData(animeData);

    openDialog();
  }

  if (e.target === closeDialogBtn || closeDialogBtn.contains(e.target)) {
    closeDialog();
  }
});

// setiap key escape ditekan akan menutup dialog
$(document).on("keyup", (e) => {
  if (e.key === "Escape") closeDialog();
});

// helpers
/** @param {AnimeData} animeData */
function setDialogData(animeData) {
  const animeIsSaved = isSaved(animeData.id);

  // straight forward data
  $("#detail-title").text(animeData.title);
  $("#detail-score").html(
    `<i class="fa-solid fa-star"></i> ${animeData.score}`,
  );
  $("#detail-type").text(animeData.animeType);
  $("#detail-episodes").text(animeData.episodes);
  $("#detail-status").text(animeData.status);
  $("#detail-aired").text(new Date(animeData.aired).toLocaleDateString());

  $("#detail-image").attr("src", animeData.imageUrl);

  // Not so straight forward data
  // synopsis
  if (animeData.synopsis) {
    $("#detail-synopsis-wrapper").removeClass("hidden").addClass("flex");
    $("#detail-synopsis").text(animeData.synopsis);
  } else {
    $("#detail-synopsis-wrapper").addClass("hidden").removeClass("flex");
  }

  // genres
  if (animeData.genres.length > 0) {
    $("#detail-genres-wrapper").removeClass("hidden");

    $("#detail-genres").html("");

    for (const genre of animeData.genres) {
      $("#detail-genres").append(`
      <li class="inline rounded-full px-2.5 py-0.5 text-xs font-medium bg-slate-600 text-slate-300">
      ${genre}
      </li>   
      `);
    }
  } else {
    $("#detail-genres-wrapper").addClass("hidden");
  }

  // trailer
  if (animeData.youtubeUrl) {
    $("#detail-trailer-wrapper").removeClass("hidden").addClass("flex");
    $("#detail-trailer").attr("src", animeData.youtubeUrl);
  } else {
    $("#detail-trailer-wrapper").addClass("hidden").removeClass("flex");
    $("#detail-trailer").removeAttr("src");
  }

  // save button
  const { content, classList } = btnStyle(animeIsSaved);

  $("#detail-save-btn")
    .attr("data-save-id", animeData.id)
    .attr("class", classList)
    .html(content);
}

export function openDialog() {
  dialog.showModal();
  dialog.scrollTo(0, 0);
}

export function closeDialog() {
  $("#detail-trailer").removeAttr("src");
  document.querySelector("body").style.overflow = "auto";
  dialog.close();
}
