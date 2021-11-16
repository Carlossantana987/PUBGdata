import React, { useState, useEffect } from "react";
import Match from "./Match";
import "../CSS/user.scss";

export default function User() {
  const [userName, setUserName] = useState("");
  const [matches, setMatches] = useState([]);

  let config = {
    headers: {
      accept: "application/vnd.api+json",
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5NWM2ZWI3MC0yNTU0LTAxM2EtYWM1YS0wM2RjYTczYmVmYjgiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNjM2NjU5Mzg2LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InB1YmxpY2lvdXMifQ.YwuOzSZC_gk86xYXv_hb7AymnNADh_jSIkPiS5E8cbQ"
    }
  };

  useEffect(() => {
    const url =
      "https://api.pubg.com/shards/steam/players?filter[playerNames]=R360RN";

    const fetchData = async () => {
      try {
        const res = await fetch(url, config);
        const json = await res.json();
        setUserName(json.data[0].attributes.name);
        // setMatches(json.data.matches.data);
        setMatches(Object.values(json.data[0].relationships.matches.data));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="userContainer">
      <h1>{userName}</h1>
      <ul>
        {Object.values(matches).map((i) => (
          <li key={i.id}>
            <Match config={config} id={i.id} type={i.type} />
          </li>
        ))}
      </ul>
    </div>
  );
}
