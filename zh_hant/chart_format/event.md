# 事件

本段介紹單個事件結構。
::: info 提示
**本頁所有字段兼容等級為 0。**
:::

## JSON 示例

```json
{
  "StartBeat": 0,
  "EndBeat": 1,
  "StartValue": 0.0,
  "EndValue": 1.0
}
```

## 結構規範

| 唯一標識符 |    字段名     |  類型   |      描述       | 默認值 | 加入版本 |
|:-----:|:----------:|:-----:|:-------------:|:---:|:----:|
|   1   | StartBeat  | float |    事件開始拍數     |  -  |  1   |
|   2   |  EndBeat   | float |    事件結束拍數     |  -  |  1   |
|   3   | StartValue |   T   |     事件開始值     |  -  |  1   |
|   4   |  EndValue  |   T   |     事件結束值     |  -  |  1   |
|   5   | StartTime  | float | 事件開始時間（單位：毫秒） |  -  |  1   |
|   6   |  EndTime   | float | 事件結束時間（單位：毫秒） |  -  |  1   |

## 行為規範

- `StartBeat` 和 `EndBeat` 定義了事件的時間範圍，`EndBeat` 不可能小於 `StartBeat`。
- `Value` 的類型可能是任意的，比如 `ColorEvent`中、`Value` 的類型是 `byte[]`。
- 我們沒有為事件設計緩動，事件的值均為線性變化。
- `StartTime` 和 `EndTime` 分別表示事件開始和結束時間，單位為毫秒。它們與 `StartBeat` 和 `EndBeat` 同時存在，實際使用時可以根據需要選擇。

## proto 段落
- 因為 T 的類型可能不同，所以我們將事件分為多種類型，分別為 `Event_Array_Byte`、`Event_Byte`、`Event_Single` 和 `Event_String`。
```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;
message Event_Array_Byte {
   float StartBeat = 1;
   float EndBeat = 2;
   bytes StartValue = 3;
   bytes EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
message Event_Byte {
   float StartBeat = 1;
   float EndBeat = 2;
   uint32 StartValue = 3;
   uint32 EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
message Event_Single {
   float StartBeat = 1;
   float EndBeat = 2;
   float StartValue = 3;
   float EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
message Event_String {
   float StartBeat = 1;
   float EndBeat = 2;
   string StartValue = 3;
   string EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
```
