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

F2.Chart.plugins.register(ScrollBar)

export default class ChartDemo extends Component {

    constructor() {
        super()

        this.state = {}
    }

    componentDidMount() {
        document.title = '图表demo'

        this.lineChart = initLineChart()
        this.rectChart1 = initRectChart1()
        this.rectChart2 = initRectChart2()
        this.pieChart1 = initPieChart1()

        this.lineChart.render()
        this.rectChart1.render()
        this.rectChart2.render()
        this.pieChart1.render()
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='common-flex-column'>
                <span style={{padding: '10px', color: 'red'}}>折线图</span>
                <canvas id='lineChart' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>基础柱状图</span>
                <canvas id='rectChart1' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>分组柱状图</span>
                <canvas id='rectChart2' width='100%' style={{width: '100%', height: '260px'}}></canvas>
                <span style={{padding: '10px', color: 'red'}}>基础饼状图</span>
                <canvas id='pieChart' width='100%' style={{width: '100%', height: '260px'}}></canvas>
            </div>
        )
    }


}
