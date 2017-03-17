<!--
 * @author Ling<i@zeroling.com>
-->
<template>
  <div class="page-stat-overall">
    <ul class="user-data">
      <li>
        <div class="data-box">
          <div class="data-box-header">累计用户</div>
          <p>{{ userCount | numbernic }}</p>
        </div>
      </li>
      <li>
        <div class="data-box">
          <div class="data-box-header">昨日新增用户</div>
          <p>{{ userAddYesterday | numbernic }}</p>
        </div>
      </li>
      <li>
        <div class="data-box">
          <div class="data-box-header">昨日活跃用户</div>
          <p>{{ userActiveYesterday | numbernic }}</p>
        </div>
      </li>
    </ul>
    <div class="user-data-chart">
      <chart :options="chartData" class="chart"></chart>
    </div>
    <div class="user-data-table">
      <h2>数据明细</h2>
      <el-table
        :data="dailyUsers"
        border
        class="table">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="total"
          label="累计用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="add"
          label="新增用户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="active"
          label="活跃用户">
        </el-table-column>
      </el-table>
    </div>
    <pagination ref="pagination" :fetch-data="fetchData" @fetched="dataFetched"></pagination>
  </div>
</template>

<script>
import _ from 'lodash'
import dataService from 'services/dataService'
import pagination from 'components/pagination'

export default {
  components: { pagination },
  data () {
    return {
      queryCond: {
        sort: 'date',
        sortDirection: 'desc'
      },
      userCount: 0, // 总用户量
      userAddYesterday: 0, // 昨日新增
      userActiveYesterday: 0, // 昨日活跃用户
      dailyUsers: []
    }
  },
  computed: {
    dailyUsersInChart () {
      return _.sortBy(this.dailyUsers, ['date'])
    },
    chartData () {
      return {
        title: {
          text: '用户量统计'
        },
        color: ['#3c763d', '#31708f', '#a94442'],
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['总用户量', '新增用户量', '活跃用户量']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.dailyUsersInChart.map(ele => ele.date)
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '总用户量',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: { opacity: 0 } },
            data: this.dailyUsersInChart.map(ele => ele.total)
          },
          {
            name: '新增用户量',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            stack: '新增',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: { opacity: 0 } },
            data: this.dailyUsersInChart.map(ele => ele.add)
          },
          {
            name: '活跃用户量',
            type: 'line',
            symbol: 'circle',
            smooth: true,
            stack: '活跃',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: { normal: { opacity: 0 } },
            data: this.dailyUsersInChart.map(ele => ele.active)
          }
        ]
      }
    }
  },
  methods: {
    getYesterdayInfo: function (pageParams) {
      return dataService.getUserActivation({limit: 1, sort: 'date', sortDirection: 'desc'}).then(res => {
        let yestdayInfo = res.body.content[0]
        if (yestdayInfo) {
          this.userCount = yestdayInfo.total
          this.userAddYesterday = yestdayInfo.increment
          this.userActiveYesterday = yestdayInfo.viewCount
        }
      })
    },
    fetchData: function (pageParams) {
      let queryParams = Object.assign({}, this.queryCond, pageParams)
      return dataService.getUserActivation(queryParams)
    },
    dataFetched: function (content) {
      this.dailyUsers = (content || []).map((item, idx) => {
        return { date: item.date, total: item.total, add: item.increment, active: item.viewCount }
      })
    }
  },
  created () {
    this.getYesterdayInfo()
  }
}
</script>

<style rel="stylesheet/less" lang="less">
  .page-stat-overall {
    .user-data {
      font-size: 0;
      li {
        font-size: 14px;
        display: inline-block;
        width: 33.333%;
      }
      .data-box {
        box-sizing: border-box;
        margin: 0 15px;
        border: 1px solid #e0e0e0;
        border-radius: 2px;
        text-align: center;
      }
      .data-box-header {
        background-color: #f7f8f7;
        padding: 12px 0;
        font-weight: bold;
      }
      p {
        font-size: 23px;
        white-space: nowrap;
        font-weight: bold;
        padding: 20px 16px;
      }
    }
    .user-data-chart {
      margin: 45px 0 0;
      .chart {
        width: 100%;
      }
    }
    .user-data-table {

    }

  }
</style>
