<template>
  <div class="login">
    <el-card class="box">
      <h2 slot="header"
          class="header">Catch-Admin-登录</h2>
      <div class="form">
        <el-form :model="loginForm"
                 :rules="loginRules"
                 ref="loginForm">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile"
                      size="large"
                      placeholder="请输入您的手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password"
                      size="large"
                      placeholder="请输入您的密码"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"></el-input>
            <span class="show-pwd"
                  @click="showPwd">
              <icon name="eye" />
            </span>
          </el-form-item>
          <el-form-item class="checkbox">
            <el-checkbox v-model="loginForm.remember"
                         class="remember">在本设备保存登录状态</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button class="button"
                       type="primary"
                       :loading="loading"
                       @click="handleLogin">登录</el-button>
          </el-form-item>
          <div class="text">还没注册？去
            <router-link to="/register">注册</router-link>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        mobile: '15038593728',
        password: 'lx100861',
        remember: false
      },
      loginRules: {
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
      },
      loading: false,
      pwdType: 'password'
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
    showPwd() {
      this.pwdType = this.pwdType === 'password' ? '' : 'password'
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('Login', this.loginForm)
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
  }
}
</script>

<style lang="stylus" scoped>
  .login
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
        margin 0
      .form
        margin auto
        width 80%
        .el-form
          .el-input__inner
            border-radius 3px
          .checkbox
            position relative
            bottom 10px
            text-align right
            height 35px
            margin-bottom 5px
            .el-form-item__content
              line-height 35px
          .button
            width 100%
          .text
            text-align right
          .show-pwd
            position absolute
            right 10px
            top 2px
            font-size 16px
            color $dark_gray
            cursor pointer
            user-select none
</style>
