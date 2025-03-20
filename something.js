const rows = 3;
const columns = 2;
const smoothOp = new Audio("sounds/music.mp3");

const on = {
  the: {
    chair: "person",
  },
};

const sur = {
  la: {
    time: 0,
    power: 0,
    money: 100,
    demand: 0,
    speedometer: 0,
    powerbalance: 0,
    fossil_fuel: 2000,
    fossilFuelCost: 0,
    timepo_de_dia: 1,
    speedo_de_wind: 20,
    fossil_fuel_plants: [
      { powerOut: 30, fuelConsumption: 1, isOn: true },
      { powerOut: 30, fuelConsumption: 1, isOn: true },
      { powerOut: 30, fuelConsumption: 1, isOn: true },
    ],
    solarPanels: [
      { powerOut: 10, cost: 20, max_durability: 100 },
      { powerOut: 20, cost: 30, max_durability: 200 },
      { powerOut: 40, cost: 40, max_durability: 300 },
    ],
    windTurbines: [
      { powerOut: 10, cost: 27.4, max_durability: 100 },
      { powerOut: 20, cost: 33.33, max_durability: 200 },
      { powerOut: 30, cost: 52.079123141, max_durability: 300 },
    ],
    barely_paid_interns: [
      { levelOfEducation: "12th grader", cost: 20 },
      { levelOfEducation: "8th grader", cost: 13 },
      { levelOfEducation: "5th grader", cost: 7 },
    ],
    names_of_interns: [
      { name: "Lucius", activity: "grab coffee" },
      { name: "Matthew", activity: "looks cool" },
      { name: "Duffy", activity: "deliveryman" },
      { name: "Randy", activity: "gaming" },
    ],
    inventory: {
      solar_panels: [{ powerOut: 10, startTime: 0, maxDurability: 100 }, { powerOut: 10, startTime: 0, maxDurability: 200 }],
      wind_turbina: [{ powerOut: 10, startTime: 0,  maxDurability: 100 }]
    },
    totalPower: 0,
    CHAOS: 0,
  },
};

function nmoop() {
  smoothOp.muted = !smoothOp.muted;
  document.getElementById("mute").innerText = smoothOp.muted ? "🔇" : "🔊";
}

function beepboop(playback) {
  const audio = new Audio("sounds/Boop-sound-effect.mp3");
  audio.playbackRate = playback;
  audio.play();
}

function loadData(jack, sped) {
  const load = JSON.parse(jack);
  if (sped !== undefined) {
    load.la.speedometer = sped;
  }
  Object.assign(sur.la, load.la);
}

function saveData() {
  const save = JSON.stringify(sur);
  return save;
}

function buyFossilFuels(amount) {
  if (amount * sur.la.fossilFuelCost <= sur.la.money) {
    sur.la.money -= amount * sur.la.fossilFuelCost;
    sur.la.fossil_fuel += amount;
  }
}

function getTimeString(time) {
  // year month day hour
  // 1 second irl = 6 minutes ingame
  // 10 seconds irl = 1 hour in game
  const year = 86400;
  const month = 7200;
  const day = 240;
  const hour = 10;

  var curTime = time;

  const curYear = Math.floor(curTime / year);
  curTime = curTime % year;
  const curMonth = Math.floor(curTime / month);
  curTime = curTime % month;
  const curDay = Math.floor(curTime / day);
  curTime = curTime % day;
  const curHour = Math.floor(curTime / hour);

  return (
    "year: " +
    curYear +
    " month: " +
    curMonth +
    " day: " +
    curDay +
    " hour: " +
    curHour +
    " Windo del speedo : " +
    sur.la.speedo_de_wind +
    " centimeters per second"
  );
}

function isDay(time) {
  const day = time % 240;
  return 60 < day && day < 180;
}

document.getElementById("save").addEventListener("click", () => {
  beepboop(0.25);
  const jack = saveData();
  window.location.hash = jack;
  alert("Your data is saved.");
});

// The pixel flinger express
setInterval(function () {
  document.getElementById("time").innerText =
    "time: " + getTimeString(sur.la.time);
  smoothOp.play();
  smoothOp.playbackRate = Math.sqrt(sur.la.speedometer);
  document.getElementById("dolladollabillsyall").innerText =
    "money: " + sur.la.money;
  document.getElementById("itsover9000").innerText =
    "power: " + sur.la.totalPower;
  document.getElementById("acciopower").innerText = "demand: " + sur.la.demand;
  document.getElementById("fossilFuels:]").innerText =
    "fossil fuels: " + sur.la.fossil_fuel;
  document.getElementById("buyFossilFuels").innerText =
    "+1  Cost:" + sur.la.fossilFuelCost;

  const demandometer = document.getElementById("demandometer");
  demandometer.style.zIndex = -1;
  demandometer.style.pointerEvents = "none";

  const bigPauseWord = document.getElementById("speedotronzoomsonicthree");
  if (sur.la.speedometer == 0) {
    bigPauseWord.style.visibility = "visible";
  }
   else {
    bigPauseWord.style.visibility = "hidden";
  }

  if (isDay(sur.la.time)) {
    document.body.style.backgroundColor = "#ffe8ba";
  } else {
    document.body.style.backgroundColor = "#434f63";
  }

  if (sur.la.powerbalance >= 0) {
    let sous_la_hashtag = Array(Math.abs(Math.round(sur.la.powerbalance * 10)))
      .fill("😠")
      .join("");

    demandometer.innerText = sous_la_hashtag;
    demandometer.style.color = "green";
  } else {
    let sous_la_hashtag = Array(Math.abs(Math.round(sur.la.powerbalance * 10)))
      .fill("😡")
      .join("");

    demandometer.innerText = sous_la_hashtag;
    demandometer.style.color = "red";
  }

  for (let i = 0; i < sur.la.solarPanels.length; i++) {
    const td = document.getElementById(`sur_la_table_${i}`);
    td.style.backgroundColor = "lightBlue";
    const solarPanel = sur.la.solarPanels[i];
    td.innerText = `power: ${solarPanel.powerOut} \n cost: ${solarPanel.cost} \n durability: ${solarPanel.max_durability}`;
    if (sur.la.money < solarPanel.cost) {
      td.classList.add("too-expensive");
    } else {
      td.classList.remove("too-expensive");
    }
  }

  // Watchout

  for (let i = 0; i < sur.la.windTurbines.length; i++) {
    const td = document.getElementById(`tabla_de_turbinas_${i}`)
    td.style.backgroundColor = "lightBlue";
    const turbine = sur.la.windTurbines[i];
    td.innerText = `power: ${turbine.powerOut} \n cost: ${turbine.cost} \n durability: ${turbine.max_durability}`;
    if (sur.la.money < turbine.cost) {
      console.log(td.classList)
      td.classList.add("too-expensive");
    } else {
      
      td.classList.remove("too-expensive");
    }
  }

  //Watchout

  for (let i = 0; i < sur.la.fossil_fuel_plants.length; i++) {
    const td = document.getElementById(`soux_la_table_${i}`);
    td.style.backgroundColor = "lightGrey";
    const laPlant = sur.la.fossil_fuel_plants[i];
    if (!laPlant.isOn) {
      td.innerText = "fossil fuel consumption = 0 \n power = 0";
      td.style.backgroundColor = "grey";
    } else {
      td.innerText = `fossil fuel consumption = ${laPlant.fuelConsumption} \n power = ${laPlant.powerOut}`;
      td.style.backgroundColor = "lightGrey";
    }
  }
  const princessDianaElem = document.getElementById("princessDiana");
  princessDianaElem.innerText = "";

  for (solar_panel of sur.la.inventory.solar_panels) {
    const spanElem = document.createElement("span");
    spanElem.className = "thing";
    spanElem.style.width = solar_panel.powerOut + "px";
    spanElem.style.height = solar_panel.powerOut + "px";
    // console.log(100 - (sur.la.time - solar_panel.startTime) / 100 );

    spanElem.style.backgroundColor = `rgba(255, 0, 0, ${(solar_panel.maxDurability - (sur.la.time - solar_panel.startTime)) / 100})`;
    princessDianaElem.appendChild(spanElem);

    if (  (solar_panel.maxDurability - (sur.la.time - solar_panel.startTime)) / 10 < 0.1 ) {
      const index = sur.la.inventory.solar_panels.indexOf(solar_panel);
      if (index > -1) {
        sur.la.inventory.solar_panels.splice(index, 1);
      }
    }
    // if (sur.la.money < solarPanel.cost) {
    //   td.classList.add("too-expensive");
    // } else {
    //   td.classList.remove("too-expensive");
    // }
  }

  const princeShrek = document.getElementById("princeShrek");
  princeShrek.innerText = "";

  for (shrek of sur.la.inventory.wind_turbina) {
    const spanElem = document.createElement("span");
    spanElem.className = "cosa";
    spanElem.style.width = shrek.powerOut + "px";
    spanElem.style.height = shrek.powerOut + "px";


    spanElem.style.backgroundColor = `rgba(0, 0, 255, ${(shrek.maxDurability - (sur.la.time - shrek.startTime)) / 100})`;
    princeShrek.appendChild(spanElem);

    if((shrek.maxDurability - (sur.la.time - shrek.startTime)) / 100 < 0.1) {
      const index2 = sur.la.inventory.wind_turbina.indexOf(shrek);
      if(index2 > -1) {
        sur.la.inventory.wind_turbina.splice(index2, 1);
      }
    }
  }
}, 100);

function checkForRandomEvent(temperature) {
  const randomEvent = Math.random();
  if (randomEvent < temperature) {
    return { do: true, temp: 1 };
  } else {
    return { do: false, temp: temperature + 1.0}; // Set to 1.0 to ensure events always happen for testing and development
  }
}

function doRandomEvent() {
  const eventSelector = Math.random();
  if (eventSelector < 0.2) {
    alert("You have been hit by a hurricane!");
    sur.la.speedo_de_wind = 100;
  } else if (eventSelector < 0.4) {
    alert("You have been hit by a tornado!");
    sur.la.speedo_de_wind = 100;
    sur.la.inventory.wind_turbina.pop();
  } else if (eventSelector < 0.6) {
    alert("The sun has exploded!");
    sur.la.time = 180; // This technically constitutes time travel. Fix later to avoid paradoxes.
    alert("...but will regenerate.");
  } else if (eventSelector < 0.8) {
    alert("Somebody *cough, cough* has declared 700% tariffs on everything!");
    for (panel of sur.la.solarPanels) {
      panel.cost = panel.cost * 8;
      console.log(panel.cost);
    }
    for (turbine of sur.la.windTurbines) { // TODO: This is bugged. It adds the tariff price, but only updates the UI after a click.
      turbine.cost = turbine.cost * 8;
      console.log(panel.cost);
    }
  } else {
    alert("You have been hit by a DOGE!");
    sur.la.inventory.solar_panels = [];
    sur.la.inventory.wind_turbina = [];
    sur.la.money = 0;
  }
}

// Karen, the Manager of States
setInterval(function () {
  if (isDay(sur.la.time)) {
    if (sur.la.timepo_de_dia == 1) {
      sur.la.speedo_de_wind = Math.round(Math.random() * 50);
      sur.la.timepo_de_dia = 0;

      // check if random event should occur
      const randomEvent = checkForRandomEvent(sur.la.CHAOS);
      sur.la.CHAOS = randomEvent.temp;
      console.log(randomEvent.do, sur.la.CHAOS);
      if(randomEvent.do) {
        doRandomEvent(); // THIS SETS SPEEDO DE WIND TO 100
      }
    }
  } else {
    sur.la.timepo_de_dia = 1;
  }

  let surLaDirtyPower = 0;
  let surLaDirtyPowerConsumption = 0;
  for (laPlant of sur.la.fossil_fuel_plants) {
    if (laPlant.isOn) {
      surLaDirtyPower += laPlant.powerOut;
      surLaDirtyPowerConsumption += laPlant.fuelConsumption;
    }
  }
  let surLaCleanPower = 0;
  for (solar_panel of sur.la.inventory.solar_panels) {
    if (isDay(sur.la.time)) {
      surLaCleanPower += solar_panel.powerOut;
    }
  }
  for (windTurbines of sur.la.inventory.wind_turbina) {
    if (sur.la.speedo_de_wind >= 10 && sur.la.speedo_de_wind < 25) {
      surLaCleanPower += windTurbines.powerOut * 0.9;
    } else if (sur.la.speedo_de_wind >= 25 && sur.la.speedo_de_wind < 35) {
      surLaCleanPower += windTurbines.powerOut * 1.2;
    } else if (sur.la.speedo_de_wind >= 35 && sur.la.speedo_de_wind < 45) {
      surLaCleanPower += windTurbines.powerOut * 1.7;
    } else if (sur.la.speedo_de_wind < 48 && sur.la.speedo_de_wind >= 45) {
      surLaCleanPower += windTurbines.powerOut * 2;
    } else if (sur.la.speedo_de_wind > 48) {
      surLaCleanPower += windTurbines.powerOut * 100000;
    }
  }
  sur.la.totalPower = surLaDirtyPower + sur.la.power + surLaCleanPower;
  sur.la.time += sur.la.speedometer;
  sur.la.money += Math.round(
    sur.la.speedometer * (Math.min(sur.la.demand, sur.la.totalPower) / 60)
  );
  sur.la.demand += sur.la.speedometer * 10;
  sur.la.powerbalance =
    (sur.la.totalPower - sur.la.demand) / (sur.la.totalPower + sur.la.demand);
  sur.la.fossil_fuel = Math.max(
    sur.la.fossil_fuel - surLaDirtyPowerConsumption * sur.la.speedometer,
    0
  );
  sur.la.fossilFuelCost += 1 * sur.la.speedometer;
}, 1000);
