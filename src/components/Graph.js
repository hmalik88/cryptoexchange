import React from 'react'
import Chart from 'chart.js';
import _ from 'lodash';
import '../scss/Graph.scss'

export default class Graph extends React.Component {

  state = {chart: ''}

  computeGraph = async () => {
    await this.props.getCurrentUser();
    let inFlows = this.props.inFlows;
    let outFlows = this.props.outFlows;
    let labels = _.union(Object.keys(inFlows), Object.keys(outFlows))
    let negValues = [0, ...Object.values(outFlows)];
    let posValues = Object.values(inFlows);
    let canvas = document.querySelector('#canvas');
    let myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Negative Cashflow',
          data: negValues,
          backgroundColor: 'rgb(164, 164, 164)'
        },
        {
          label: 'Positive Cashflow',
          data: posValues,
          backgroundColor: '#FCC62C'
        }]
      },
      options: {
          title: {
            display: true,
            text: 'Transaction History (Cash flows)'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
    })
     this.setState({chart: myChart})
  }

  componentDidMount() {
    this.computeGraph();
  }

  componentWillUnmount() {
    this.state.chart.destroy();
  }

  componentDidUpdate() {
    let outFlows = this.props.outFlows
    let inFlows = this.props.inFlows
    let negValues = [0, ...Object.values(outFlows)];
    let posValues = Object.values(inFlows);
    let labels = _.union(Object.keys(inFlows), Object.keys(outFlows))
    const { chart } = this.state
    chart.data.labels = labels;
    chart.data.datasets[0].data = negValues;
    chart.data.datasets[1].data = posValues;
    chart.update();
  }

  render() {
    return(<canvas id="canvas"></canvas>)
  }
}
