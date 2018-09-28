<template>
  <div class="register">
    <el-card class="box">
      <div slot="header"
           class="header">
        Catch-Admin-注册
      </div>
      <div class="form">
        <el-form :model="regForm"
                 :rules="regRules"
                 ref="regForm">
          <el-form-item prop="host">
            <el-input placeholder="输入您的专属域"
                      size="large"
                      v-model="regForm.host">
              <template slot="prepend">https://edaoe.com/</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input v-model="regForm.mobile"
                      size="large"
                      placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-row>
            <el-col :span="16">
                <el-input v-model="regForm.captcha"
                          placeholder="请输入图片验证码"></el-input>
            </el-col>
            <el-col :span="8" class="captcha-wrapper">
                <img class="captcha"
                     :src="captchaUrl"
                     alt="验证码不见了"
                     @click="getCaptcha">
            </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-col :span="16">
              <el-form-item prop="smsCode">
                <el-input v-model="regForm.smsCode"
                          size="large"
                          placeholder="请输入您的短信验证码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button @click="sendSmsCode"
                         :disabled="sendDisabled">{{sendText}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="regForm.password"
                      size="large"
                      placeholder="请输入您的密码"
                      type="password"
                      @keyup.enter.native="handleRegister"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button"
                       type="success"
                       :loading="loading"
                       @click="handleRegister">注册</el-button>
          </el-form-item>
          <div class="text">已注册？去
            <router-link to="/login">登录</router-link>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { common_captcha, common_sendSMSCode } from '@/api/common'
import Cookies from 'js-cookie'
import { CAPTCHA_TOKEN } from '@/assets/js/const'
import { setCaptchaToken, getCaptchaToken } from '@/utils/auth.js'

export default {
  name: 'register',
  data() {
    return {
      redirect: undefined,
      loading: false,
      sendDisabled: false,
      sendText: '发送验证码',
      captchaUrl: '',
      regForm: {
        host: '',
        mobile: '',
        smsCode: '',
        password: '',
        captcha: ''
      },
      regRules: {
        host: [
          {
            required: true,
            message: '输入您的专属域',
            trigger: ['blur', 'change']
          },
          {
            min: 4,
            max: 20,
            message: '专属域长度应在 4 到 20 个字符',
            trigger: ['blur', 'change']
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: ['blur', 'change']
          },
          {
            len: 11,
            message: '手机号长度应为 11 位',
            trigger: ['blur', 'change']
          }
        ],
        captcha: [
          {
            required: true,
            message: '请输入图片验证码',
            trigger: ['blur', 'change']
          },
          { len: 4, message: '长度为 4 个字符', trigger: ['blur', 'change'] }
        ],
        smsCode: [
          {
            required: true,
            message: '请输入短信验证码',
            trigger: ['blur', 'change']
          },
          { len: 4, message: '长度为 4 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['blur', 'change']
          },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    getCaptcha() {
      common_captcha({}).then(data => {
        this.captchaUrl = data.base64
        Cookies.set(CAPTCHA_TOKEN, data.captchaToken, {
          expires: 1
        })
      })
    },
    sendSmsCode() {
      let regForm = this.$refs.regForm
      regForm.validateField('captcha', error => {
        if (!error) {
          regForm.validateField('mobile', errorMobile => {
            if (!errorMobile) {
              this.sendDisabled = true
              common_sendSMSCode({
                data: {
                  captcha: this.regForm.captcha,
                  captchaToken: Cookies.get(CAPTCHA_TOKEN),
                  mobile: this.regForm.mobile
                }
              })
                .then(() => {
                  this.setTimer(59)
                })
                .catch(() => {
                  this.sendDisabled = false
                })
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    setTimer(seconds) {
      if (seconds === 0) {
        this.sendText = '发送验证码'
        this.sendDisabled = false
      } else {
        this.sendText = `重新发送(${seconds})`
        seconds--
        setTimeout(() => {
          this.setTimer(seconds)
        }, 1000)
      }
    },
    handleRegister() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Register', this.regForm)
            .then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style lang="stylus" scoped>
  .register
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    display flex
    .box
      position relative
      margin auto
      width 450px
      bottom 20px
      border-radius 8px
      background-color #ffffff
      box-shadow 0 12px 24px 0 rgba(7, 17, 27, 0.2)
      .header
        text-align center
        font-size 23px
        font-weight 500
      .form
        margin auto
        width 80%
        .el-form
          .el-input__inner
            border-radius 3px
          .captcha-wrapper
            height 40px
          .captcha
            width 100%
            height 40px
            display inline-block
          .button
            width 100%
          .text
            text-align right
</style>
