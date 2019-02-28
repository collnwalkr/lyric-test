import omitBy from "lodash/omitBy"
import isNil from "lodash/isNil"

const defaultPalette = {
  darkMuted: "#333",
  lightMuted: "#DDD",
  darkVibrant: "#222",
  vibrant: "#FFF",
  lightVibrant: "#FFA"
}

const getPalette = palette => ({
  ...defaultPalette,
  ...omitBy(palette, isNil)
})

export { getPalette, defaultPalette }
