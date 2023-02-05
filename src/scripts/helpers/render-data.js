import $ from "jquery";

export function renderAnimeList({ listWrapperId, emptyId, listId }) {
  $("#search-list").html("");

  $("body").css("overflow", "auto");
  $("#anime-preview-skeleton").addClass("hidden").removeClass("grid");
  $(emptyId).addClass("hidden").removeClass("flex");
  $(listWrapperId).removeClass("hidden").addClass("grid");
}

export function renderEmptyList({ listWrapperId, emptyId }) {
  $("body").css("overflow", "auto");
  $("#anime-preview-skeleton").addClass("hidden").removeClass("grid");
  $(listWrapperId).addClass("hidden").removeClass("grid");
  $(emptyId).removeClass("hidden").addClass("flex");
}

export function renderPreviews({ listId, animeData }) {
  animeData.forEach((data) => {
    $(listId).append(
      `<anime-preview
        data-preview-id="${data.id}"
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

export function renderSkeleton({ listWrapperId, listId, emptyId }) {
  $("body").css("overflow", "hidden");
  $(listWrapperId).addClass("hidden").removeClass("grid");
  $(emptyId).addClass("hidden").removeClass("flex");
  $("#anime-preview-skeleton").removeClass("hidden").addClass("grid");

  $(listId).html("");
}
