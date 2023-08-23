import { Chart, config, repopulate } from "./modules/chart.js";
import { Metric, models, calculateZones } from "./modules/models.js";

const lthr = document.querySelector("#lthr");
const maxhr = document.querySelector("#maxhr");

const chart = new Chart(document.querySelector("#chart"), config);

function clamp() {
  if (lthr.valueAsNumber > maxhr.valueAsNumber) {
    lthr.value = maxhr.value;
  }
}

function sync() {
  document.querySelector("#lthr-output").textContent = lthr.value;
  document.querySelector("#maxhr-output").textContent = maxhr.value;

  const metrics = new Map([
    [Metric.LTHR, lthr.valueAsNumber],
    [Metric.MAXHR, maxhr.valueAsNumber],
  ]);

  repopulate(chart, models.map(m => calculateZones(m, metrics)));
}

window.addEventListener("load", sync);
document.querySelector("#user-sliders").addEventListener("input", () => { clamp(); sync(); });
