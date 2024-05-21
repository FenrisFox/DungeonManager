class HeaderNavbar extends HTMLElement {

  constructor() {
    super();
    this.navbarClass = "header-nav";
    this.navbarLinkClass = "header-nav-link";
    this.pages = [
      { name: "Home", link: "index.html" },
      { name: "Character Creator", link: "pages/character-creator.html" },
      { name: "Mechamorph", link: "pages/mechamorph.html" }
    ];
  }

  connectedCallback() {

    // 
    //Construct the header-navbar HTML template
    //
    this.navbarClass = this.getAttribute('nav-class') || this.navbarClass
    this.navbarLinkClass = this.getAttribute('link-class') || this.navbarLinkClass

    const currentPath = window.location.pathname;
    const basePath = `${
      currentPath.substring(0, currentPath.lastIndexOf('index.html')) || 
      currentPath.substring(0, currentPath.lastIndexOf('pages'))
    }`;

    const navLinks = this.pages.map(({ name, link }) => {
      const fullLink = `${basePath}${link}`;
      return `<a class="${this.navbarLinkClass}" href="${fullLink}">${name}</a>`;
    });

    this.innerHTML = `
      <header>
        <nav class="${this.navbarClass}">
          ${navLinks.join("\n          ")}
        </nav>
      </header>
    `;

    //
    // Add CSS style to the current nav link
    //
    const linkElements = this.querySelectorAll(`.${this.navbarLinkClass}`)
    addEventListener("DOMContentLoaded", (event) => {
      linkElements.forEach(el => {
        el.classList.remove('current-header-nav-link')
        if (el.getAttribute('href') == currentPath) el.classList.add('current-header-nav-link')
      })
    });
  }
}

customElements.define('header-navbar', HeaderNavbar);