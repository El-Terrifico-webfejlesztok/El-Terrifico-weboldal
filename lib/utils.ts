// Bare witness to the full power of typescript. Ez a funkció 2 tizedesjegyre kerekíti a számot (undorító)
export const round2 = (num: number) =>
    Math.round((num + Number.EPSILON) * 100) / 100