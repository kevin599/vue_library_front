<template>
  <div>
    <!-- 顶部轮播图 -->
    <div class="block">
      <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
      <el-carousel height="300px" :interval="4000" type="card">
        <el-carousel-item v-for="item in imgList" :key="item">
          <!-- 循环四张图片 -->
          <img :src="item.src" alt="图图呢" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 天气和日历 -->
    <el-row>
      <el-col :span="12" style="margin: 0 auto; text-align: center"> </el-col>

      <el-col :span="12" style="float: right;">
        <el-calendar v-model="value">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div :class="data.isSelected ? 'is-selected datebox' : 'datebox'">
              <div
                :class="
                  holiday[data.day.split('-').slice(1).join('-')]
                    ? holiday[data.day.split('-').slice(1).join('-')].holiday
                      ? 'isholiday'
                      : ' '
                    : ''
                "
              >
                {{ data.day.split("-").slice(1).join("-") }}
              </div>
              <div
                :class="
                  holiday[data.day.split('-').slice(1).join('-')]
                    ? holiday[data.day.split('-').slice(1).join('-')].holiday
                      ? 'isholiday'
                      : ' '
                    : ''
                "
              >
                {{
                  holiday[data.day.split("-").slice(1).join("-")]
                    ? holiday[data.day.split("-").slice(1).join("-")].name
                    : ""
                }}
              </div>
            </div>
          </template>
        </el-calendar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "UserIndex",

  data() {
    return {
      value: new Date(),
      holiday: [],
      imgList: [
        {
          src: "http://www.zjkju.edu.cn/images/0.jpg",
          label: "第一张",
        },
        {
          src: "http://www.zjkju.edu.cn/images/zhuantiwang.jpg",
          label: "第二张",
        },
        {
          src: "http://www.zjkju.edu.cn/images/zhuantiwang2.jpg",
          label: "第三张",
        },
      ],
    }
  },

  mounted() {
    let date = new Date()
    console.log(date.getFullYear() + "-" + (date.getMonth() + 1))
    this.$http
      .get(
        `http://timor.tech/api/holiday/year/${
          date.getFullYear() + "-" + (date.getMonth() + 1)
        }`
      )
      .then((res) => {
        console.log(res.data)
        this.holiday = res.data.holiday
        console.log(this.holiday)
      })
  },

  //生命周期
  //   created() {

  //   },
  methods: {},
}
</script>

<style lang="css" scoped>
/* 轮播图样式 */
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.datebox {
  text-align: center;
}
.isholiday {
  color: red;
}
.is-selected {
  color: #1989fa;
}
</style>
