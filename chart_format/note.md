# 音符

本页介绍谱面基本构成：音符。
::: warning 注意事项
**本页部分兼容等级见字段描述**
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

## 结构规范

| 唯一标识符 |       字段名       |   类型    | 描述                                             |     默认值      | 兼容等级 | 加入版本 |
|:-----:|:---------------:|:-------:|:-----------------------------------------------|:------------:|:----:|:----:|
|   1   |      Type       |  enum   | 音符类型                                           | NoteType.Tap |  0   |  1   |
|   2   |    XPosition    |  float  | 相对于判定线中心的X轴位置                                  |      -       |  0   |  1   |
|   3   |     YOffset     |  float  | 音符相对于判定线中心的Y轴偏移                                |      0       |  2   |  1   |
|   4   |    StartBeat    |  float  | 音符开始拍数                                         |      -       |  0   |  1   |
|   5   |     EndBeat     |  float  | 音符结束拍数，若类型不是 `NoteType.Hold` 则与 `StartBeat` 相同 |      -       |  0   |  1   |
|   6   |      Alpha      |  byte   | 音符不透明度                                         |     255      |  2   |  1   |
|   7   | SpeedMultiplier |  float  | 音符速度倍率                                         |     1.0      |  2   |  1   |
|   8   |      Width      |  float  | 音符宽度倍率                                         |      1       |  2   |  1   |
|   9   |     IsFake      |  bool   | 是否为假音符                                         |    false     |  1   |  1   |
|  10   |   VisibleTime   |  float  | 音符可见时间，单位为秒                                    |    999999    |  2   |  1   |
|  11   |  HitSoundData   | byte[]? | 音符自定义击打音效数据，null代表不自定义                         |     null     |  3   |  1   |
|  12   |      Above      |  bool   | 是否在判定线上方，true代表在上方，false代表在下方                  |     true     |  0   |  1   |
|  100  |  HitSoundPath   | string? | 音符自定义击打音效路径，兼容用字段，不可与HitSoundData同时使用          |     null     |  3   |  1   |

## 行为规范

- 分段解释

### Type

- `Type` 字段定义了音符类型，枚举如下：

|      枚举值       | 描述   | 对应数值 |
|:--------------:|:-----|:----:|
|  NoteType.Tap  | 普通音符 |  0   |
| NoteType.Hold  | 长按音符 |  1   |
| NoteType.Flick | 滑动音符 |  2   |
| NoteType.Drag  | 拖动音符 |  3   |

### IsFake

- 本字段定义了音符是否为假音符，假音符不能被打击。
- 若 `Hold` 音符的本字段为 `true`，则始终显示为未打击状态，反之，在miss后会减小不透明度。
- 本字段为 `true` 的音符在 `EndBeat` 后会立即消失，没有打击特效，没有打击音效。

### HitSoundData

- 本字段可以存储音符的自定义击打音效数据，通常为 WAV 或 OGG 格式。
- `HitSoundData` 字段可以为 null，表示没有自定义击打音效。
- 未被打击的音符不会播放自定义击打音效。
- 本字段不能和[HitSoundPath](#hitsoundpath)同时使用。

### HitSoundPath

- 本字段可以存储音符的自定义击打音效相对于谱面根目录的路径，如 `sound/hit.wav` 就是在 `sound` 文件夹下的 `hit.wav` 文件。
- 本字段可以为 null，表示没有自定义击打音效。
- 未被打击的音符不会播放自定义击打音效。
- 本字段不能和[HitSoundData](#hitsounddata)同时使用。

### YOffset

- 本字段定义了音符相对于判定线中心的 Y 轴偏移，正值表示在判定线上方，负值表示在判定线下方。
- 本字段可以影响打击特效的位置。

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