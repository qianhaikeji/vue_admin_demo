<!-- 
 * @author 曹宏涛<caohongtao@qianhaikeji.cn> 
-->
<template>
  <div class="user-profile-page">
    <back-to-list></back-to-list>
    <el-form ref="form" :model="form" label-width="100px">
      <table v-if="currentMode === 'add'">
        <tr>
          <td><el-form-item label="手机号"><el-input type="number" v-model="newUser.phone"></el-input></el-form-item></td>
          <td><el-form-item label="密码"><el-input type="password" v-model="newUser.password"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td>
            <el-form-item><el-button type="primary" @click="addFakeUser" size="large">添加</el-button></el-form-item>
          </td>
        </tr>
      </table>
      <table v-if="currentMode === 'modify'">
        <tr>
          <td><el-form-item label="头像"><img :src="profile.avatar" class="avatar"></el-form-item></td>
          <td>
            <el-upload :action="uploadURL" :on-remove="handleRemove" :on-preview="handlePreview" :on-success="handleUploadSuccess">
              <el-button size="small" type="primary">修改头像</el-button>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td colspan="3"><el-form-item label="简介"><el-input class="brief" type="textarea" v-model="profile.brief" :maxlength="250"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td><el-form-item label="会员ID"><el-input :readonly="true" class="readonly" v-model="profile.id"></el-input></el-form-item></td>
          <td><el-form-item label="作品数"><el-input :readonly="true" class="readonly" v-model="profile.workCount"></el-input></el-form-item></td>
          <td><el-form-item label="被浏览次数"><el-input :readonly="true" class="readonly" v-model="profile.viewCount"></el-input></el-form-item></td>
        </tr>
        <tr>
          <td><el-form-item label="注册时间"><el-date-picker :readonly="true" class="readonly" v-model="profile.regDate" type="date" placeholder="选择日期"></el-date-picker></el-form-item></td>
          <td><el-form-item label="最后登录时间"><el-date-picker :readonly="true" class="readonly" v-model="profile.lastLogin" type="date" placeholder="选择日期"></el-date-picker></el-form-item></td>
          <td><el-form-item label="最后发布时间"><el-date-picker :readonly="true" class="readonly" v-model="profile.lastPostWorkTime" type="date" placeholder="选择日期"></el-date-picker></el-form-item></td>
        </tr>
        <tr>
          <td><el-form-item label="手机号"><el-input :readonly="currentMode !== 'add'" :class="{'readonly': currentMode !== 'add'}" v-model="profile.phone"></el-input></el-form-item></td>
          <td><el-form-item label="昵称"><el-input v-model="profile.username"></el-input></el-form-item></td>
          <td><el-form-item label="性别">
            <el-radio class="radio" v-model="profile.sex" label="男">男</el-radio>
            <el-radio class="radio" v-model="profile.sex" label="女">女</el-radio>
          </el-form-item></td>
        </tr>
        <tr>
          <td><el-form-item label="邮箱"><el-input v-model="profile.email"></el-input></el-form-item></td>
          <td>
          <el-form-item label="所在地">
            <el-select placeholder="请选择省" class="form-province" v-model="profile.province" @change="profile.city = ''">
              <el-option v-for="p in provinces" :label="p" :value="p"></el-option>
            </el-select>
            <el-select placeholder="请选择市" class="form-city" v-model="profile.city">
              <el-option v-for="c in cities[profile.province]" :label="c" :value="c"></el-option>
            </el-select>
          </el-form-item>
          </td>
          <td>
            <el-form-item label="用户职业">
              <el-select v-model="profile.type" placeholder="请选择活动区域">
                <el-option label="化妆师" :value="0"></el-option>
                <el-option label="道具师" :value="1"></el-option>
                <el-option label="服装师" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-form-item label="技能">
              <el-tag v-if="!edittingSkill" v-for="skill in profile.skills" type="primary" class="skill">{{ skill.name }}</el-tag>
              <el-button v-if="!edittingSkill" type="primary" size="small" @click="editSkill()">编辑</el-button>

              <el-input v-if="edittingSkill" :maxlength="5" v-for="(skill, index) in skillOnEditting" v-model="skillOnEditting[index]" class="skill"></el-input>
              <el-button v-if="edittingSkill" type="primary" size="small" @click="confirmSkill()">确认</el-button>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item>
              <el-button-group>
                <el-button type="primary" @click="modifyUser" size="large">修改</el-button>
                <el-button type="primary" @click="previewUser" size="large">预览</el-button>
              </el-button-group>
            </el-form-item>
          </td>
          <td v-if="currentMode === 'modify'">
            <el-form-item>
              <el-button-group>
                <el-button :type="profile.checked ? 'danger' : 'primary'"
                           :icon="profile.checked ? 'circle-close' : 'circle-check'"
                           @click="doCheck" size="large">
                  {{ profile.checked ? '反审核' : '审核'}}
                </el-button>
                <el-button :type="profile.recommend ? 'danger' : 'primary'"
                           :icon="profile.recommend ? 'caret-bottom' : 'caret-top'"
                           @click="doRecommend" size="large">
                  {{ profile.recommend ? '取消置顶' : '置顶'}}
                </el-button>
              </el-button-group>
            </el-form-item>
          </td>
        </tr>
      </table>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { Notification } from 'element-ui'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import config from 'config'
import backToList from 'components/backToList'
const dict = {'北京': ['北京'], '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'], '上海': ['上海'], '天津': ['天津'], '重庆': ['重庆'], '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'], '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'], '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'], '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'], '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'], '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'], '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'], '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'], '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'], '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'], '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'], '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'], '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'], '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'], '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'], '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'], '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'], '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'], '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'], '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'], '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'], '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'], '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'], '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'], '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'], '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'], '香港': ['香港'], '澳门': ['澳门'], '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']}
export default {
  components: {
    backToList
  },
  data () {
    return {
      provinces: Object.keys(dict),
      cities: dict,
      uploadURL: config.server + '/upload/image',
      newUser: {
        phone: '',
        password: ''
      },
      profile: Object.assign({}, this.$store.state.user.profile),
      edittingSkill: false,
      skillOnEditting: []
    }
  },
  computed: {
    ...mapGetters({
      currentMode: 'currentMode'
    })
  },
  methods: {
    ...mapActions([
      'addUser',
      'updateUser',
      'checkUser',
      'uncheckUser',
      'recommendUser',
      'unrecommendUser'
    ]),
    ...mapMutations({
      viewProfile: 'GO_TO_PROFILE'
    }),
    addFakeUser: function () {
      this.addUser({profile: this.newUser, callback: () => this.viewProfile({mode: 'modify'})})
    },
    modifyUser: function () {
      this.updateUser({id: this.profile.id, info: this.profile})
    },
    previewUser: function () {
      window.open(`http://justyourstyle.cn/artist/details/${this.profile.id}`)
    },
    doCheck: function () {
      if (this.profile.checked) {
        this.uncheckUser({id: this.profile.id})
      } else {
        this.checkUser({id: this.profile.id})
      }
    },
    doRecommend: function () {
      if (this.profile.recommend) {
        this.unrecommendUser({id: this.profile.id})
      } else {
        this.recommendUser({id: this.profile.id})
      }
    },
    handlePreview (file) {
      window.open(file.url)
    },
    handleRemove (file) {
      this.profile.avatar = ''
    },
    handleUploadSuccess (file) {
      this.profile.avatar = file.url
    },
    editSkill () {
      // 拼成长度为4的数组，不够补''
      this.skillOnEditting = ['', '', '', '']
      for (let index in this.profile.skills) {
        this.skillOnEditting[index] = this.profile.skills[index].name
      }

      this.edittingSkill = true
    },
    confirmSkill () {
      if (_.some(this.skillOnEditting, skill => skill.length === 1)) {
        return Notification({ type: 'error', message: '擅长技能至少为2个字符' })
      }
      let skillCnt = _.chain(this.skillOnEditting)
                      .filter(skill => skill !== '')
                      .size()
                      .value()
      if (skillCnt === 0) {
        return Notification({ type: 'error', message: '请至少填写一个擅长技能' })
      }
      this.profile.skills = _.chain(this.skillOnEditting)
                   .filter(skill => skill !== '')
                   .uniq()
                   .map(skill => { return { name: skill } })
                   .value()

      this.edittingSkill = false
    },
    reloadUser () {
      this.profile = Object.assign({}, this.$store.getters.user)
    }
  },
  watch: {
    '$store.getters.user': 'reloadUser',
    '$store.getters.user.checked': 'reloadUser',
    '$store.getters.user.recommend': 'reloadUser',
    '$store.getters.user.phone': 'reloadUser'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}

td {
  width: 33%;
}

.el-form {
  min-width: 800px;
  max-width: 1200px;
  margin-top: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
}

.skill {
  margin-right: 15px;
}
.el-date-editor.el-input {
  width: 297px;
}

.el-select.form-province,
.el-select.form-city {
  width: 140px;
}
.el-select.form-city {
  float: right;
}

.el-input.skill {
  display: inline-block;
  text-align: center;
  width: 80px;
  margin-right: 10px;
}
</style>
<style>
.user-profile-page .brief textarea {
  resize: none;
  height: 75px;
}
</style>