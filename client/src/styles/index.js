import omitBy from "lodash/omitBy"
import isNil from "lodash/isNil"
import facepaint from "facepaint"

const mq = facepaint([
  "@media(min-width: 600px)",
  "@media(min-width: 900px)",
  "@media(min-width: 1180px)"
])

const defaultPalette = {
  darkMuted: "#191919",
  lightMuted: "#DDD",
  darkVibrant: "#222",
  vibrant: "#FFF",
  lightVibrant: "#FFA"
}

const getPalette = palette => ({
  ...defaultPalette,
  ...omitBy(palette, isNil)
})

export { getPalette, defaultPalette, mq }
