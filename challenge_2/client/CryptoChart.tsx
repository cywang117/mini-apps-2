import * as React from 'react';
import { FC, createRef, useEffect } from 'react';
import * as Chart from 'chart.js';
import { ChartCtn } from './styles';

let cryptoChart:Chart;

export interface APIRes {
  bpi?: object;
}

interface Props {
  data: APIRes;
}

const CryptoChart:FC<Props> = ({ data }) => {
  const chartRef = createRef<HTMLCanvasElement>();

  const updateChart = () => {
    const config = {
      type: 'line',
      data: {
        labels: data.bpi ? Object.keys(data.bpi) : [],
        datasets: [
          {
            // Object.values method not valid despite including es7 as tsconfig lib, therefore must be casted to type any
            label: 'Closing Price',
            data: data.bpi ? (Object as any).values(data.bpi) : [],
            fill: false,
            borderColor: '#313638',
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'USD',
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date',
              },
            },
          ],
        },
      },
    };

    if (cryptoChart === undefined) {
      cryptoChart = new Chart(chartRef.current!.getContext('2d')!, config);
    } else {
      cryptoChart.data.labels = data.bpi ? Object.keys(data.bpi) : [];
      cryptoChart.data.datasets![0].data = data.bpi ? (Object as any).values(data.bpi) : [];
      cryptoChart.update();
    }
  }

  useEffect(() => {
    if (data.bpi) {
      updateChart();
    }
  }, [data]);

  return (
    <ChartCtn>
      <canvas
        id="cryptoChart"
        ref={chartRef}
      />
    </ChartCtn>
  );
};

export default CryptoChart;
