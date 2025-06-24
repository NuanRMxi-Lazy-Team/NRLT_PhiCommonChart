# 音符

本頁介紹譜面基本構成：音符。
::: warning 注意事項
**本頁部分兼容等級見字段描述**
:::

## JSON 示例

```json
{
  "Type": 1,
  "XPosition": 0.0,
  "YOffset": 0.0,
  "StartBeat": 0.0,
  "EndBeat": 1.0,
  "Alpha": 255,
  "SpeedMultiplier": 1.0,
  "Width": 1.0,
  "IsFake": false,
  "VisibleTime": 999999.0000,
  "HitSoundData": null,
  "Above": true,
  "HitSoundPath": null
}
```

## 結構規範

| 唯一標識符 |       字段名       |   類型    | 描述                                             |     默認值      | 兼容等級 | 加入版本 |
|:-----:|:---------------:|:-------:|:-----------------------------------------------|:------------:|:----:|:----:|
|   1   |      Type       |  enum   | 音符類型                                           | NoteType.Tap |  0   |  1   |
|   2   |    XPosition    |  float  | 相對於判定線中心的X軸位置                                  |      -       |  0   |  1   |
|   3   |     YOffset     |  float  | 音符相對於判定線中心的Y軸偏移                                |      0       |  2   |  1   |
|   4   |    StartBeat    |  float  | 音符開始拍數                                         |      -       |  0   |  1   |
|   5   |     EndBeat     |  float  | 音符結束拍數，若類型不是 `NoteType.Hold` 則與 `StartBeat` 相同 |      -       |  0   |  1   |
|   6   |      Alpha      |  byte   | 音符不透明度                                         |     255      |  2   |  1   |
|   7   | SpeedMultiplier |  float  | 音符速度倍率                                         |     1.0      |  2   |  1   |
|   8   |      Width      |  float  | 音符寬度倍率                                         |      1       |  2   |  1   |
|   9   |     IsFake      |  bool   | 是否為假音符                                         |    false     |  1   |  1   |
|  10   |   VisibleTime   |  float  | 音符可見時間，單位為秒                                    |    999999    |  2   |  1   |
|  11   |  HitSoundData   | byte[]? | 音符自定義擊打音效數據，null代表不自定義                         |     null     |  3   |  1   |
|  12   |      Above      |  bool   | 是否在判定線上方，true代表在上方，false代表在下方                  |     true     |  0   |  1   |
|  100  |  HitSoundPath   | string? | 音符自定義擊打音效路徑，兼容用字段，不可與HitSoundData同時使用          |     null     |  3   |  1   |

## 行為規範

- 分段解釋

### Type

- `Type` 字段定義了音符類型，枚舉如下：

|      枚舉值       | 描述   | 對應數值 |
|:--------------:|:-----|:----:|
|  NoteType.Tap  | 普通音符 |  0   |
| NoteType.Hold  | 長按音符 |  1   |
| NoteType.Flick | 滑動音符 |  2   |
| NoteType.Drag  | 拖動音符 |  3   |

### IsFake

- 本字段定義了音符是否為假音符，假音符不能被打擊。
- 若 `Hold` 音符的本字段為 `true`，則始終顯示為未打擊狀態，反之，在miss後會減小不透明度。
- 本字段為 `true` 的音符在 `EndBeat` 後會立即消失，沒有打擊特效，沒有打擊音效。

### HitSoundData

- 本字段可以存儲音符的自定義擊打音效數據，通常為 WAV 或 OGG 格式。
- `HitSoundData` 字段可以為 null，表示沒有自定義擊打音效。
- 未被打擊的音符不會播放自定義擊打音效。
- 本字段不能和[HitSoundPath](#hitsoundpath)同時使用。

### HitSoundPath

- 本字段可以存儲音符的自定義擊打音效相對於譜面根目錄的路徑，如 `sound/hit.wav` 就是在 `sound` 文件夾下的 `hit.wav` 文件。
- 本字段可以為 null，表示沒有自定義擊打音效。
- 未被打擊的音符不會播放自定義擊打音效。
- 本字段不能和[HitSoundData](#hitsounddata)同時使用。

### YOffset

- 本字段定義了音符相對於判定線中心的 Y 軸偏移，正值表示在判定線上方，負值表示在判定線下方。
- 本字段可以影響打擊特效的位置。

## proto 段落

```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;


message Note {
   NoteType Type = 1;
   float XPosition = 2;
   float YOffset = 3;
   float StartBeat = 4;
   float EndBeat = 5;
   uint32 Alpha = 6;
   float SpeedMultiplier = 7;
   float Width = 8;
   bool IsFake = 9;
   float VisibleTime = 10;
   bytes HitSoundData = 11;
   bool Above = 12;
   string HitSoundPath = 100;
}

enum NoteType {
  Tap = 0;
  Hold = 1;
  Flick = 2;
  Drag = 3;
}
```
