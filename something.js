const rows = 3;
const columns = 2;

const sur = {
    la: {
        time: 0,
        power: 0,
        money: 100,
        demand: 0,
        speedometer: 2,
        powerbalance: 0,
        fossil_fuel: 2000,
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
        totalPower: 0
    }
}

function loadData (jack) {
    const load = JSON.parse(jack)
    Object.assign(sur.la, load.la)
}

function saveData () {
    const save = JSON.stringify(sur)
    return save
}

document.getElementById("save").addEventListener("click", ()=>{
    const jack = saveData()
    document.getElementById("saveData").value = jack
})

document.getElementById("load").addEventListener("click", ()=>{
    const newData = document.getElementById("saveData").value
    loadData(newData)
})

setInterval(function () {
  document.getElementById("time").innerText = "time: " + sur.la.time;
  document.getElementById("dolladollabillsyall").innerText =
    "money: " + sur.la.money;
  document.getElementById("itsover9000").innerText =
    "power: " + sur.la.totalPower;
  document.getElementById("acciopower").innerText =
    "demand: " + sur.la.demand;
  document.getElementById("fossilFuels:]").innerText =
    "fossil fuels: " + sur.la.fossil_fuel;
  let sous_la_hashtag = Array(Math.abs(Math.round(sur.la.powerbalance * 10)))
    .fill("#")
    .join("");
  const demandometer = document.getElementById("demandometer");
  if (sur.la.powerbalance >= 0) {
    demandometer.innerText = "|" + sous_la_hashtag;
    demandometer.style.color = "green";
  } else {
    demandometer.innerText = sous_la_hashtag + "|";
    demandometer.style.color = "red";
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
  sur.la.totalPower = surLaDirtyPower + sur.la.power;
  sur.la.time += sur.la.speedometer;
  sur.la.money += Math.round(
    sur.la.speedometer *
      (Math.min(sur.la.demand, sur.la.totalPower) / 60)
  );
  sur.la.demand += sur.la.speedometer * 10;
  sur.la.powerbalance =
    (sur.la.totalPower - sur.la.demand) /
    (sur.la.totalPower + sur.la.demand);
  sur.la.fossil_fuel = Math.max(
    sur.la.fossil_fuel - surLaDirtyPowerConsumption * sur.la.speedometer,
    0
  );
}, 1000);

const sur_la_table = document.createElement("table");

const solar_tr = document.createElement("tr");
sur_la_table.appendChild(solar_tr);
for (let i = 0; i < sur.la.solarPanels.length; i++) {
  const solarPanel = sur.la.solarPanels[i];
  const td = document.createElement("td");
  td.style.backgroundColor = "lightBlue";
  td.innerText = `power: ${solarPanel.powerOut}  cost: ${solarPanel.cost}`;
  td.onclick = function () {
    if (sur.la.money >= solarPanel.cost) {
      sur.la.money = sur.la.money - solarPanel.cost;
      sur.la.power = sur.la.power + solarPanel.powerOut;
      solarPanel.cost = Math.round(solarPanel.cost * 1.05);
      td.innerText = `power: ${solarPanel.powerOut}  cost: ${solarPanel.cost}`;
    }
  };
  solar_tr.appendChild(td);
}

const soux_la_table = document.createElement("table");
const tr = document.createElement("tr");
soux_la_table.appendChild(tr);
for (let i = 0; i < sur.la.fossil_fuel_plants.length; i++) {
  const laPlant = sur.la.fossil_fuel_plants[i];
  const td = document.createElement("td");
  td.style.backgroundColor = "lightGrey";
  td.innerText = `fossil fuel consumption = ${laPlant.fuelConsumption} power = ${laPlant.powerOut}`;
  td.onclick = function () {
    if (laPlant.isOn) {
      td.innerText = "fossil fuel consumption = 0 power = 0";
      td.style.backgroundColor = "grey";
    } else {
      td.innerText = `fossil fuel consumption = ${laPlant.fuelConsumption} power = ${laPlant.powerOut}`;
      td.style.backgroundColor = "lightGrey";
    }
    laPlant.isOn = !laPlant.isOn;
  };
  tr.appendChild(td);
}

document.getElementById("la_grid").appendChild(sur_la_table);
document.getElementById("soux_la_grid").appendChild(soux_la_table);