export class HashHistory {
  constructor() {
    this.path = null;
    this.updateListener();
  }
  updateListener() {
    if (!location.hash) location.hash = "/";
    window.addEventListener("load", () => {
      this.path = location.hash.slice(1);
    });
    window.addEventListener("hashchange", () => {
      this.path = location.hash.slice(1);
    });
  }
  push() {}
  go() {}
  replace() {}
}
