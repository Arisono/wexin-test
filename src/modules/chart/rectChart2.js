import rectJson2 from "../../json/rectJson2";
import F2 from '@antv/f2'

/**
 * Created by RaoMeng on 2019/1/21
 * Desc: 分组柱状图
 */
export const initRectChart2 = () => {
    let rectChart = new F2.Chart({
        id: 'rectChart2',
        pixelRatio: window.devicePixelRatio
    })

    rectChart.source(rectJson2)

    rectChart.tooltip({
        custom: true,
        onChange: (obj) => {
            let legend = rectChart.get('legendController').legends.top[0]
            let tooltipItems = obj.items
            let legendItems = legend.items

            let map = {}
            legendItems.map(item => {
                map[item.name] = F2.Util.mix({}, item)
            })

            tooltipItems.map(item => {
                let name = item.name
                let value = item.value
                if (map[name]) {
                    map[name].value = value
                }
            })

            legend.setItems(Object.values(map))
        },
        onHide: () => {
            let legend = rectChart.get('legendController').legends.top[0];
            legend.setItems(rectChart.getLegendItems().country);
        }
    })

    rectChart.interval().position('月份*平均分').color('科目').adjust({
        type: 'dodge',
        marginRatio: 0.05
    })

    return rectChart
}