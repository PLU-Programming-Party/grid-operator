const rows = 3;
const columns = 2;
let sur_la_time = 0;
let sur_la_power = 0;
let sur_la_money = 100;
let sur_la_demand = 0;
let sur_la_speedometer = 2;
let sur_la_powerbalance = 0;
let sur_la_fossil_fuel = 2000;
let sur_la_fossil_fuel_plants = [
  { powerOut: 30, fuelConsumption: 1, isOn: true },
  { powerOut: 30, fuelConsumption: 1, isOn: true },
  { powerOut: 30, fuelConsumption: 1, isOn: true },
];
let surLaSolarPanels = [
  { powerOut: 10, cost: 20 },
  { powerOut: 20, cost: 30 },
  { powerOut: 40, cost: 40 },
];
let surLasur_la_TotalPower = 0;
setInterval(function () {
  document.getElementById("time").innerText = "time: " + sur_la_time;
  document.getElementById("dolladollabillsyall").innerText =
    "money: " + sur_la_money;
  document.getElementById("itsover9000").innerText =
    "power: " + surLasur_la_TotalPower;
  document.getElementById("acciopower").innerText =
    "demand: " + sur_la_demand;
  document.getElementById("fossilFuels:]").innerText =
    "fossil fuels: " + sur_la_fossil_fuel;
  let sous_la_hashtag = Array(Math.abs(Math.round(sur_la_powerbalance * 10)))
    .fill("#")
    .join("");
  const demandometer = document.getElementById("demandometer");
  if (sur_la_powerbalance >= 0) {
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
  for (laPlant of sur_la_fossil_fuel_plants) {
    if (laPlant.isOn) {
      surLaDirtyPower += laPlant.powerOut;
      surLaDirtyPowerConsumption += laPlant.fuelConsumption;
    }
  }
  surLasur_la_TotalPower = surLaDirtyPower + sur_la_power;
  sur_la_time += sur_la_speedometer;
  sur_la_money += Math.round(
    sur_la_speedometer *
      (Math.min(sur_la_demand, surLasur_la_TotalPower) / 60)
  );
  sur_la_demand += sur_la_speedometer * 10;
  sur_la_powerbalance =
    (surLasur_la_TotalPower - sur_la_demand) /
    (surLasur_la_TotalPower + sur_la_demand);
  sur_la_fossil_fuel = Math.max(
    sur_la_fossil_fuel - surLaDirtyPowerConsumption * sur_la_speedometer,
    0
  );
}, 1000);

const sur_la_table = document.createElement("table");

const solar_tr = document.createElement("tr");
sur_la_table.appendChild(solar_tr);
for (let i = 0; i < surLaSolarPanels.length; i++) {
  const solarPanel = surLaSolarPanels[i];
  const td = document.createElement("td");
  td.style.backgroundColor = "lightBlue";
  td.innerText = `power: ${solarPanel.powerOut}  cost: ${solarPanel.cost}`;
  td.onclick = function () {
    if (sur_la_money >= solarPanel.cost) {
      sur_la_money = sur_la_money - solarPanel.cost;
      sur_la_power = sur_la_power + solarPanel.powerOut;
      solarPanel.cost = Math.round(solarPanel.cost * 1.05);
      td.innerText = `power: ${solarPanel.powerOut}  cost: ${solarPanel.cost}`;
    }
  };
  solar_tr.appendChild(td);
}

const soux_la_table = document.createElement("table");
const tr = document.createElement("tr");
soux_la_table.appendChild(tr);
for (let i = 0; i < sur_la_fossil_fuel_plants.length; i++) {
  const laPlant = sur_la_fossil_fuel_plants[i];
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