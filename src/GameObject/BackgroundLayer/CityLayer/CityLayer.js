import BackgroundLayer from "../BackgroundLayer.js";

class CityLayer extends BackgroundLayer {
  constructor(game, {imageName, speedModifier, name}) {
    super(game, {imageName, name});
  }
}

export default CityLayer;
