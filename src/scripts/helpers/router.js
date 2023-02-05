import $ from "jquery";
import searchBtnHrefChanger from "../component-scripts/search-bar";

import searchPage from "../page-scripts/search.page.js";
import savedPage from "../page-scripts/saved.page.js";

const pagesId = ["#home", "#search", "#saved", "#404"];

// initial load
$(window).on("load", () => {
  const hash = window.location.hash;

  if (hash === "#search" || !hash) history.pushState(null, null, "#home");

  pageActivator(window.location.hash);
});

// akan dieksekusi setiap ada pergantian url
$(window).on("popstate", () => {
  const { hash: id } = window.location;

  pageActivator(id);
});

// melakukan checking terhadap id sebelum merender halaman
function pageActivator(targetId) {
  const idIsValid = pagesId.includes(targetId);
  const pageTarget = idIsValid ? targetId : "#404";

  // mengaktifkan halaman
  $(pageTarget).removeClass("hidden");

  // mengganti url pada search button
  searchBtnHrefChanger($("#search-bar").val());

  // matikan semua halaman yang idnya beda
  pagesId.forEach((pageId) => {
    if (pageId !== pageTarget) $(pageId).addClass("hidden");
  });

  if (idIsValid) pageScriptLoader(targetId);
}

// akan menjalankan script halaman sesuai dengan id pada parameter
function pageScriptLoader(targetId) {
  switch (targetId) {
    case "#search":
      searchPage();
      break;

    case "#saved":
      savedPage();
      break;
  }
}
