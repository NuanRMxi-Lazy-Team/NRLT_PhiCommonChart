# 擴展功能

本頁介紹譜面高級組成部分：RPE擴展功能。
::: info 提示
**本頁所有字段兼容等級為 3。**
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

## 結構規範
| 唯一標識符 |     字段名      |                        類型                         | 描述       | 默認值 | 加入版本 |
|:-----:|:------------:|:-------------------------------------------------:|:---------|:---:|:----:|
|   1   | ScaleXEvents | List\<[Event](/zh_hant/chart_format/event.md)\<float\>\>  | X軸縮放事件列表 | []  |  1   |
|   2   | ScaleYEvents | List\<[Event](/zh_hant/chart_format/event.md)\<float\>\>  | Y軸縮放事件列表 | []  |  1   |
|   3   | ColorEvents  | List\<[Event](/zh_hant/chart_format/event.md)\<byte[]\>\> | 顏色事件列表   | []  |  1   |
|   4   |  TextEvents  | List\<[Event](/zh_hant/chart_format/event.md)\<string\>\> | 文本事件列表   | []  |  1   |

## 行為規範

- `ScaleXEvents` 和 `ScaleYEvents` 定義了判定線在 X 軸和 Y 軸的縮放事件，事件的值為縮放倍率。
- `ColorEvents` 定義了判定線顏色變化事件，事件的值為顏色的 RGB 值 3 個字節。
- `ColorEvents` 有事件的情況下應當忽略 FC/AP 提示器對判定線的染色。
- `ColorEvents` 的插值需要三個數值同時插值。
- `TextEvents` 有事件的情況下應當忽略 FC/AP 提示器對判定線的染色。
- `TextEvents` 有事件的情況下，應當忽略判定線默認紋理、[判定線自定義紋理](/zh_hant/chart_format/judge_line.md#texturedata) 和 [判定線自定義 GIF 紋理](/zh_hant/chart_format/judge_line.md#isgiftexture) 的顯示。
- `TextEvents` 的值為字符串，表示判定線上的文本內容，文本顯示位置受判定線 [Anchor](/zh_hant/chart_format/judge_line.md#anchor) 影響。
- `TextEvents` 的文本內容可以包含換行符 `\n`，表示多行文本。

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
