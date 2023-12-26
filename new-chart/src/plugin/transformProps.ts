import { ChartProps, DataRecord } from '@superset-ui/core';
import { NewChartProps, NewChartQueryFormData } from '../types';

export default function transformProps(chartProps: ChartProps)  : NewChartProps {

  const { width, height, formData, queriesData } = chartProps;
  const data = queriesData[0].data as DataRecord[];

  const {
    boldText,
    headerFontSize,
    headerText,
    colorScheme,
    groupby,
    metric,
    showBarValue,
    showLegend,
    barStacked,
    barPosition,
    yAxisFormat,
    xTicksLayout
  } = formData as NewChartQueryFormData;

  console.log('formData via TransformProps.ts', formData);

  return {
    width,
    height,
    data,
    headerFontSize,
    headerText,
    barPosition,
    boldText,
    // and now your control data, manipulated as needed, and passed through as props!
    colorScheme,
    keys: groupby!,
    value: metric,
    showBarValue,
    showLegend,
    barStacked,
    yAxisFormat,
    xTicksLayout,
  };
}
