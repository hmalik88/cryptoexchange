import React from 'react'
import Chart from 'chart.js';
import _ from 'lodash';
import '../scss/Graph.scss'

export default class Graph extends React.Component {

  constructor(props) {
    super()
    this.state = {chart: ''}
    props.getCurrentUser();
  }

  computeGraph = () => {
    let labels = _.union(Object.keys(this.props.inFlows), Object.keys(this.props.outFlows));
    let negValues = [0, ...Object.values(this.props.outFlows)];
    let posValues = Object.values(this.props.inFlows);
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
    let negValues = [0, ...Object.values(this.props.outFlows)];
    let posValues = Object.values(this.props.inFlows);
    const { chart } = this.state
    chart.data.datasets[0].data = negValues;
    chart.data.datasets[1].data = posValues;
    chart.update();
  }

  render() {
    return(<canvas id="canvas"></canvas>)
  }
}
