<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <span class="name">{{ name }}</span>
          <span class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/Eventidus/vue-test">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://www.yuque.com/shuiruohanyu/agxcua/owdi4u">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <a target="_blank" href="https://apifox.com/apidoc/shared-e2644216-aad4-4529-a630-78f0631ab076">
            <el-dropdown-item>API Docs</el-dropdown-item>
          </a>
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>Update Password</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dialog :visible.sync="showDialog" title="修改密码" width="500px">
          <el-form ref="passForm" label-width="120px" :model="passForm" :rules="rules">
            <el-form-item prop="oldPassword" label="旧密码">
              <el-input v-model="passForm.oldPassword" show-password size="small" />
            </el-form-item>
            <el-form-item prop="newPassword" label="新密码">
              <el-input v-model="passForm.newPassword" show-passwor size="small" />
            </el-form-item>
            <el-form-item prop="confirmPassword" label="重复新密码">
              <el-input v-model="passForm.confirmPassword" show-passwor ize="small" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini">确认修改</el-button>
              <el-button size="mini">取消修改</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      showDialog: false,
      passForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, message: '旧密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '新密码不能为空', trigger: 'blur' }, {
          min: 6, max: 16, message: '密码长度应为6-16位'
        }],
        confirmPassword: [{ required: true, message: '重复密码不能为空', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.passForm.newPassword !== value) {
                callback(new Error('两次密码不一致'))
                return
              }
              callback()
            }
          }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    updatePassword() {
      this.showDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      align-items: center;
      .avatar-wrapper {
        display: flex;
        align-items: center;
        margin-top: 5px;
        position: relative;

        .username{
          width: 25px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          margin-right: 4px;
          border-radius: 50%;
          background: rgb(177, 231, 138);
          color: #fff;

        }
        .name{
          margin-right: 10px;
          font-size: 14px;
        }
        .user-avatar {
          cursor: pointer;
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
        .el-icon-setting{
          font-size: 20px;
          cursor: pointer;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
