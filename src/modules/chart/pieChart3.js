import pieJson1 from "../../json/pieJson1";
import F2 from '@antv/f2/lib/index-all'

/**
 * Created by RaoMeng on 2019/1/21
 * Desc: 可点击的饼状图
 */
export const initPieChart3 = () => {
    let pieChart = new F2.Chart({
        id: 'pieChart3',
        pixelRatio: window.devicePixelRatio
    })

    pieChart.source(pieJson1)

    pieChart.axis(false)

    pieChart.tooltip(false)

    // pieChart.legend(false)

    pieChart.coord('polar', {
        transposed: true,
        innerRadius: 0.5,
        radius: 0.8
    })

    pieChart.guide().html({
        position: ['50%', '50%'],
        html: '<div style="text-align: center;width:120px;height: 40px;">' +
            '<p style="font-size: 12px;color: #999;margin: 0" id="title"></p>' +
            '<p style="font-size: 16px;color: #343434;margin: 0;font-weight: bold;" id="money"></p>' +
            '</div>'
    })

    pieChart.interval().position('a*percent').adjust('stack').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864'])

    pieChart.pieLabel({
        sidePadding: 30,
        activeShape: true,
        label1: (data) => {
            return {
                text: (data.percent * 100) + '%',
                fill: '#343434',
                fontWeight: 'bold'
            }
        },
        label2: (data) => {
            return {
                text: data.name,
                fill: '#999'
            }
        },
        onClick: (e) => {
            let data = e.data
            if (data) {
                document.getElementById('title').innerText = data.name
                document.getElementById('money').innerText = (data.percent * 100) + '%'
            }
        }
    })

    return pieChart
}