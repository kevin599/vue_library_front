<template>
  <div>
    <!-- 顶部轮播图 -->
    <div class="block">
      <!-- <span class="demonstration">默认 Hover 指示器触发</span> -->
      <el-carousel height="500px" :interval="4000" arrow="always">
        <el-carousel-item v-for="item in imgList" :key="item">
          <!-- 循环四张图片 -->
          <img :src="item.src" alt="图图呢" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 天气和日历 -->
    <el-row>
      <el-col :span="12" style="margin: 0 auto; text-align: center">
        <el-card class="box-card" style="margin-top: 52px; padding-bottom: 0px">
          <h3 style="margin: 1px; text-align: left">学校要闻</h3>
          <ul v-for="item in list" :key="item" class="text item">
            <li>
              <el-divider content-position="left">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="item"
                  placement="right-end"
                >
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="text-decoration: none; color: #000"
                    >{{ item }}</a
                  >
                </el-tooltip>
              </el-divider>
            </li>
            <!-- <el-divider></el-divider> -->
          </ul>
        </el-card>
      </el-col>

      <el-col :span="12" style="float: right">
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
      list: [
        "省教育厅二级巡视员曾声海莅校调研指导疫...",
        "【喜讯】学子在第四届“全国大学生结构设...",
        "【喜讯】我校被评为“2021年全国西部计划...",
        "【喜讯】我校荣获“广东省优秀学生会”称号",
        "学校召开党建工作例会",
        "【喜讯】我校学子被评为“广东省优秀共青...",
        "【喜讯】全国三等奖！学子在第十二届全国...",
        "157万人次观看！我校“青春心向党，建功新...",
      ],
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
  text-align: right;
}
.isholiday {
  color: red;
}
.is-selected {
  color: #1989fa;
}
.text {
  font-size: 14px;
}

.item {
  padding: 1px 0;
  list-style: none;
}

.box-card {
  width: 100%;
}
.el-card__body {
  padding: 0;
}

a:hover {
  color: red;
}
</style>
