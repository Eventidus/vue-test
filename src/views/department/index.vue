<template>
  <div class="container">
    <div class="app-container">
      <el-tree :data="depts" :props="defaultProps" default-expand-all />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Department',
  data() {
    return {
      depts: [
        { name: '传智教育', children: [{
          name: '总裁办'
        }, {
          name: '行政部'
        }, {
          name: '人事部'
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
