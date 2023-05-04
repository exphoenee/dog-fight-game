class KeyboardHandler {
  constructor() {
    this.actions = {press: {}, release: {}};
    this.pressedKeys = {};
    this.lastPressTime = 0;

    this.keyDownAction();
    this.keyUpAction();
  }

  addPressAction(name, key, cb) {
    console.log(name, key, cb);
    this.actions.press[name] = () => this.pressedKeys[key]?.down && cb();
  }

  addReleaseAction(name, key, cb) {
    this.actions.release[key] = cb;
  }

  removeAction(key) {
    delete this.actions.press[key];
    delete this.actions.release[key];
  }

  keyDownAction() {
    window.addEventListener("keydown", (e) => {
      const time = Date.now();
      this.pressedKeys[e.key] = {down: true, up: false, last: time};
      this.lastPressTime = time;
    });
  }

  keyUpAction() {
    window.addEventListener("keyup", (e) => {
      const time = Date.now();
      this.pressedKeys[e.key] = {down: false, up: true, last: time};
      this.lastPressTime = time;
    });
  }
}

export default KeyboardHandler;
