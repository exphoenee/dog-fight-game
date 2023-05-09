// import {
//   sitting,
//   walkLeft,
//   walkRight,
//   idle,
//   jump,
//   fall,
//   run,
//   dizzy,
//   roll,
//   bite,
//   ko,
//   getHit,
// } from "../GameObject/Player/PlayerStates";

class KeyboardHandler {
  #keys = new Set();
  #lastKey = "";
  #prevKey = "";
  #keyMap = {
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    " ": "SPACE",
    d: "D",
  };

  constructor() {
    [
      {event: "keydown", action: "PRESSED"},
      {event: "keyup", action: "RELEASED"},
    ].forEach(({event, action}) =>
      window.addEventListener(event, (e) => this.handleKey(e, action)),
    );
  }

  handleKey(e, action) {
    const validKey = this.#keyMap[e.key] ?? this.#keyMap[e.key.toUpperCase()];
    if (validKey) {
      this.#prevKey = this.#lastKey;
      this.#lastKey = validKey ? `${validKey}_${action}` : this.#lastKey;
      if (action === "PRESSED") this.#keys.add(validKey);
      if (action === "RELEASED") this.#keys.delete(validKey);
    }
  }

  get keys() {
    return this.#keys;
  }

  get lastKey() {
    return this.#lastKey;
  }

  get keyMap() {
    return this.#keyMap;
  }
}

export default KeyboardHandler;
