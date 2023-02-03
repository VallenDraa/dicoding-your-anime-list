import $ from "jquery";
import searchBtnHrefChanger from "./search-bar";

const pagesId = ["#home", "#search", "#favorite", "#404"];

// melakukan checking terhadap id sebelum merender halaman
const pageActivator = async (targetId) => {
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
};

// initial load
$(window).on("load", () => pageActivator(window.location.hash));

// akan dieksekusi setiap ada pergantian url
window.onpopstate = (e) => {
  const { hash: id } = window.location;

  pageActivator(id);
};
