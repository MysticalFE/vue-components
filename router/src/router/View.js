export default {
  render(createElement) {
    // console.log(this, "skdadasdh");
    const path = this._self._root._router.history.path;
    const currentComponent = this._self._root._router.routersMap[path];
    // console.log(path);
    return createElement(currentComponent);
  }
};
