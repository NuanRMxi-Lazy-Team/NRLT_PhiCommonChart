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

## 行为规范

- `ScaleXEvents` 和 `ScaleYEvents` 定义了判定线在 X 轴和 Y 轴的缩放事件，事件的值为缩放倍率。
- `ColorEvents` 定义了判定线颜色变化事件，事件的值为颜色的 RGB 值 3 个字节。
- `ColorEvents` 有事件的情况下应当忽略 FC/AP 提示器对判定线的染色。
- `ColorEvents` 的插值需要三个数值同时插值。
- `TextEvents` 有事件的情况下应当忽略 FC/AP 提示器对判定线的染色。
- `TextEvents` 有事件的情况下，应当忽略判定线默认纹理、[判定线自定义纹理](/chart_format/judge_line.md#texturedata) 和 [判定线自定义 GIF 纹理](/chart_format/judge_line.md#isgiftexture) 的显示。
- `TextEvents` 的值为字符串，表示判定线上的文本内容，文本显示位置受判定线 [Anchor](/chart_format/judge_line.md#anchor) 影响。
- `TextEvents` 的文本内容可以包含换行符 `\n`，表示多行文本。

## proto 段落

```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;
message ExtendedEventLayer {
   repeated Event_Single ScaleXEvents = 1;
   repeated Event_Single ScaleYEvents = 2;
   repeated Event_Array_Byte ColorEvents = 3;
   repeated Event_String TextEvents = 4;
}
```