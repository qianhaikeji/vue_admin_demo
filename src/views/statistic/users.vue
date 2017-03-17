<!--
 * @author Ling<i@zeroling.com>
-->
<template>
  <div class="page-stat-user">
    <div class="stat-cities">
      <chart v-if="!loadingDataCity" :options="chartDataCity" class="chart"></chart>
      <div class="loading" v-else><i class="el-icon-loading"></i> 城市数据加载中...</div>
    </div>

    <div class="stat-types">
      <chart v-if="!loadingDataType" :options="chartDataType" class="chart"></chart>
      <div class="loading" v-else><i class="el-icon-loading"></i> 职业数据加载中...</div>
    </div>

    <div class="stat-skills" v-for="(type, index) in types">
      <chart :options="chartDataSkillTypes[index]" class="chart"></chart>
    </div>
  </div>
</template>

<script>
import dataService from 'services/dataService'
const types = ['化妆师', '道具师', '服装师']
export default {
  components: {
  },
  data () {
    const color = ['rgba(96, 17, 39,0.8)', 'rgba(91, 60, 92,0.8)', 'rgba(8, 107, 174,0.8)', 'rgba(20, 150, 255,0.8)',
      'rgba(234, 43, 43,0.8)', 'rgba(228, 98, 64,0.8)', 'rgba(128, 143, 48,0.8)', 'rgba(177, 199, 61,0.8)',
      'rgba(223, 184, 67,0.8)', 'rgba(102, 190, 194,0.8)', 'rgba(205, 204, 204,0.8)']
    return {
      loadingDataCity: true,
      chartDataCity: {
        title: {
          text: '用户省市分布',
          x: 'center'
        },
        color: color,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: []
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },

      loadingDataType: true,
      chartDataType: {
        title: {
          text: '职业分布',
          x: 'center'
        },
        color: color,
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: types
        },
        series: [
          {
            name: '职业类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },

      types: types,
      loadingDataSkillTypes: [true, true, true],
      chartDataSkillTypes: [
        {
          title: {
            text: '化妆师擅长技能分布',
            x: 'center'
          },
          color: color,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: [
            {
              name: '技能类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, {
          title: {
            text: '道具师擅长技能分布',
            x: 'center'
          },
          color: color,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: [
            {
              name: '技能类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }, {
          title: {
            text: '服装师擅长技能分布',
            x: 'center'
          },
          color: color,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: []
          },
          series: [
            {
              name: '技能类型',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    freshUserRegionData () {
      dataService.getUserRegion()
        .then(res => {
          const data = res.body
          const keys = data.map(d => d.province)
          const values = data.map(d => ({ value: d.count, name: d.province }))
          this.chartDataCity.legend.data = keys
          this.chartDataCity.series[0].data = values
          this.loadingDataCity = false
        })
    },
    freshUserTypeData () {
      dataService.getUserTypes()
        .then(res => {
          // 0: 化妆师，1:道具师，2:服装师
          const data = res.body
          const values = data.map(d => ({
            value: d.count,
            name: types[d.type]
          }))
          this.chartDataType.series[0].data = values
          this.loadingDataType = false
        })
    },
    freshUserSkillData (type = 0) {
      dataService.getUserSkills(type)
        .then(res => {
          const data = res.body
          const keys = []
          const values = data.map(item => {
            if (!keys.includes(item.name)) {
              keys.push(item.name)
            }
            return {
              name: item.name,
              value: item.count
            }
          })
          this.chartDataSkillTypes[type].legend.data = keys
          this.chartDataSkillTypes[type].series[0].data = values
          setTimeout(() => {
            this.loadingDataSkillTypes[type] = false
          })
        })
    }
  },
  created () {
    this.freshUserRegionData()
    this.freshUserTypeData()
    this.freshUserSkillData(0)
    this.freshUserSkillData(1)
    this.freshUserSkillData(2)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less">
  .page-stat-user {

    .chart {
      width: 100%;
    }
  }
</style>
