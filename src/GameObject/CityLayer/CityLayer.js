import BackgroundLayer from "../GameObject.js";

class CityLayer extends BackgroundLayer {
  constructor(game, {imageName, speedModifier, name}) {
    super(game, {imageName, name});
  }
}

export default CityLayer;
