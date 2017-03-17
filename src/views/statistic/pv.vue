<!--
 * @author Ling<i@zeroling.com>
-->
<template>
  <div class="page-stat-pv">
    <div class="stat-chart">
      <chart class="chart" :options="chartDayData"></chart>
    </div>
  </div>
</template>

<script>
import dataSource from 'services/dataService'

export default {
  data () {
    return {
      chartDayData: {
        title: {
          text: '日 PV 统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['pv']
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'pv',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: {} },
            data: []
          }
        ]
      }
    }
  },
  created () {
    dataSource.getPv({limit: 60})
      .then(res => {
        const content = res.body.content.reverse()
        const keys = (content || []).map(d => d.date)
        const values = (content || []).map(d => ({ name: d.date, value: d.count }))
        this.chartDayData.xAxis.data = keys
        this.chartDayData.series[0].data = values
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less">
  .page-stat-pv {

    .chart {
      width: 100%;
    }

    .stat-chart {
      margin-bottom: 45px;
    }
  }
</style>
