# ChartInfo

本段介紹譜面基本信息組成部分。
::: info 提示
**本頁所有字段兼容等級為 0。**
:::

## Json直觀示例

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

## 結構規範

| 唯一標識符 |        字段名         |   類型    | 描述                  |   默認值    | 加入版本 |
|:-----:|:------------------:|:-------:|:--------------------|:--------:|:----:|
|   1   |        Name        | string  | 譜面名稱                | UnTitled |  1   |
|   2   |       Author       | string  | 譜師名義                | Unknown  |  1   |
|   3   | IllustrationAuthor | string  | 插畫作者名義              | Unknown  |  1   |
|   4   |  IllustrationData  | byte[]? | 插畫數據                |   null   |  1   |
|   5   |     SongAuthor     | string  | 歌曲作者名義              | Unknown  |  1   |
|   6   |     SongOffset     |   int   | 歌曲與譜面開始時間的偏移, 單位為毫秒 |    0     |  1   |
|   7   |      SongData      | byte[]  | 歌曲數據                |    -     |  1   |
|   8   |       Level        | string  | 譜面難度                | UK  Lv.0 |  1   |

## 行為規範

- `IllustrationData` 字段可以存儲插畫的二進制數據，通常為 PNG 或 JPEG 格式。
- `IllustrationData` 字段可以為 null，表示沒有插畫，顯示的默認插畫可以自己定義，建議使用純黑。
- `SongData` 字段存儲歌曲的二進制數據，通常為 MP3 或 OGG 格式。
- `SongOffset` 字段用於調整歌曲的起始時間，單位為毫秒（ms），可以為負值。
- `Level` 存儲的等級中 `UK` 與 `Lv` 文本之間為兩個空格。

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
