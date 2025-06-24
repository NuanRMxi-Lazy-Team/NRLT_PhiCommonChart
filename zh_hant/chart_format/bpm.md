# BPM

本頁介紹譜面單個BPM組成部分。
::: info 提示
**本頁所有字段兼容等級為 0。**
:::

## Json直觀示例

```json
{
  "Bpm": 120.0,
  "StartBeat": 0.0
}
```

## 結構規範

| 唯一標識符 |    字段名    |  類型   | 描述             |  默認值  | 加入版本 |
|:-----:|:---------:|:-----:|:---------------|:-----:|:----:|
|   1   |    Bpm    | float | 段落BPM值，單位為 BPM | 120.0 |  1   |
|   2   | StartBeat | float | BPM開始的拍數       |  0.0  |  1   |

## proto 段落

```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;

message Bpm {
   float BpmValue = 1;
   float StartBeat = 2;
}
```
