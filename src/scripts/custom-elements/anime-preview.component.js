const template = document.createElement("template");
template.innerHTML = `
  <style>
    * {
      box-sizing: border-box;
    }

    :host {
      cursor: pointer;
      display: block;
      overflow: clip;
      position: relative;
    }

    div {
      position: relative;
      padding: 10px;
      z-index: 10; 
      background-color: rgba(0, 0, 0, 0.6); 
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 5px;
      height: 100%;
      transition-property: color, background-color;
      transition-timing-function: ease-out;
      transition-duration: 150ms;
    }

    div:hover {
      background-color: rgba(0, 0, 0, 0.4); 
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;      
      object-fit: cover;
    }
  </style>

  <img />
  <div>
    <span data-score>
      <slot name="score"></slot>
    </span>
    <span data-title>
      <slot name="title"></slot>
    </span>
    <span data-rating>
      <slot name="rating"></slot>
    </span>
  </div>
`;

class AnimePreview extends HTMLElement {
  static #attr = ["image", "alt"];

  #shadowRoot;
  #imageTag;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: "open" });

    // get attributes
    AnimePreview.#attr.forEach((name) => {
      this[name] = this.getAttribute(name);
    });

    this.#shadowRoot.append(template.content.cloneNode(true));

    this.#imageTag = this.#shadowRoot.querySelector("img");
    this.changeImageSrc(this["image"] || "", this["alt"] || "");
  }

  static get observedAttributes() {
    return this.#attr;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;

    this.changeImageSrc(this["image"], this["alt"]);
  }

  changeImageSrc(src, alt) {
    if (src) this.#imageTag.setAttribute("src", src);
    if (alt) this.#imageTag.setAttribute("alt", alt);
  }
}

customElements.define("anime-preview", AnimePreview);
