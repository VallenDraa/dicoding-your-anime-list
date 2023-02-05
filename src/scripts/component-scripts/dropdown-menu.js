import $ from "jquery";

$("#dropdown-menu-btn").on("click", () =>
  $("#dropdown-menu").toggleClass("hidden")
);

$(window).on("click", (e) => {
  const toggleBtn = $("#dropdown-menu-btn").get()[0];

  if (e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
    if (!$("#dropdown-menu").hasClass("hidden")) {
      $("#dropdown-menu").addClass("hidden");
    }
  }
});
