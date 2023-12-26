import {
  ControlPanelConfig,
  sections,
  D3_FORMAT_OPTIONS,
} from '@superset-ui/chart-controls';
import { NewChartQueryFormData } from '../types';

// const config: ControlPanelConfig = {
  

//   // For control input types, see: superset-frontend/src/explore/components/controls/index.js
//   controlPanelSections: [
//     sections.legacyRegularTime,
//     {
//       label: t('Query'),
//       expanded: true,
//       controlSetRows: [
//         [
//           {
//             name: 'cols',
//             config: {
//               ...sharedControls.groupby,
//               label: t('Columns'),
//               description: t('Columns to group by'),
//             },
//           },
//         ],
//         [
//           {
//             name: 'metrics',
//             config: {
//               ...sharedControls.metrics,
//               // it's possible to add validators to controls if
//               // certain selections/types need to be enforced
//               validators: [validateNonEmpty],
//             },
//           },
//         ],
//         ['adhoc_filters'],
//         [
//           {
//             name: 'row_limit',
//             config: sharedControls.row_limit,
//           },
//         ],
//       ],
//     },
//     {
//       label: t('Hello Controls!'),
//       expanded: true,
//       controlSetRows: [
//         [
//           {
//             name: 'header_text',
//             config: {
//               type: 'TextControl',
//               default: 'Hello, World!',
//               renderTrigger: true,
//               // ^ this makes it apply instantaneously, without triggering a "run query" button
//               label: t('Header Text'),
//               description: t('The text you want to see in the header'),
//             },
//           },
//         ],
//         [
//           {
//             name: 'bold_text',
//             config: {
//               type: 'CheckboxControl',
//               label: t('Bold Text'),
//               renderTrigger: true,
//               default: true,
//               description: t('A checkbox to make the '),
//             },
//           },
//         ],
//         [
//           {
//             name: 'header_font_size',
//             config: {
//               type: 'SelectControl',
//               label: t('Font Size'),
//               default: 'xl',
//               choices: [
//                 // [value, label]
//                 ['xxs', 'xx-small'],
//                 ['xs', 'x-small'],
//                 ['s', 'small'],
//                 ['m', 'medium'],
//                 ['l', 'large'],
//                 ['xl', 'x-large'],
//                 ['xxl', 'xx-large'],
//               ],
//               renderTrigger: true,
//               description: t('The size of your header font'),
//             },
//           },
//         ],
//       ],
//     },
//   ],
// };

const config: ControlPanelConfig<NewChartQueryFormData> = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: 'Query',
      expanded: true,
      controlSetRows: [
        ['metric'],
        ['groupby'],
        ['sort_by_metric'],
        ['adhoc_filters'],
      ],
    },
    {
      label: 'Chart Options',
      expanded: true,
      controlSetRows: [
        ['color_scheme', 'label_colors'],
        ['show_legend', 'show_bar_value'],
        ['bar_stacked', 'bar_position'],
        ['y_axis_format'],
        ['x_ticks_layout'],
      ],
    },
  ],
  controlOverrides: {
    metric: {
      validators: [],
    },
    y_axis_format: {
      label: 'Y Axis Format',
      choices: D3_FORMAT_OPTIONS,
      default: '.3s',
      description: 'D3 format'
    },
  },
};

export default config;
