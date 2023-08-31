import { Chart, Tooltip, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip);
Chart.defaults.color = '#212529';
Chart.defaults.font.family = 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans","Liberation Sans",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';

Tooltip.positioners.reasonable = (_, pos) => pos;

const config = {
  type: 'bar',
  data: {
    datasets: [
      { backgroundColor: '#3db39e99', hoverBackgroundColor: '#3db39eff' },
      { backgroundColor: '#3db33e99', hoverBackgroundColor: '#3db33eff' },
      { backgroundColor: '#fcd54999', hoverBackgroundColor: '#fcd549ff' },
      { backgroundColor: '#fc9c4999', hoverBackgroundColor: '#fc9c49ff' },
      { backgroundColor: '#e2407399', hoverBackgroundColor: '#e24073ff' },
      { backgroundColor: '#8963d799', hoverBackgroundColor: '#8963d7ff' },
      { backgroundColor: '#79738799', hoverBackgroundColor: '#797387ff' }
    ]
  },
  options: {
    maintainAspectRatio: false,
    indexAxis: 'y',
    barPercentage: 1,
    categoryPercentage: 0.9,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Heart Rate (bpm)'
        }
      },
      y: {
        stacked: true,
        grid: { display: false }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        displayColors: false,
        position: 'reasonable',
        callbacks: {
          title: ctx => { return ctx[0].raw.name; },
          label: ctx => { return ctx.raw.range; }
        }
      }
    }
  }
};

function repopulate (chart, data, small) {
  // clear existing datasets
  chart.data.datasets.forEach(dataset => { dataset.data = []; });

  for (const model of data) {
    const label = small ? `${model.name.short}` : `${model.name.full}`;
    const last = model.zones.length - 1;

    // repopulate each dataset
    for (const [i, zone] of model.zones.entries()) {
      const datum = {
        x: zone.range[1] - zone.range[0] + 1,
        y: label,
        name: zone.name,
        range: i === last ? `${zone.range[0]}+` : `${zone.range[0]} - ${zone.range[1]}`
      };

      chart.data.datasets[i].data.push(datum);
    }
  }

  // change scale so that xmin = (top of  Z1) - 5
  const lowest = Math.min(...data.map(model => model.zones[0].range[1]));
  chart.options.scales.x.min = lowest - 5;

  // change scale so that xmax > MaxHR
  const maxhr = data[0].zones.at(-1).range[1];
  chart.options.scales.x.max = maxhr;

  chart.update();
}

export { Chart, config, repopulate };
