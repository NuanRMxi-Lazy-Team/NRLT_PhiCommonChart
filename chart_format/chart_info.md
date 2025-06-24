# ChartInfo

本段介绍谱面基本信息组成部分。
::: info 提示
**本页所有字段兼容等级为 0。**
:::

## Json直观示例

```json
{
  "Name": "UnTitled",
  "Author": "Unknown",
  "IllustrationAuthor": "Unknown",
  "IllustrationData": [],
  "SongAuthor": "Unknown",
  "SongOffset": 0,
  "SongData": [],
  "Level": "UK  Lv.0"
}
```

## 结构规范

| 唯一标识符 |        字段名         |   类型    | 描述                  |   默认值    | 加入版本 |
|:-----:|:------------------:|:-------:|:--------------------|:--------:|:----:|
|   1   |        Name        | string  | 谱面名称                | UnTitled |  1   |
|   2   |       Author       | string  | 谱师名义                | Unknown  |  1   |
|   3   | IllustrationAuthor | string  | 插画作者名义              | Unknown  |  1   |
|   4   |  IllustrationData  | byte[]? | 插画数据                |   null   |  1   |
|   5   |     SongAuthor     | string  | 歌曲作者名义              | Unknown  |  1   |
|   6   |     SongOffset     |   int   | 歌曲与谱面开始时间的偏移, 单位为毫秒 |    0     |  1   |
|   7   |      SongData      | byte[]  | 歌曲数据                |    -     |  1   |
|   8   |       Level        | string  | 谱面难度                | UK  Lv.0 |  1   |

## 行为规范

- `IllustrationData` 字段可以存储插画的二进制数据，通常为 PNG 或 JPEG 格式。
- `IllustrationData` 字段可以为 null，表示没有插画，显示的默认插画可以自己定义，建议使用纯黑。
- `SongData` 字段存储歌曲的二进制数据，通常为 MP3 或 OGG 格式。
- `SongOffset` 字段用于调整歌曲的起始时间，单位为毫秒（ms），可以为负值。
- `Level` 存储的等级中 `UK` 与 `Lv` 文本之间为两个空格。

## proto 段落

```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;

message Info {
   string Name = 1;
   string Author = 2;
   string Level = 3;
   string IllustrationAuthor = 4;
   bytes IllustrationData = 5;
   string SongAuthor = 6;
   int32 SongOffset = 7;
   bytes SongData = 8;
}
```