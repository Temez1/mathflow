const inputGuidance: InputGuidance = {
  desktop: [
    {
      text: "Aloita murtolauseke syöttämällä ensin",
      keyboardKeys: [{ keyboardKey: "/" }],
    },
    {
      text: "Kokeile painaa",
      keyboardKeys: [
        { keyboardKey: "shift", combiner: "ja sitten" },
        { keyboardKey: "7", combiner: "." },
        { keyboardKey: "±" },
      ],
    },
    {
      text: "syöttäminen tapahtuu painamalla ensin",
      keyboardKeys: [
        { keyboardKey: "+", combiner: "ja sitten" },
        { keyboardKey: "-", combiner: "." },
      ],
    },
    {
      text: "Neliöjuuren syöttäminen tapahtuu kirjoittamalla",
      keyboardKeys: [{ keyboardKey: "sqrt" }],
    },
    {
      text: "Useamman vastauksen syöttäminen tapahtuu",
      keyboardKeys: [{ keyboardKey: "," }],
    },
    {
      text: "avulla.",
    },
  ],
  mobile: [
    {
      text: "",
      keyboardKeys: [
        {
          keyboardKey: "±",
          combiner: "syöttäminen tapahtuu pitämällä pohjassa",
        },
        { keyboardKey: "+", combiner: "ja avautuvasta valikosta päästä irti" },
        { keyboardKey: "±", combiner: "kohdalla." },
      ],
    },
    {
      text: "Useamman vastauksen syöttäminen tapahtuu",
      keyboardKeys: [{ keyboardKey: "," }],
    },
    {
      text: "avulla. Syöttääksesi pilkun pidä pohjassa",
      keyboardKeys: [
        { keyboardKey: ".", combiner: "ja avautuvasta valikosta päästä irti" },
        { keyboardKey: ",", combiner: "kohdalla." },
      ],
    },
  ],
}

export default inputGuidance
