<template>
  <div>
    <div id="quillWrapper">

      <div ref="quillContainer" id="quill-container"></div>

      <div class="quill-save-button-wrapper" v-if="useSaveButton">
        <el-button type="primary"
                   class="quill-save-button"
                   size="large"
                   @click="saveContent">
          {{ buttonText ? buttonText : '保存' }}
        </el-button>

      </div>

      <div v-if="showPreview" ref="livePreview" class="ql-editor"></div>

    </div>

    <el-dialog title="上传图片" v-model="uploadDialogVisible">
      <el-upload ref="uploader"
                 :action="uploadServerEntry"
                 type="drag"
                 :multiple="false"
                 :show-upload-list="false"
                 :thumbnail-mode="true"
                 :on-preview="handleUploadPreview"
                 :on-remove="handleUploadRemove"
                 :on-success="handleUploadSuccess"
                 :on-error="handleUploadError"
      >
        <i class="el-icon-upload"></i>
        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>

  </div>
</template>

<script>
  import Quill from 'quill'
  import QuillDelta from 'quill-delta'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import config from 'config'

  const EVENT_NAMES = {
    CHANGED: 'editor-updated',
    SAVED: 'save-content'
  }
  const defaultToolbar = [
    // 字体
    [{'font': []}],
    // 大小
    [{'size': ['small', false, 'large', 'huge']}],
    // 标题
    [{'header': [false, 1, 2, 3, 4, 5, 6]}],
    [{'header': 1}, {'header': 2}],
    // 修饰
    ['bold', 'italic', 'underline', 'strike'],
    // 文字颜色、背景颜色
    [{'color': []}, {'background': []}],
    ['link', 'image'],
    // 对齐
    [{'align': []}],
    // 阅读方向
    [{'direction': 'rtl'}],
    // 代码块
    ['blockquote', 'code-block'],
    // 有序无序列表
    [{'list': 'ordered'}, {'list': 'bullet'}],
    // 角标
    [{'script': 'sub'}, {'script': 'super'}],
    // 缩进
    [{'indent': '-1'}, {'indent': '+1'}],
    // 数学公式
    ['formula'],
    // 清空格式
    ['clean']
  ]

  export default {
    name: 'zy-rich-editor',
    props: {
      uploadServerEntry: {
        type: String,
        default () {
          return config.server + '/upload/image'
        }
      },
      uploadImageUrlGetter: {
        type: Function,
        default () {
          // TODO 这里服务器最好返回全链接，在前端拼半链接有点恶心
          // return res => ('http://qianhaikeji.s1.natapp.cc' + res.url)
          return res => res.url
        }
      },
      // 本来这是vue2-editor作为绑定编辑器初始值用的，
      // 但是因为加了watch然后又和update事件一起作用的时候就有bug，循环更新内容，导致文本框内容乱跳，
      // 所以建议不要用该字段初始化文本框值，
      // 而是外部主动调用setContent设置编辑器初始值，然后用editor-updated通知修改后的值给外部
      editorContent: String,
      placeholder: String,
      buttonText: String,
      editorToolbar: Array,
      useSaveButton: {
        type: Boolean,
        default () {
          return false
        }
      },
      showPreview: {
        type: Boolean,
        default () {
          return false
        }
      }
    },

    data () {
      return {
        uploadDialogVisible: false,
        quill: null,
        editor: null,
        toolbarModule: null,
        toolbar: this.editorToolbar ? this.editorToolbar : defaultToolbar
      }
    },

    mounted () {
      var Font = Quill.import('formats/font')
      // 注册新的字体
      Font.whitelist = [
        'mirza',
        'roboto',
        '宋体,SimSun',
        '楷体,楷体_GB2312, SimKai',
        '微软雅黑,Microsoft YaHei',
        '黑体, SimHei',
        '隶书, SimLi',
        'andale mono',
        'arial, helvetica,sans-serif',
        'arial black,avant garde',
        'comic sans ms',
        'impact,chicago',
        'times new roman'
      ]
      Quill.register(Font, true)

      this.quill = new Quill(this.$refs.quillContainer, {
        modules: {
          // 高亮代码块
          // syntax: true, // 依赖 highlight.js
          toolbar: this.toolbar
        },
        placeholder: this.placeholder ? this.placeholder : '',
        theme: 'snow'
      })

      this.toolbarModule = this.quill.getModule('toolbar')
      this.editor = document.querySelector('.ql-editor')
      this.setContent(this.editorContent)
      this.setCustomImageHandler()

      if (this.$refs.livePreview !== undefined || false) {
        this.quill.on('text-change', () => {
          this.$refs.livePreview.innerHTML = this.editor.innerHTML
          this.$emit(EVENT_NAMES.CHANGED, this.editor.innerHTML)
        })
      } else {
        this.quill.on('text-change', () => {
          this.$emit(EVENT_NAMES.CHANGED, this.editor.innerHTML)
        })
      }
    },

    watch: {
      editorContent () {
        this.setContent(this.editorContent)
      }
    },

    methods: {
      setContent (html) {
        this.editor.innerHTML = html
      },
      handleUploadError () {
        console.log(arguments)
      },
      handleUploadRemove (file, fileList) {
        console.log(file, fileList)
      },
      handleUploadPreview (file) {
        console.log(file)
      },
      handleUploadSuccess (res) {
        console.log(arguments)
        const range = this.quill.getSelection(true)
        const fullImageUrl = this.uploadImageUrlGetter()(res)
        if (range) {
          const delta = new QuillDelta().retain(range.index)
            .delete(range.length)
            .insert({image: fullImageUrl})
          this.quill.updateContents(delta, 'user')
        }
        this.uploadDialogVisible = false
        this.$refs.uploader.clearFiles()
      },
      saveContent (value) {
        this.$emit(EVENT_NAMES.SAVED, this.editor.innerHTML)
      },
      setCustomImageHandler (quill) {
        this.toolbarModule.addHandler('image', () => {
          this.uploadDialogVisible = true
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #quill-container {
    height: 400px
  }

  .quill-save-button-wrapper {
    text-align: right
  }

  .quill-save-button {
    display: inline-block;
    margin-top: 10px;
    text-align: center;
  }

  .el-upload {
    margin: auto;
  }
</style>
