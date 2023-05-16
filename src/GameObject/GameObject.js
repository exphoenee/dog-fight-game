import {v4 as uuid} from "uuid";

class GameObject {
  constructor(game, properties) {
    this.game = game;

    this.defaultProperties = {
      type: 0,
      opacity: 1,
      zIndex: 0,
      positionX: 0,
      positionY: 0,
      stateAnim: {},
      speedX: 0,
      speedY: 0,
      state: "idle",

      targetPositionX: this.positionX,
      targetPositionY: this.positionY,

      staggerFrames: this.game.staggerFrames,
      sizeFactor: 1,
    };

    Object.assign(this, {...this.defaultProperties, ...properties});

    this.id = uuid();
    this.name = properties.name;

    this.imageName = properties.imageName;

    this.isLoading = true;
    this.error = false;

    this.image = new Image();
    const loadImage = async () => {
      this.image.src = `./assets/${this.imageName}.png`;
      try {
        await this.image.decode();
        this.game.gameObjects.push(this);
        this.game.loadedGameObjects++;
        this.isLoading = false;
      } catch (e) {
        this.error = true;
        throw new Error(`Error loading image ${this.imageName}`);
      }
    };
    loadImage();

    this.spriteWidthRaw = properties.spriteWidthRaw;
    this.spriteHeightRaw = properties.spriteHeightRaw;

    this.stateNames = Object.keys(this.stateAnim);

    this.frameX = 0;
    this.frameY = 0;
    this.state = this.stateNames[0];

    if (!properties.height && !properties.width) {
      this.width = this.image.naturalWidth;
      this.height = this.image.naturalHeight;
    } else {
      this.width =
        properties.width ??
        properties.height * (this.spriteWidthRaw / this.spriteHeightRaw);
      this.height =
        properties.height ??
        properties.width * (this.spriteHeightRaw / this.spriteWidthRaw);
    }

    this.originalWidth = this.width;
    this.originalHeight = this.height;

    this.mirrored = false;

    this.offsetX = (this.width / 2) * this.sizeFactor;
    this.offsetY = (this.height / 2) * this.sizeFactor;

    this.canCollideWith = [];

    this.stateSelector();
  }

  setCanCollideWith(objectName) {
    if (!Array.isArray(objectName)) objectName = [objectName];
    this.canCollideWith = [...this.canCollideWith, ...objectName];

    console.log(this.canCollideWith);
  }

  setSize(sizeFactor) {
    this.sizeFactor = sizeFactor;
    this.width = this.originalWidth * this.sizeFactor;
    this.height = this.originalHeight * this.sizeFactor;
    this.offsetX = (this.width / 2) * this.sizeFactor;
    this.offsetY = (this.height / 2) * this.sizeFactor;
  }

  checkCollision(b, distanceBuffer = 0) {
    const dx = b.positionX - this.positionX;
    const dy = b.positionY - this.positionY;
    const distance = Math.hypot(dy, dx);
    const sumOfRadii = this.width / 2 + b.width / 2 + distanceBuffer;
    if (distance < sumOfRadii) {
      return {
        position: distance < sumOfRadii,
        distance,
        sumOfRadii,
        dx,
        dy,
        object: this,
      };
    }
  }

  getCollisions = () =>
    this.canCollideWith.reduce((acc, objectName) => {
      const collidedObjects = this.game.gameObjects.filter(
        (gameObject) =>
          gameObject.name === objectName && this.checkCollision(gameObject)
      );
      if (collidedObjects.length) {
        acc[objectName] = collidedObjects;
      }
      return acc;
    }, {});

  setState(state) {
    if (this.stateNames.includes(state)) {
      this.currentState = this.states[state];
      this.currentState.enter();
    } else {
      console.warn(
        `State ${state} does not exist, please use one of these: ${this.stateNames.join(
          ", "
        )}.`
      );
    }
  }

  remove() {
    this.game.gameObjects = this.game.gameObjects.filter(
      (elem) => this.id !== elem.id
    );
  }

  stateSelector() {
    if (this.stateNames.length > 1) {
      const createControl = () => {
        const controls = document.createElement("div");
        controls.id = "controls";
        document.body.appendChild(controls);
        return controls;
      };

      const controls = document.querySelector("#controls") ?? createControl();

      /* Select */
      const inputContainer = document.createElement("div");
      inputContainer.classList.add("input-container");
      inputContainer.setAttribute("draggable", "true");

      controls.appendChild(inputContainer);

      const label = document.createElement("label");
      label.innerText = `${this.name} state:`;
      inputContainer.appendChild(label);

      const selectState = document.createElement("select");
      this.stateNames.forEach((state) => {
        const option = document.createElement("option");
        option.value = state;
        option.innerText = state;
        selectState.appendChild(option);
        selectState.addEventListener("change", (e) => {
          this.setState(e.target.value);
        });
      });
      inputContainer.appendChild(selectState);
    }
  }

  update() {
    throw new Error("Method not implemented.");
    // implemented in child classes
  }

  draw() {
    this.game.canvasHandler.drawGameObject(this);
  }
}

export default GameObject;
