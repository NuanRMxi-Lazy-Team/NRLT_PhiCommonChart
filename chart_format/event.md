# 事件

本段介绍单个事件结构。
::: info 提示
**本页所有字段兼容等级为 0。**
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

## 结构规范

| 唯一标识符 |    字段名     |  类型   |      描述       | 默认值 | 加入版本 |
|:-----:|:----------:|:-----:|:-------------:|:---:|:----:|
|   1   | StartBeat  | float |    事件开始拍数     |  -  |  1   |
|   2   |  EndBeat   | float |    事件结束拍数     |  -  |  1   |
|   3   | StartValue |   T   |     事件开始值     |  -  |  1   |
|   4   |  EndValue  |   T   |     事件结束值     |  -  |  1   |
|   5   | StartTime  | float | 事件开始时间（单位：毫秒） |  -  |  1   |
|   6   |  EndTime   | float | 事件结束时间（单位：毫秒） |  -  |  1   |

## 行为规范

- `StartBeat` 和 `EndBeat` 定义了事件的时间范围，`EndBeat` 不可能小于 `StartBeat`。
- `Value` 的类型可能是任意的，比如 `ColorEvent`中、`Value` 的类型是 `byte[]`。
- 我们没有为事件设计缓动，事件的值均为线性变化。
- `StartTime` 和 `EndTime` 分别表示事件开始和结束时间，单位为毫秒。它们与 `StartBeat` 和 `EndBeat` 同时存在，实际使用时可以根据需要选择。

## proto 段落
- 因为 T 的类型可能不同，所以我们将事件分为多种类型，分别为 `Event_Array_Byte`、`Event_Byte`、`Event_Single` 和 `Event_String`。
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