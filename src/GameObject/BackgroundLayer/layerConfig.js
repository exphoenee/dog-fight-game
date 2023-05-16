import CityLayer from "./CityLayer/CityLayer";
import cityProperties from "./CityLayer/cityLayerProperties";
import ForestLayer from "./ForestLayer/ForestLayer";
import forestProperties from "./ForestLayer/forestLayerProperties";

const layerConfig = {
  forest: {
    properties: forestProperties,
    Layer: ForestLayer,
  },
  city: {
    properties: cityProperties,
    Layer: CityLayer,
  },
};

export default layerConfig;
