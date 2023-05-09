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
      this.#prevKey !== this.#lastKey && console.log(this.#lastKey);
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
}

export default KeyboardHandler;
