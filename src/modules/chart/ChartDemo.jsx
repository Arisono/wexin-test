/**
 * Created by RaoMeng on 2019/1/18
 * Desc: 图表demo
 */
import React, {Component} from 'react'
import Core from '@antv/f2/lib/core'
import F2 from '@antv/f2'
import Tooltip from '@antv/f2/lib/plugin/tooltip'
import Legend from '@antv/f2/lib/plugin/legend'
import ScrollBar from '@antv/f2/lib/plugin/scroll-bar'
import {initLineChart} from "./lineChart";
import {initRectChart1} from "./rectChart1";
import {initRectChart2} from "./rectChart2";
import {initPieChart1} from "./pieChart1";
import {initPieChart2} from "./pieChart2";
import {initPieChart3} from "./pieChart3";
import {initRadarChart} from "./radarChart1";
import {initLineChart2} from "./lineChart2";

F2.Chart.plugins.register(ScrollBar)

export default class ChartDemo extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        document.title = '图表demo'

        this.lineChart = initLineChart()
        this.lineChart2 = initLineChart2()
        this.rectChart1 = initRectChart1()
        this.rectChart2 = initRectChart2()
        this.pieChart1 = initPieChart1()
        this.pieChart2 = initPieChart2()
        this.pieChart3 = initPieChart3()
        this.radarChart1 = initRadarChart()

        this.lineChart.render()
        this.lineChart2.render()
        this.rectChart1.render()
        this.rectChart2.render()
        this.pieChart1.render()
        this.pieChart2.render()
        this.pieChart3.render()
        this.radarChart1.render()

        // 绘制内阴影
        let frontPlot = this.pieChart2.get('frontPlot');
        let coord = this.pieChart2.get('coord'); // 获取坐标系对象
        frontPlot.addShape('sector', {
            attrs: {
                x: coord.center.x,
                y: coord.center.y,
                r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
                r0: coord.circleRadius * coord.innerRadius,
                fill: '#000',
                opacity: 0.15
            }
        });
        this.pieChart2.get('canvas').draw();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='common-flex-column'>
                <span style={{padding: '10px', color: 'red'}}>折线图</span>
                <canvas id='lineChart' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>可平移折线图</span>
                <canvas id='lineChart2' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>基础柱状图</span>
                <canvas id='rectChart1' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>分组柱状图</span>
                <canvas id='rectChart2' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>基础饼状图</span>
                <canvas id='pieChart1' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>带图例、文本饼状图</span>
                <canvas id='pieChart2' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>可选中的饼状图</span>
                <canvas id='pieChart3' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>雷达分布图</span>
                <canvas id='radarChart1' width='100%' style={{width: '100%', height: '260px'}}></canvas>
            </div>
        )
    }
}
