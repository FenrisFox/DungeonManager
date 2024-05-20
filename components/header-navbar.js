class HeaderNavbar extends HTMLElement {

  constructor() {
    super();
    this.navbarClass = "header-nav";
    this.linkClass = "header-nav-link";
    this.pages = [
      { name: "Home", link: "index.html" },
      { name: "Character Creator", link: "pages/character-creator.html" },
      { name: "Mechamorph", link: "pages/mechamorph.html" }
    ];
  }

  connectedCallback() {
    this.navbarClass = this.getAttribute('nav-class') || this.navbarClass
    this.linkClass = this.getAttribute('link-class') || this.linkClass

    const currentPath = window.location.pathname;
    const basePath = `${currentPath.substring(0, currentPath.lastIndexOf('pages')  || currentPath.length-10)}`;

    const navLinks = this.pages.map(({ name, link }) => {
      const fullLink = `${basePath}${link}`;
      return `<a class="${this.linkClass}" href="${fullLink}">${name}</a>`;
    });

    this.innerHTML = `
      <header>
        <nav class="${this.navbarClass}">
          ${navLinks.join("\n          ")}
        </nav>
      </header>
    `;
  }
}

customElements.define('header-navbar', HeaderNavbar);