const inputGuidance: InputGuidance = {
  desktop: [
    {
      text: "Potenssin syöttäminen tapahtuu",
      keyboardKeys: [{ keyboardKey: "^" }],
    },
    {
      text: "avulla.",
    },
    {
      text: "Kokeile painaa",
      keyboardKeys: [
        { keyboardKey: "shift", combiner: "ja sitten" },
        { keyboardKey: "^" },
      ],
    },
    {
      text: ".",
      keyboardKeys: [
        {
          keyboardKey: "^",
        },
      ],
    },
    {
      text: "pitäisi löytyä ylempi näppäin",
      keyboardKeys: [
        {
          keyboardKey: "Enter",
        },
      ],
    },
    { text: "vasemmalla puolella." },
  ],
  mobile: [
    {
      text:
        "Potenssin syöttäminen tapahtuu seuraavasti. Ensin syötä kantaluvuksi haluamasi sisältö esim. '3x'. " +
        "Tämän jälkeen paina ",
      keyboardKeys: [{ keyboardKey: "x⬚" }],
    },
    {
      text: "ja syötä haluamasi eksponentti.",
    },
  ],
}

export default inputGuidance
