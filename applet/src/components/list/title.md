title
===

## 使用

```vue
<template>
    <wk-title></wk-title>
</teamplate>

<script>

    import wkTitle from 'wackui/components/navbar'

    export default {
        components: {
            wkTitle
        }
    }
</script>
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| :-- | :-- | :-- | :-- |
| content | String | `` | 标题文字 |
| fontSize | String | `32rpx` | 字体大小 |
| color | String | `#606060` | 字体颜色 |
| icon | Boolean | `false` | 标题左边的边框 |
| iconStyle | String | `默认样式` | 边框的样式暂时不支持icon图标 任何合法的css样式 |
| line | Boolean | `false` | 是否显示线 显示线的时候文字自动居中显示 |
| lineStyle | String | `默认样式` | 文字后的线样式 任何合法的css样式 |




