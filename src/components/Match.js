import React, { useEffect, useState } from "react";

export default function Match(props) {
  const [match, useMatch] = useState("");

  let mapConv = (name) => {
    let maps = {
      Baltic_Main: "Erangel",
      Chimera_Main: "Paramo",
      Desert_Main: "Miramar",
      DihorOtok_Main: "Vikendi",
      Erangel_Main: "Erangel",
      Heaven_Main: "Haven",
      Range_Main: "Camp Jackal",
      Savage_Main: "Sanhok",
      Summerland_Main: "Karakin",
      Tiger_Main: "Taego"
    };
    return maps[name];
  };

  let config = {
    headers: {
      accept: "application/vnd.api+json",
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5NWM2ZWI3MC0yNTU0LTAxM2EtYWM1YS0wM2RjYTczYmVmYjgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjM2NjU5Mzg2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmxpY2lvdXMifQ.YwuOzSZC_gk86xYXv_hb7AymnNADh_jSIkPiS5E8cbQ"
    }
  };

  useEffect(() => {
    const url = "https://api.pubg.com/shards/steam/matches/" + props.id;

    const fetchData = async () => {
      try {
        const res = await fetch(url, config);
        const json = await res.json();
        useMatch(json.data.attributes);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>{mapConv(match.mapName)}</h1>
      <h2>{match.gameMode}</h2>
    </div>
  );
}
