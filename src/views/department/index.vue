<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" :props="defaultProps" default-expand-all>
        <template v-slot="{data}">
          <el-row style="width:100%;height: 40px;" type="flex" justify="space-between" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [
        { name: '传智教育', managerName: '管理员', children: [{
          name: '总裁办',
          managerName: '张三'
        }, {
          name: '行政部',
          managerName: '李四'
        }, {
          name: '人事部',
          managerName: '王五'
        }
        ]
        }
      ],
      defaultProps: {
        label: 'name',
        children: 'children'
      }

    }
  }
}
</script>
<style scoped>
.app-container{
  padding: 30px 40px;
  font-size: 14px;
}
.tree-manager{
width: 50px;
display: inline-block;
margin: 10px;
}
</style>
