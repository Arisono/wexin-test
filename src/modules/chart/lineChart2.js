import lineJson2 from "../../json/lineJson2";
import F2 from '@antv/f2/lib/index-all'

/**
 * Created by RaoMeng on 2019/1/21
 * Desc: 可平移的折线图
 */

export const initLineChart2 = () => {
    let lineChart = new F2.Chart({
        id: 'lineChart2',
        pixelRatio: window.devicePixelRatio
    })

    lineChart.source(lineJson2, {
        release: {
            min: 1990,
            max: 2010
        }
    })

    lineChart.tooltip({
        showCrosshairs: true,
        showItemMarker: false,
        background: {
            radius: 2,
            fill: '#1890FF',
            padding: [3, 5]
        },
        nameStyle: {
            fill: '#fff'
        },
        onShow: (e) => {
            let items = e.items
            items[0].name = items[0].title
        },
    })

    lineChart.line().position('release*count')

    lineChart.point().position('release*count').style({
        lineWidth: 1,
        stroke: '#fff'
    })

    lineChart.interaction('pan')

    lineChart.scrollBar({
        mode: 'x',
        xStyle: {
            offsetY: -5
        }
    })

    lineChart.guide().tag({
        position: [1969, 1344],
        withPoint: false,
        content: '1,344',
        limitInPlot: true,
        offsetX: 5,
        direct: 'cr'
    })

    return lineChart
}

