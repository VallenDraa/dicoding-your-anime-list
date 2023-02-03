import $ from "jquery";
import searchBtnHrefChanger from "./search-bar";

import searchPage from "./page-scripts/search.page.js";
import favoritePage from "./page-scripts/favorite.page.js";

const pagesId = ["#home", "#search", "#favorite", "#404"];

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

  if (idIsValid) pageScriptLoader();
}

// akan menjalankan script halaman sesuai dengan id pada parameter
function pageScriptLoader(targetId) {
  switch (targetId) {
    case "#search":
      searchPage();
      break;

    case "#favorite":
      favoritePage();
      break;
  }
}

// initial load
$(window).on("load", () => pageActivator(window.location.hash));

// akan dieksekusi setiap ada pergantian url
window.onpopstate = (e) => {
  const { hash: id } = window.location;

  pageActivator(id);
};
