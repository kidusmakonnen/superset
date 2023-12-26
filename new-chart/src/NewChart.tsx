import React, { useEffect, useRef } from 'react';
import { CategoricalColorNamespace, getNumberFormatter } from '@superset-ui/core';
import { NewChartProps } from './types';
import { Chart, ChartConfiguration } from 'chart.js';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

// const Styles = styled.div<NewChartStylesProps>`
//   background-color: ${({ theme }) => theme.colors.secondary.light2};
//   padding: ${({ theme }) => theme.gridUnit * 4}px;
//   border-radius: ${({ theme }) => theme.gridUnit * 2}px;
//   height: ${({ height }) => height}px;
//   width: ${({ width }) => width}px;

//   h3 {
//     /* You can use your props to control CSS! */
//     margin-top: 0;
//     margin-bottom: ${({ theme }) => theme.gridUnit * 3}px;
//     font-size: ${({ theme, headerFontSize }) =>
//       theme.typography.sizes[headerFontSize]}px;
//     font-weight: ${({ theme, boldText }) =>
//       theme.typography.weights[boldText ? 'bold' : 'normal']};
//   }

//   pre {
//     height: ${({ theme, headerFontSize, height }) =>
//       height - theme.gridUnit * 12 - theme.typography.sizes[headerFontSize]}px;
//   }
// `;

// /**
//  * ******************* WHAT YOU CAN BUILD HERE *******************
//  *  In essence, a chart is given a few key ingredients to work with:
//  *  * Data: provided via `props.data`
//  *  * A DOM element
//  *  * FormData (your controls!) provided as props by transformProps.ts
//  */

// export default function NewChart(props: NewChartProps) {
//   // height and width are the height and width of the DOM element as it exists in the dashboard.
//   // There is also a `data` prop, which is, of course, your DATA 🎉
//   const { data, height, width } = props;

//   const rootElem = createRef<HTMLDivElement>();

//   // Often, you just want to access the DOM and do whatever you want.
//   // Here, you can do that with createRef, and the useEffect hook.
//   useEffect(() => {
//     const root = rootElem.current as HTMLElement;
//     console.log('Plugin element', root);
//   });

//   console.log('Plugin props', props);

//   return (
//     <Styles
//       ref={rootElem}
//       boldText={props.boldText}
//       headerFontSize={props.headerFontSize}
//       height={height}
//       width={width}
//     >
//       <h3>{props.headerText}</h3>
//       <pre>${JSON.stringify(data, null, 2)}</pre>
//     </Styles>
//   );
// }

// //ant-designs
// export default function NewChart(props: NewChartProps) {
//   const { data, keys, value, colorScheme, width, height, showBarValue, showLegend, barStacked, barPosition, yAxisFormat, xTicksLayout } = props;

//   const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);
//   const formatter = getNumberFormatter(yAxisFormat);

//   const config = {
//     data,
//     xField: keys[0],
//     yField: value,
//     seriesField: keys[1],
//     isStack: barStacked,
//     isGroup: barPosition === 'group',
//     legend: {
//       visible: showLegend,
//       position: 'top-left',
//     },
//     label: {
//       visible: showBarValue,
//       position: 'middle',
//       formatter: (item: any) => formatter(item[value]),
//     },
//     color: (item: any) => colorFn(item[keys[1]]),
//     xAxsis: {
//       tickCount: xTicksLayout === 'auto' ? undefined : Number(xTicksLayout),
//     },
//     meta: {
//       [value]: {
//         formatter: (v: any) => formatter(v),
//       },
//     },
//     tooltip: {
//       formatter: (datum: any) => ({
//         name: datum[keys[1]],
//         value: formatter(datum[value]),
//       }),
//     },
//   };

//   return <Bar {...config} width={width} height={height} />;
export default function NewChart(props: NewChartProps) {
  const { data, keys, colorScheme, width, height, showLegend, barStacked, yAxisFormat } = props;
  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);
  const formatter = getNumberFormatter(yAxisFormat);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx) {
      const config: ChartConfiguration = {
        type: 'bar',
        data: {
          labels: data.map((d) => d[keys[0]]),
          datasets: keys.slice(1).map((key, index) => ({
            label: key,
            data: data.map((d) => d[key]),
            backgroundColor: colorFn(key),
          })),
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: showLegend,
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || '';
                  const value = context.parsed.y;
                  return `${label}: ${formatter(value)}`;
                },
              },
            },
          },
          scales: {
            x: {
              stacked: barStacked,
            },
            y: {
              stacked: barStacked,
              ticks: {
                callback: (value) => value,
              },
            },
          },
        },
      };
      let chart = Chart.getChart(ctx);
      if (chart) {
        // chart.config = config,
        chart.update();
      } else {
        chart = new Chart(ctx, config);
      }
    }
    
  }, [canvasRef, data, keys, colorFn, showLegend, barStacked, formatter]);

  return <canvas ref={canvasRef} width={width} height={height} />
}

