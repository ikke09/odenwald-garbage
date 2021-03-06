const cityDistricts = {
  "Bad-König": [
    "Kernstadt",
    "Etzen-Gesäß",
    "Fürstengrund",
    "Gumpersberg",
    "Kimbach",
    "Momart",
    "Nieder-Kinzig",
    "Ober-Kinzig",
    "Zell"
  ],
  "Brensbach": [
    "Kerngemeinde",
    "Affhöllerbach",
    "Bierbach",
    "Höllerbach",
    "Kilsbach",
    "Mummenroth",
    "Nieder-Kainsbach",
    "Stierbach",
    "Wallbach",
    "Wersau"
  ],
  "Breuberg": ["Hainstadt", "Mühlhausen", "Neustadt", "Rai-Breitenbach", "Rosenbach", "Wald-Amorbach", "Sandbach"],
  "Brombachtal": ["Birkert", "Böllstein", "Hembach", "Herrenwäldchen", "Kirchbrombach", "Langenbrombach"],
  "Erbach": [
    "Kernstadt",
    "Bullau",
    "Dorf-Erbach",
    "Ebersberg",
    "Elsbach",
    "Erbuch",
    "Erlenbach",
    "Ernsbach",
    "Eutergrund",
    "Günterfürst",
    "Haisterbach",
    "Lauerbach",
    "Rossbach",
    "Schönnen"
  ],
  "Fränkisch-Crumbach": ["Fränkisch-Crumbach"],
  "Höchst": [
    "Kerngemeinde",
    "Annelsbach",
    "Dusenbach",
    "Forstel",
    "Hassenroth",
    "Hetschbach",
    "Hummetroth",
    "Mümling-Grumbach",
    "Pfirschbach"
  ],
  "Lützelbach": ["Kerngemeinde", "Breitenbrunn", "Haingrund", "Seckmauern", "Rimhorn"],
  "Michelstadt": [
    "Kernstadt",
    "Asselbrunn",
    "Rehbach",
    "Steinbach",
    "Steinbuch",
    "Stockheim",
    "Vielbrunn",
    "Weiten-Gesäß",
    "Würzberg"
  ],
  "Mossautal": ["Güttersbach", "Hiltersklingen", "Hüttenthal", "Ober-Mossau", "Unter-Mossau"],
  "Oberzent": [
    "Airlenbach",
    "Beerfelden",
    "Etzean",
    "Falken-Gesäß",
    "Finkenbach",
    "Gammelsbach",
    "Hebstahl",
    "Hesselbach",
    "Hetzbach",
    "Hinterbach",
    "Kailbach",
    "Kortelshütte",
    "Ober-Hainbrunn",
    "Ober-Sensbach",
    "Olfen",
    "Raubach",
    "Rothenberg",
    "Schöllenbach",
    "Unter-Sensbach"
  ],
  "Reichelsheim": [
    "Kerngemeinde",
    "Beerfurth",
    "Bockenrod",
    "Eberbach",
    "Erzbach",
    "Frohnhofen",
    "Gersprenz",
    "Gumpen",
    "Hutzwiese",
    "Klein-Gumpen",
    "Laudenau",
    "Ober-Kainsbach",
    "Ober-Ostern",
    "Rodenstein",
    "Rohrbach",
    "Spreng",
    "Unter-Ostern",
    "Vierstöck"
  ]
};

exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cityDistricts),
  };
};
