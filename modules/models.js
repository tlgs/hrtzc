const Metric = Object.freeze({
  LTHR: 0,
  MAXHR: 1
});

const models = [
  {
    // source: strava.com
    name: { full: 'Strava', short: 'Strava' },
    metric: Metric.MAXHR,
    names: ['Endurance', 'Moderate', 'Tempo', 'Threshold', 'Anaerobic'],
    ranges: [0.65, 0.81, 0.89, 0.97]
  },
  {
    // source: Suunto Spartan Trainer
    name: { full: 'Suunto', short: 'Suunto' },
    metric: Metric.MAXHR,
    names: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'],
    ranges: [0.72, 0.76, 0.82, 0.87]
  },
  {
    // source: Intervals.icu
    name: { full: 'Joe Friel', short: 'Joe Friel' },
    metric: Metric.LTHR,
    names: ['Recovery', 'Aerobic', 'Tempo', 'SubThreshold', 'SuperThreshold', 'Aerobic Capacity', 'Anaerobic'],
    ranges: [0.85, 0.90, 0.95, 1.00, 1.03, 1.06]
  },
  {
    // source: Intervals.icu
    name: { full: 'CTS', short: 'CTS' },
    metric: Metric.LTHR,
    names: ['Recovery', 'Endurance', 'Steady State', 'Tempo', 'Interval'],
    ranges: [0.80, 0.91, 0.99, 1.06]
  },
  {
    // source: Intervals.icu
    name: { full: '80/20 Endurance', short: '80/20' },
    metric: Metric.LTHR,
    names: ['Zone 1', 'Zone 2', 'Zone X', 'Zone 3', 'Zone Y', 'Zone 4', 'Zone 5'],
    ranges: [0.82, 0.91, 0.95, 1.00, 1.02, 1.06]
  },
  {
    // source: Intervals.icu
    name: { full: 'MyProCoach', short: 'MPC' },
    metric: Metric.LTHR,
    names: ['Zone 1', 'Zone 2', 'Zone 3', 'Zone 4', 'Zone 5'],
    ranges: [0.85, 0.90, 0.95, 1.00]
  }
];

function calculateZones (model, metrics) {
  const value = metrics.get(model.metric);
  const maxhr = metrics.get(Metric.MAXHR);

  // make sure we don't prescribe any %LTHR that's higher than MaxHR
  const starts = [0, ...model.ranges.map(x => Math.min(Math.floor(x * value), maxhr))];
  const ends = [...starts.slice(1).map(x => x - 1), maxhr];

  const zones = [];
  for (const [i, name] of model.names.entries()) {
    zones[i] = { name, range: [starts[i], ends[i]] };
  }

  return { name: model.name, zones };
}

export { Metric, models, calculateZones };
