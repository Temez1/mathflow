const inputGuidance: InputGuidance = {
  desktop: [
    {
      text: "Ehtojen vastaaminen tapahtuu",
      keyboardKeys: [{ keyboardKey: "≠", combiner: "avulla." }],
    },

    {
      text: "Paina ensin",
      keyboardKeys: [
        { keyboardKey: "!", combiner: "ja sitten" },
        { keyboardKey: "=" },
      ],
    },
    {
      text: "Useamman vastauksen syöttäminen tapahtuu",
      keyboardKeys: [{ keyboardKey: "," }],
    },
    {
      text: "avulla. Esim. x≠3, x=2.",
    },
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
  ],
  mobile: [
    {
      text:
        "Rationaaliyhtälöön ei voi vastata tällä hetkellä kosketusnäppäimistöllä. " +
        "Mikäli haluaisit nähdä tämän toiminnallisuuden, " +
        "lähetä Discordissa viestiä (löytyy painamalla 'jäikö kysyttävää?' alempaa) kehitysideat kanavalle!",
    },
  ],
}

export default inputGuidance
