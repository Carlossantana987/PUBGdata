import React, { useState, useEffect } from "react";
import Match from "./Match";
import '../CSS/user.scss'


export default function User() {
  const [userName, setUserName] = useState("R360RN");
  // const [matches, setMatches] = useState([]);

 let matches = {
    data: [
      {
        type: "match",
        id: "fc8fbfe2-033e-48a6-af16-9e0641d3ec2d"
    },
    {
        type: "match",
        id: "f0a09ad4-7ab6-4ce5-a4bc-45368f370db5"
    },
    {
        type: "match",
        id: "e1281d1b-b95d-4963-b7df-124ea3d6eb17"
    },
    {
        type: "match",
        id: "b8722c4b-6afe-49a4-98df-12d34257bdef"
    },
    {
        type: "match",
        id: "2635a4bb-00fa-44d3-8d65-90ad0da16ed9"
    },
    {
        type: "match",
        id: "57794893-24a5-487d-9c5f-775979d1fbd8"
    },
    {
        type: "match",
        id: "7e96d028-e490-46c6-a3ce-ed424947429a"
    },
    {
        type: "match",
        id: "e5b4ea79-e0d1-433f-9560-4bf8647e78a1"
    },
    {
        type: "match",
        id: "b6d23cdb-f762-4be2-9f3f-66478acde533"
    },
    {
        type: "match",
        id: "c3a4a61c-8323-420e-8d77-f9cb79d4b077"
    }
    ]
}

  let config = {
    headers: {
      accept: "application/vnd.api+json",
      authorization: process.env.REACT_APP_API_KEY
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
        let array = []
        for(let i=0; i<10; i++){
          array.push(json.data[0].relationships.matches.data[i])
        }
        setMatches(array)
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  });

  return (
    <div>
      <div className="userContainer">
       <Match user={userName} slides={matches} />
       </div>
    </div>
  );
}
