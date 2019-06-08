import React from 'react'
import Chart from 'chart.js';
import _ from 'lodash';
import '../scss/Graph.scss'

export default class Graph extends React.Component {


  componentDidMount() {
    let colors = {positive: 'green', negative: 'red'}

      let labels = _.union(this.props.inFlows, this.props.outFlows)
      console.log(this.props)

    let canvas = document.querySelector('#canvas');
    let myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: '',
        datasets: [{
          data: []
        }]
      }
    })
  }


  render() {

    return(
      <canvas id="canvas">

      </canvas>
      )
  }
}
