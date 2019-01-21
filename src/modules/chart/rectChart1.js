import rectJson1 from "../../json/rectJson1";
import F2 from '@antv/f2'

/**
 * Created by RaoMeng on 2019/1/21
 * Desc: 基础柱状图
 */
export const initRectChart1 = () => {
    let rectChart1 = new F2.Chart({
        id: 'rectChart1',
        pixelRatio: window.devicePixelRatio
    })

    rectChart1.source(rectJson1, {
        sales: {
            tickCount: 5
        }
    })

    let legendItems = []
    legendItems.push({
        name: rectJson1[0].year,
        value: rectJson1[0].subject + ':' + rectJson1[0].sales,
        marker: {
            symbol: 'square',
            fill: 'red',
            radius: 4
        }
    })
    /*rectJson1.map((obj) => {
        let item = {
            name: obj.year,
            value: obj.subject + ':' + obj.sales,
            marker: {
                symbol: 'square',
                fill: 'red',
                radius: 4
            }
        }
        legendItems.push(item)
    })*/

    /*rectChart1.legend({
        align: 'left',
        custom: true,
        items: legendItems
    })*/

    rectChart1.tooltip({
        showItemMarker: false,
        showCrosshairs: false,
        onShow: (e) => {
            let items = e.items

            // items[0].name = null
            // items[0].name = items[0].title
            // items[0].value = '分数' + items[0].value
            items[0].name = items[0].origin.subject
            items[0].value += '分'
        },
        onChange: (obj) => {
            console.log(obj)
            // let legend = rectChart1.get('legendController').legends.top[0]

        },
        onHide: (e) => {
            // let legend = rectChart1.get('legendController').legends.top[0]
            // console.log(legend)
        }
    })
    rectChart1.interval().position('year*sales')
    // rectChart1.render()

    return rectChart1
}