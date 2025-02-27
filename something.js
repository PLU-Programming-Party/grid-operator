const rows = 3;
const columns = 2;
const smoothOp = new Audio('sounds/music.mp3');

const sur = {
  la: {
    time: 0,
    power: 0,
    money: 100,
    demand: 0,
    speedometer: 2,
    powerbalance: 0,
    fossil_fuel: 2000,
    fossilFuelCost: 0,
    fossil_fuel_plants: [
      { powerOut: 30, fuelConsumption: 1, isOn: true },
      { powerOut: 30, fuelConsumption: 1, isOn: true },
      { powerOut: 30, fuelConsumption: 1, isOn: true },
    ],
    solarPanels: [
      { powerOut: 10, cost: 20 },
      { powerOut: 20, cost: 30 },
      { powerOut: 40, cost: 40 },
    ],
    barely_paid_interns: [
      { levelOfEducation: "12th grader", cost: 20},
      { levelOfEducation: "8th grader", cost: 13},
      { levelOfEducation: "5th grader", cost: 7},
    ],
    names_of_interns: [
      { name: "Lucius", activity: "grab coffee"},
      { name: "Matthew", activity: "looks cool"},
      { name: "Duffy", activity: "deliveryman"},
      { name: "Randy", activity: "gaming"},
    ],
    inventory: { solar_panels: [{ powerOut: 10 }] },
    totalPower: 0,
  },
};

function beepboop(playback) {
  const audio = new Audio('sounds/Boop-sound-effect.mp3');
  audio.playbackRate = playback;
  audio.play();
}

function loadData(jack) {
  const load = JSON.parse(jack);
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
  const year = 86400
  const month = 7200
  const day = 240
  const hour = 10

  var curTime = time;

  const curYear = Math.floor(curTime / year)
  curTime = curTime % year
  const curMonth = Math.floor(curTime / month)
  curTime = curTime % month
  const curDay = Math.floor(curTime / day)
  curTime = curTime % day
  const curHour = Math.floor(curTime / hour)
  return "year: " + curYear + " month: " + curMonth + " day: " + curDay + " hour: " + curHour
}

function isDay(time) {
  const day = time % 240
  if (60 < day && day < 180) {
    document.body.style.backgroundColor = "#ffe8ba";
    return true
  } 
  document.body.style.backgroundColor = "#434f63";
  return false
}



document.getElementById("save").addEventListener("click", () => {
  beepboop(0.25);
  const jack = saveData();
  document.getElementById("saveData").value = jack;
});

document.getElementById("load").addEventListener("click", () => {
  beepboop(10.5);
  smoothOp.volume = 0;
  // If you don't wanna save, load ain't working. bravo
  const newData = document.getElementById("saveData").value;
  loadData(newData);
});

// The pixel flinger express
setInterval(function () {
  document.getElementById("time").innerText = "time: " + getTimeString(sur.la.time) + "  isDay?: " + isDay(sur.la.time);
  smoothOp.play();
  smoothOp.playbackRate = sur.la.speedometer;
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

  if (sur.la.powerbalance >= 0) {

    let sous_la_hashtag = Array(Math.abs(Math.round(sur.la.powerbalance * 10)))
    .fill("😠")
    .join("");

    demandometer.innerText = sous_la_hashtag;
    demandometer.style.transform = `rotate(${sur.la.powerbalance * 13}deg)`
    demandometer.style.color = "green";
    demandometer.style.scale = sur.la.powerbalance * 10;

  } else {
    let sous_la_hashtag = Array(Math.abs(Math.round(sur.la.powerbalance * 10)))
    .fill("😡")
    .join("");

    demandometer.innerText = sous_la_hashtag;
    demandometer.style.transform = `rotate(${sur.la.powerbalance * 13}deg)`
    demandometer.style.color = "red";
    demandometer.style.scale = sur.la.powerbalance * 10;
  }

  for (let i = 0; i < sur.la.solarPanels.length; i++) {
    const td = document.getElementById(`sur_la_table_${i}`)
    td.style.backgroundColor = "lightBlue";
    const solarPanel = sur.la.solarPanels[i];
    td.innerText = `power: ${solarPanel.powerOut}  cost: ${solarPanel.cost}`;
  }

  for (let i = 0; i < sur.la.fossil_fuel_plants.length; i++) {
    const td = document.getElementById(`soux_la_table_${i}`);
    td.style.backgroundColor = "lightGrey";
    const laPlant = sur.la.fossil_fuel_plants[i];
    if (!laPlant.isOn) {
      td.innerText = "fossil fuel consumption = 0 power = 0";
      td.style.backgroundColor = "grey";
    } else {
      td.innerText = `fossil fuel consumption = ${laPlant.fuelConsumption} power = ${laPlant.powerOut}`;
      td.style.backgroundColor = "lightGrey";
    }
  }
  const princessDianaElem = document.getElementById("princessDiana");
  princessDianaElem.innerText = "";

  for (solar_panel of sur.la.inventory.solar_panels) {
    const spanElem = document.createElement("span");
    spanElem.className = "thing";
    spanElem.style.width = solar_panel.powerOut;
    spanElem.style.height = solar_panel.powerOut;
    princessDianaElem.appendChild(spanElem);
  }
}, 100);

setInterval(function () {
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
    surLaCleanPower += solar_panel.powerOut;
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
  sur.la.fossilFuelCost += 1;
}, 1000);



