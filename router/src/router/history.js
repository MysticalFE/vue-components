export class HTML5History {
  constructor() {
    this.path = null;
  }
  updateListener() {
    // let historyPath = location.pathname;
    if (!location.pathname) location.pathname = "/";
    // this.addEvent("load", location.pathname);
    // this.addEvent("popstate", location.pathname);
    window.addEventListener("load", () => {
      this.path = location.pathname;
    });
    window.addEventListener("popstate", () => {
      this.path = location.pathname;
    });
  }
  push() {}
  go() {}
  replace() {}
}
