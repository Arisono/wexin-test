import pieJson2 from "../../json/pieJson2";
import F2 from '@antv/f2/lib/index-all'

/**
 * Created by RaoMeng on 2019/1/21
 * Desc: 带文本、图例的饼状图
 */
export const initPieChart2 = () => {
    let pieChart = new F2.Chart({
        id: 'pieChart2',
        pixelRatio: window.devicePixelRatio
    })

    pieChart.source(pieJson2)
    //配置坐标系
    pieChart.coord('polar', {
        transposed: true,//坐标系翻转
        innerRadius: 0.4,//内环半径
        radius: 0.75,//半径
    })

    pieChart.axis(false)

    pieChart.legend({
        position: 'bottom',
        align: 'center',
        marker: {
            symbol: 'square',
            radius: 4
        }
    })

    pieChart.tooltip(false)

    pieChart.guide().html({
        position: ['50%', '50%'],
        html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
    })

    //绘制饼图文本
    pieChart.pieLabel({
        sidePadding: 75,
        activeShape: true,
        label1: (data) => {
            return {
                text: data.memo,
                fill: '#808080'
            }
        },
        label2: (data) => {
            return {
                text: '￥' + data.amount.toFixed(2),
                fill: '#000000',
                fontWeight: 500,
                fontSize: 10
            }
        }
    })

    pieChart.interval().position('const*ratio')
        .color('memo', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0', '#3436C7', '#223273'])
        .adjust('stack');

    return pieChart
}