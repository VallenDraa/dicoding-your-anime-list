import $ from "jquery";

// search bar code
$("#search-bar").on("input", (e) => {
  const query = e.target.value;

  searchBtnHrefChanger(query);
});

// search button href changer
export default function searchBtnHrefChanger(query) {
  query === "" || !query
    ? $("#search-button").attr("href", window.location.hash)
    : $("#search-button").attr("href", `#search`);
}
