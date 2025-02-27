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
      //sur.la.power = sur.la.power + solarPanel.powerOut;
      sur.la.inventory.solar_panels.push({powerOut: solarPanel.powerOut});
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

const crime_le_table = document.createElement("table");
crime_le_table.id = "crime_le_table";
const c_tr = document.createElement("tr");
crime_le_table.appendChild(c_tr);

for (let i = 0; i < sur.la.barely_paid_interns.length; i++) {
  const tc = document.createElement("td");
  tc.id = `soux_la_table_${i}`
  tc.style.backgroundColor = "#99aabb";
  const leThing = sur.la.barely_paid_interns[i];
  tc.innerText = `education level = ${leThing.levelOfEducation} cost = ${leThing.cost}`;
  c_tr.appendChild(tc);
}

const intern_table = document.createElement("table");
intern_table.id = "inter_list";
const intern_table_tc = document.createElement("tr");
intern_table.appendChild(intern_table_tc);

for(let i = 0; i < sur.la.names_of_interns.length; i++) {
  const tc = document.createElement("td");
  tc.id = `intern_table_${i}`;
  tc.style.backgroundColor = "#ab345a";
  const leThing = sur.la.names_of_interns[i];
  tc.innerText = `name = ${leThing.name} | what they do = ${leThing.activity}`;
  intern_table_tc.appendChild(tc);
}


document.getElementById("la_grid").appendChild(sur_la_table);
document.getElementById("soux_la_grid").appendChild(soux_la_table);
document.getElementById("we_love_crime").appendChild(crime_le_table);
document.getElementById("inter_list").appendChild(intern_table)