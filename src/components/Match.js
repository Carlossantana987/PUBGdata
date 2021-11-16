import React, { useEffect, useState } from "react";

export default function Match(props) {
  const [match, useMatch] = useState("");
  const [date, useDate] = useState("");

  const mapConv = (name) => {
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

  const durationConv = (duration) => {
    let hrs = ~~(duration / 3600);
    let mins = ~~((duration % 3600) / 60);
    let secs = ~~duration % 60;

    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  const dateConv = (date) => {
    var today = new Date();
    var matchDate = new Date(date);
    var diffMs = today - matchDate;
    var diffDays = ~~(diffMs / 86400000);
    var diffHrs = ~~((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    return diffDays + " D , " + diffHrs + " H , " + diffMins + " M ago";
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

        let date = json.data.attributes.createdAt.split("T");
        useDate(date[0]);
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
      <h3>{durationConv(match.duration)}</h3>
      <h1>{dateConv(date)}</h1>
    </div>
  );
}
