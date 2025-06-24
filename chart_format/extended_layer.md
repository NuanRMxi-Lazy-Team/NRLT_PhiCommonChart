# 扩展功能

本页介绍谱面高级组成部分：RPE扩展功能。
::: info 提示
**本页所有字段兼容等级为 3。**
:::

## JSON 示例

```json
{
  "ScaleXEvents": [],
  "ScaleYEvents": [],
  "ColorEvents": [],
  "TextEvents": []
}
```

## 结构规范
| 唯一标识符 |     字段名      |                        类型                         | 描述       | 默认值 | 加入版本 |
|:-----:|:------------:|:-------------------------------------------------:|:---------|:---:|:----:|
|   1   | ScaleXEvents | List\<[Event](/chart_format/event.md)\<float\>\>  | X轴缩放事件列表 | []  |  1   |
|   2   | ScaleYEvents | List\<[Event](/chart_format/event.md)\<float\>\>  | Y轴缩放事件列表 | []  |  1   |
|   3   | ColorEvents  | List\<[Event](/chart_format/event.md)\<byte[]\>\> | 颜色事件列表   | []  |  1   |
|   4   |  TextEvents  | List\<[Event](/chart_format/event.md)\<string\>\> | 文本事件列表   | []  |  1   |
