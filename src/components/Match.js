import React, { useEffect, useState } from "react";
import "../CSS/user.scss"

export default function Match(props) {
  const [current, setCurrent] = useState(0);
  const [match, setMatch] = useState("");
  const [date, setDate] = useState("");
  const [stats, setStats] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const length = props.slides.data.length;

  const nextSlide =  () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  }

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
      authorization:process.env.REACT_APP_API_KEY
    }
  };

  

  useEffect(() => {
    const url = "https://api.pubg.com/shards/steam/matches/" + props.slides.data[current].id;

    // const statFind = (name) => {
    //   for(let i=0; i<match.included.length; i++){
    //     if(name === match.included[i].attributes.stats.name){
    //     setStats(match.included[i].attributes.stats);
    //     }
    //   }
    //  }

    const fetchData = async () => {
      try {
        const res = await fetch(url,config);
        const json = await res.json();
        setMatch(json);
        let date = json.data.attributes.createdAt.split("T");
        setDate(date[0]);
        setisLoading(false);
      } catch (error) {
        console.log(error.message);    
      }
    }

    fetchData();
    
  },[]);

  

  
// console.log(current)
console.log(match)

  return (
    <div className="wrapper">

    <div className={`overviewInfo  ${!isLoading ? match.data.attributes.mapName : <div>Loading</div>} `}>
    <h1 className='userName'>{props.user}</h1>
    <h1 className={'count'}>{current+1}/10</h1>

    <div className="actions">
      <div className="backbutton">
  
      </div>
      
    </div>
    
    
    <div className="productinfo">
    
      <div className="grouptext">
         
         <p>Map</p>
         <h3>{!isLoading ? mapConv(match.data.attributes.mapName) : '    '}</h3>
         
      </div>
      <div className="grouptext">
         
         <p>Mode</p>
         <h3>{!isLoading ? match.data.attributes.gameMode : '     '}</h3>
         

      </div>
      <div className="grouptext">

         <p>Match Time</p>
         <h3>{!isLoading ? durationConv(match.data.attributes.duration) : '     '}</h3>
         

      </div>
      <div className="grouptext">

         <p>Time Since Played</p>
         <h3>{dateConv(date)}</h3>

      </div>
  </div>

    <button onClick={prevSlide}>PREV</button>
    <button onClick={nextSlide}>NEXT</button>
    </div>
    <div className="productSpecifications">
    <h1> Match Details </h1>
    
    <div className="productFeatures">
      <div className="feature">
        <div className="featureIcon kills">
        </div>
        <div className="featureText">
          <p>Kills</p>
        </div>
      </div>
      <div className="feature">
        <div className="featureIcon">
        </div>
         <div className="featureText">
          <p>Win Placement</p>
        </div>
       </div>
      <div className="feature">
        <div className="featureIcon">
        </div>
         <div className="featureText">
          <p>Assists</p>
        </div>
        </div>
      <div className="feature">
        <div className="featureIcon">
        </div>
         <div className="featureText">
          <p>Damage Dealt</p>
        </div>
      </div>
    </div>
    
  </div>
    </div>
  );
}
