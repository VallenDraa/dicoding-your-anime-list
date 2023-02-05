import $ from "jquery";
import TypeIt from "typeit";

// type it script
$(() => {
  new TypeIt("#highlight-text", {
    loop: true,
    lifeLike: true,
    waitUntilVisible: true,
    speed: 50,
  })
    .type("Otakus")
    .pause(1000)
    .delete(6)
    .pause(100)
    .type("Weaboos")
    .pause(1000)
    .delete(7)
    .pause(100)
    .type("Gigachads")
    .pause(1000)
    .delete(9)
    .go();
});
