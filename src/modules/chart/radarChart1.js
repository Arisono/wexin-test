import radarJson1 from "../../json/radarJson1";
import F2 from '@antv/f2'

/**
 * Created by RaoMeng on 2019/1/21
 * Desc: 雷达分布图
 */

export const initRadarChart = () => {
    let radarChart = new F2.Chart({
        id: 'radarChart1',
        pixelRatio: window.devicePixelRatio
    })

    radarChart.source(radarJson1, {
        score: {
            min: 0,
            max: 100
        }
    })

    radarChart.coord('polar', {
        radius: 0.8
    })

    radarChart.tooltip(false)

    radarChart.axis('item', {
        grid: {
            lineDash: null,
            top: true
        },
        label: null
    })

    radarChart.axis('score', {
        label: null,
        grid: (text) => {
            if (text === '100') {
                return {
                    lineDash: null
                }
            }

            return {
                lineWidth: 0
            }

            /*return {
                lineDash: null
            }*/
        },
        line: null
    })

    radarChart.area().position('item*score').style({
        fill: 'r(0.45,0.55,0.15) 0:#fff 0.35:#DEF5F5 0.75:#C8EEEF 1:#A8E5E6',
        fillOpacity: 100
    })

    radarJson1.map((obj) => {
        let offsetY = obj.item === '物理' || obj.item === '英语' ? -10 : -20;
        radarChart.guide().html({
            position: [obj.item, 130],
            html: '<div style="width: 80px;height: 34px;text-align: center">' +
                '<img src="' + obj.img + '" style="width: 24px;height: 24px;" />' +
                '<div style="color: #808080;transform:scale(0.8, 0.8);font-size:12px;">' + obj.item + '</div>' +
                '<div style="color: #808080;transform:scale(0.8, 0.8);font-size:12px;">' + obj.score + '分</div>' +
                '</div>',
            offsetY: offsetY
        });
    })

    return radarChart
}