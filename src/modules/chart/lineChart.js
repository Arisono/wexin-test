import lineJson from "../../json/lineJson";
import F2 from '@antv/f2'

/**
 * Created by RaoMeng on 2019/1/21
 * Desc: 折线图
 */
export const initLineChart = () => {
    let lineChart = new F2.Chart({
        id: 'lineChart',
        pixelRatio: window.devicePixelRatio
    })

    lineChart.source(lineJson, {
        release: {
            min: 1000,
            max: 2000
        }
    })
    //度量
    lineChart.scale('date', {
        type: 'timeCat',
        tickCount: 3
    })

    //度量
    lineChart.scale('value', {
        tickCount: 5
    })

    //坐标轴配置
    lineChart.axis('date', {
        label: (text, index, total) => {
            let textCfg = {}
            if (index === 0) {
                textCfg.textAlign = 'left'
            } else if (index === total - 1) {
                textCfg.textAlign = 'right'
            }
            return textCfg
        }
    })

    //提示信息
    lineChart.tooltip({
        custom: true,
        showCrosshairs: true,
        // crosshairsType:'xy',
        onChange: (obj) => {
            let legend = lineChart.get('legendController').legends.top[0]
            let tooltipItems = obj.items
            let legendItems = legend.items
            let map = {}
            legendItems.map((item) => {
                map[item.name] = F2.Util.mix({}, item)
            })
            tooltipItems.map((item) => {
                let name = item.name
                let value = item.value
                if (map[name]) {
                    map[name].value = value
                }
            })
            legend.setItems(Object.values(map))
        },
        onHide: () => {
            let legend = lineChart.get('legendController').legends.top[0]
            legend.setItems(lineChart.getLegendItems().country)
        }
    })

    /*lineChart.interaction('pan')
    lineChart.scrollBar({
        mode: 'x',
        xStyle: {
            offsetY: -5
        }
    })*/
    lineChart.area().position('date*value').color('type')
    lineChart.line().position('date*value').color('type')
    // lineChart.point().position('date*value').color('type')
    // lineChart.render()

    return lineChart
}