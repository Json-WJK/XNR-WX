navbar
===

## 使用

```vue
<template>
    <wk-navbar></wk-navbar>
</teamplate>

<script>

    import wkNavbar from 'wackui/components/navbar'

    export default {
        components: {
            wkNavbar
        }
    }
</script>
```

## 属性

| 属性 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| labelData | Array | `[]` | navbar数据 `{title: '导航条文字'}` |
| animate | Boolean | `true` | navbar是否动画 |
| selectedColor | String | `#fc3e62` | 选中的颜色 |
| selectedColor | String | `#fc3e62` | 选中的颜色 |
| transition | Number | `300` | 当前选中item和pointer过渡时间 |
| defaultIndex | Number | `0` | 默认选中 |

## 事件

| 事件 | 参数 | 说明 |
| :-- | :-- | :-- |
| tabchange | `event` | 当前选中的发生变化时触发 |
