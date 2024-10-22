/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { useEffect, createRef, useState } from 'react';
// import { styled } from '@superset-ui/core';
import { SupersetPluginChartKidusProps } from './types';
// import ReactECharts from 'echarts-for-react';
import 'echarts-gl';
// import cloneDeep from 'lodash.clonedeep';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import TableRenderers from 'react-pivottable/TableRenderers';
import 'react-pivottable/pivottable.css';
// import { PivotTestProps } from './types';
import Styles from './Styles';


export default function SupersetPluginChartKidus(props: SupersetPluginChartKidusProps) {
   // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const { height, width } = props;

  const rootElem = createRef<HTMLDivElement>();

  // State to store the pivot table configuration
  const [pivotState, setPivotState] = useState({});

  // Process your data to fit react-pivottable's expectations
  const rawData =  [];

  // DOM manipulation or other side effects
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  }, []);

  console.log('Plugin props', props);

  return (
    <Styles
      ref={rootElem}
    >
      <h3>{props.headerText}</h3>

      {/* PivotTableUI component for rendering the pivot table */}
      <div style={{ height, width }}>
        <PivotTableUI
          data={rawData} // Use the processed data
          onChange={s => setPivotState(s)} // Update pivot state on interaction
          renderers={TableRenderers} // Default table renderers
          {...pivotState} // Spread the state to maintain user changes
        />
      </div>
    </Styles>
  );
}
