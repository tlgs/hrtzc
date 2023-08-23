const Metric = Object.freeze({
  LTHR: 0,
  MAXHR: 1,
});

const models = [
  {
    // source: strava.com
    name: "Strava",
    metric: Metric.MAXHR,
    names: ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"],
    ranges: [.65, .81, .89, .97],
  },
  {
    // source: Suunto Spartan Trainer
    name: "Suunto",
    metric: Metric.MAXHR,
    names: ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"],
    ranges: [.72, .76, .82, .87]
  },
  {
    // source: Intervals.icu
    name: "Joe Friel",
    metric: Metric.LTHR,
    names: ["Recovery", "Aerobic", "Tempo", "SubThreshold", "SuperThreshold", "Aerobic Capacity", "Anaerobic"],
    ranges: [.85, .90, .95, 1.00, 1.03, 1.06],
  },
  {
    // source: Intervals.icu
    name: "CTS",
    metric: Metric.LTHR,
    names: ["Recovery", "Endurance", "Steady State", "Tempo", "Interval"],
    ranges: [.80, .91, .99, 1.06],
  },
  {
    // source: Intervals.icu
    name: "80/20 Endurance",
    metric: Metric.LTHR,
    names: ["Zone 1", "Zone 2", "Zone X", "Zone 3", "Zone Y", "Zone 4", "Zone 5"],
    ranges: [.82, .91, .95, 1.00, 1.02, 1.06],
  },
  {
    // source: Intervals.icu
    name: "MyProCoach",
    metric: Metric.LTHR,
    names: ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"],
    ranges: [.85, .90, .95, 1.00],
  },
];

function calculateZones(model, metrics) {
  const value = metrics.get(model.metric);
  const maxhr = metrics.get(Metric.MAXHR);

  // make sure we don't prescribe any %LTHR that's higher than MaxHR
  const starts = [0, ...model.ranges.map(x => Math.min(Math.floor(x * value), maxhr))];
  const ends = [...starts.slice(1).map(x => x - 1), maxhr];

  const zones = [];
  for (const [i, name] of model.names.entries()) {
    zones[i] = {name: name, range: [starts[i], ends[i]]};
  }

  return {name: model.name, zones: zones};
};

export { Metric, models, calculateZones };
