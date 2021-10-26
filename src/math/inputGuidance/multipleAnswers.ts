const inputGuidance: InputGuidance = {
  desktop: [
    {
      text: "Useamman vastauksen syöttäminen tapahtuu",
      keyboardKeys: [{ keyboardKey: "," }],
    },
    {
      text:
        "avulla. Erottele siis jokainen vastauksesi pilkulla. " +
        "Esim. x=3, y=3",
    },
  ],
  mobile: [
    {
      text: "Useamman vastauksen syöttäminen tapahtuu",
      keyboardKeys: [{ keyboardKey: "," }],
    },
    {
      text: "avulla. Syöttääksesi pilkun pidä pohjassa",
      keyboardKeys: [
        { keyboardKey: ".", combiner: "ja avautuvasta valikosta päästä irti" },
        { keyboardKey: "," },
      ],
    },
    {
      text: "kohdalla.",
      keyboardKeys: [
        {
          keyboardKey: "y",
          combiner: "syöttäminen tapahtuu pitämällä pohjassa",
        },
        { keyboardKey: "x", combiner: "ja avautuvasta valikosta päästä irti" },
        { keyboardKey: "y" },
      ],
    },
    {
      text: "kohdalla.",
    },
  ],
}

export default inputGuidance
