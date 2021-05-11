import React from 'react'
import ReactDOM from 'react-dom'
import Hello from './page/Hello'
import Content from '@emp/vueComponents/Content.vue'
import {VueInReact} from 'vuera'
const VueComponent = VueInReact(Content)
ReactDOM.render(
  <>
    <Hello />
    <div style={{backgroundColor: '#eee', padding: '20px'}}>
      <VueComponent title="React use Remote Vue Component" />
    </div>
  </>,
  document.getElementById('emp-root'),
)
