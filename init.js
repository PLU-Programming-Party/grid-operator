const sur_la_table = document.createElement("table");
sur_la_table.id = "sur_la_table";

const solar_tr = document.createElement("tr");
sur_la_table.appendChild(solar_tr);
for (let i = 0; i < sur.la.solarPanels.length; i++) {
  const td = document.createElement("td");
  td.id = `sur_la_table_${i}`
  td.style.backgroundColor = "lightBlue";
  const solarPanel = sur.la.solarPanels[i];
  td.innerText = `power: ${solarPanel.powerOut}  cost: ${solarPanel.cost}`;
  // td.innerText = new Date()
  td.onclick = function () {
    const solarPanel = sur.la.solarPanels[i];
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
soux_la_table.id = "soux_la_table";

const tr = document.createElement("tr");
soux_la_table.appendChild(tr);
for (let i = 0; i < sur.la.fossil_fuel_plants.length; i++) {
  const td = document.createElement("td");
  td.id = `soux_la_table_${i}`
  td.style.backgroundColor = "lightGrey";
  const laPlant = sur.la.fossil_fuel_plants[i];
  td.innerText = `fossil fuel consumption = ${laPlant.fuelConsumption} power = ${laPlant.powerOut}`;
  td.onclick = function () {
    const laPlant = sur.la.fossil_fuel_plants[i];
    laPlant.isOn = !laPlant.isOn;
  };
  tr.appendChild(td);
}

document.getElementById("la_grid").appendChild(sur_la_table);
document.getElementById("soux_la_grid").appendChild(soux_la_table);
