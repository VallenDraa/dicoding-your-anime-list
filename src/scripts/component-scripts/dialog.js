import $ from "jquery";
import { queryResults } from "../page-scripts/search.page";

const dialog = $("#anime-detail-dialog").get()[0];
const closeDialogBtn = $("#close-dialog").get()[0];

$(document).on("click", (e) => {
  const targetTag = e.target.tagName.toLowerCase();

  if (targetTag === "anime-preview") {
    const id = parseInt(e.target.getAttribute("data-id"));
    const animeData = queryResults.find((data) => data.id === id);

    // matikan scroll pada body
    $("body").css("overflow", "hidden");

    // masukan data ke dalam dialog
    $("#detail-title").text(animeData.title);
    $("#detail-score").html(
      `<i class="fa-solid fa-star"></i> ${animeData.score}`
    );
    $("#detail-type").text(animeData.animeType);
    $("#detail-episodes").text(animeData.episodes);
    $("#detail-status").text(animeData.status);
    $("#detail-aired").text(new Date(animeData.aired).toLocaleDateString());
    $("#detail-genres").text(animeData.genres.join(", "));
    $("#detail-image").attr("src", animeData.imageUrl);

    if (animeData.synopsis) {
      $("#detail-synopsis-wrapper").removeClass("hidden").addClass("flex");
      $("#detail-synopsis").text(animeData.synopsis);
    } else {
      $("#detail-synopsis-wrapper").addClass("hidden").removeClass("flex");
    }

    // trailer
    if (animeData.youtubeUrl) {
      $("#detail-trailer-wrapper").removeClass("hidden").addClass("flex");
      $("#detail-trailer").attr("src", animeData.youtubeUrl);
    } else {
      $("#detail-trailer-wrapper").addClass("hidden").removeClass("flex");
    }

    dialog.showModal();
    dialog.scrollTo(0, 0);
  }

  if (e.target === closeDialogBtn || closeDialogBtn.contains(e.target)) {
    $("body").css("overflow", "auto");
    dialog.close();
  }
});
