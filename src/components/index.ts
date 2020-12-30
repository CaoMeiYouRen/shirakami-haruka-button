import Vue from 'vue'
import _ from 'lodash'
const requireComponent = require.context('@/components', true, /\.vue$/)
// 批量注册组件
requireComponent.keys().forEach((fileName) => {
    const componentConfig = requireComponent(fileName)
    const componentName = _.upperFirst(// 调整风格为首字母大写驼峰
        _.camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
    )
    Vue.component(componentName, componentConfig.default || componentConfig)
})