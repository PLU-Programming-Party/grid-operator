const sur_la_table = document.createElement("table");
const tabla_de_turbinas = document.createElement("table");
tabla_de_turbinas.id = "tabla_de_turbinas";
sur_la_table.id = "sur_la_table";
//For loading save data
try {
const data = window.location.hash.substring(1);
loadData(decodeURI(window.location.hash.substring(1)));
} catch {
  //Does nothing
}
window.addEventListener('hashchange', function() {
  window.location.reload();
});

function resizeImage(image, power) {
  var canvas = document.createElement('canvas');
  var maxWidth = 100 * (power/10); // Define the maximum width of the image
  var maxHeight = 50 * (power/10); // Define the maximum height of the image
  var width = image.width;
  var height = image.height;

  // Calculate the new dimensions, maintaining the aspect ratio
  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width;
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height;
      height = maxHeight;
    }
  }

  // Set the canvas dimensions to the new dimensions
  canvas.width = width;
  canvas.height = height;

  // Draw the resized image on the canvas
  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, width, height);

  //FINISH LATER TOP
  //const imageContainer = document.createElement('imageContainer');
      
  // set the initial random position for the image container
  canvas.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
  canvas.style.top = Math.floor(Math.random() * window.innerHeight) + "px";
  canvas.style.zIndex = 999999999;

  // Insert the canvas into the DOM or use it otherwise
  //imageContainer.appendChild(canvas);
  //document.body.appendChild(imageContainer);
  document.body.appendChild(canvas);
  //FINISH LATER BOTTOM
}


const solar_tr = document.createElement("tr");
sur_la_table.appendChild(solar_tr);
for (let i = 0; i < sur.la.solarPanels.length; i++) {
  const td = document.createElement("td");
  td.id = `sur_la_table_${i}`
  td.style.backgroundColor = "lightBlue";
  const solarPanel = sur.la.solarPanels[i];
  td.innerText = `power: ${solarPanel.powerOut} \n  cost: ${solarPanel.cost}`;
  // td.innerText = new Date()
  td.onclick = function () {
    const solarPanel = sur.la.solarPanels[i];
    if (sur.la.money >= solarPanel.cost) {
      sur.la.money = sur.la.money - solarPanel.cost;
      //sur.la.power = sur.la.power + solarPanel.powerOut;
      sur.la.inventory.solar_panels.push({powerOut: solarPanel.powerOut});
      solarPanel.cost = Math.round(solarPanel.cost * 1.05);
      td.innerText = `power: ${solarPanel.powerOut} \n cost: ${solarPanel.cost}`;
      const img = document.createElement('img');
      img.src = 'images/fossil-fuels.jpg';
      resizeImage(img, solarPanel.powerOut);
      //document.body.appendChild(img);
    }
  };
  solar_tr.appendChild(td);
}

const turbinas_de_viento = document.createElement("tr");
tabla_de_turbinas.appendChild(turbinas_de_viento);

for(let i = 0; i < sur.la.windTurbines.length; i++){
  const td = document.createElement("td");
  td.id = `tabla_de_turbinas_${i}`
  td.style.backgroundColor = "lightBlue";
  const turbina = sur.la.windTurbines[i];
  td.innerText = `power: ${turbina.powerOut} \n cost: ${turbina.cost}`
  td.onclick = function () {
    const turbina = sur.la.windTurbines[i];
    if (sur.la.money >= turbina.cost) {
      sur.la.money = sur.la.money - turbina.cost;
      sur.la.inventory.wind_turbina.push({powerOut : turbina.powerOut});
      turbina.cost = Math.round(turbina.cost * 2)
      td.innerText = `power: ${turbina.powerOut} \n cost: ${turbina.cost}`
    }
  }
  turbinas_de_viento.appendChild(td);
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

document.getElementById("la_grid").appendChild(sur_la_table);
document.getElementById("soux_la_grid").appendChild(soux_la_table);
document.getElementById("tabla_de_turbinas_divisor").append(tabla_de_turbinas);