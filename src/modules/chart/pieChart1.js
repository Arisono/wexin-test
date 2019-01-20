import pieJson1 from "../../json/pieJson1";
import F2 from '@antv/f2'

export const initPieChart1 = () => {
    let map = {
        '60-70': '40%',
        '70-80': '20%',
        '80-90': '18%',
        '90-100': '20%',
        '不及格': '2%'
    }

    let pieChart = new F2.Chart({
        id: 'pieChart',
        pixelRatio: window.devicePixelRatio
    })

    pieChart.source(pieJson1, {
        percent: {
            formatter: (val) => {
                return val * 100 + '%'
            }
        }
    })

    pieChart.legend({
        position: 'right',
        itemFormatter: (val) => {
            return val + '  ' + map[val]
        },
        marker: {
            symbol: 'square',
            radius: 4
        }
    })

    pieChart.tooltip(false)

    pieChart.coord('polar', {
        transposed: true,
        radius: 0.85
    })

    pieChart.axis(false)

    pieChart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864'])
        .adjust('stack').style({
        lineWidth: 1,
        stroke: '#fff',
        lineJoin: 'round',
        lineCap: 'round'
    }).animate({
        appear: {
            duration: 1200,
            easing: 'bounceOut'
        }
    })

    return pieChart
}