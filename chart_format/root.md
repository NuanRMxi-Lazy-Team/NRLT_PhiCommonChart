# 谱面根结构

本节介绍谱面文件的根结构定义。

::: warning 注意事项
**本页部分兼容等级见字段描述**
:::

## JSON 示例

```json
{
  "Version": 0,
  "CompatLevel": 0,
  "BpmList": ...,
  "ChartInfo": ...,
  "JudgeLines": [],
  "PrprExtra": null,
  "PrprExtraFiles": null,
  "PrprUnlockVideoData": null,
  "PrprUnlockVideo": null,
  "PrprUnlockVideoPath": null
}
```

## 结构规范

| 唯一标识符 |         字段名         |                       类型                       | 描述                                                                                                                | 兼容等级 | 默认值  | 加入版本 |
|:-----:|:-------------------:|:----------------------------------------------:|:------------------------------------------------------------------------------------------------------------------|:----:|:----:|:----:|
| 10000 |       Version       |                      int                       | 谱面版本号，从 1 开始，通常无需关注                                                                                               |  0   |  1   |  1   |
| 10001 |     CompatLevel     |                      int                       | 谱面兼容等级，详见[概述](/markdown-examples.md#兼容性等级系统)                                                                      |  0   |  0   |  1   |
|   1   |       BpmList       |       List<[BPM](/chart_format/bpm.md)>        | 谱面 BPM 列表                                                                                                         |  0   |  -   |  1   |
|   2   |      ChartInfo      |    [ChartInfo](/chart_format/chart_info.md)    | 谱面信息                                                                                                              |  0   |  -   |  1   |
|   3   |     JudgeLines      | List<[JudgeLine](/chart_format/judge_line.md)> | 判定线列表                                                                                                             |  0   |  []  |  1   |
|   4   |      PrprExtra      |                    string?                     | PRPR 模拟器扩展，内部存储的仅为Json，详见[Phira文档](https://teamflos.github.io/phira-docs/chart-standard/extra/index.html)         |  4   | null |  1   |
|   5   |   PrprExtraFiles    |         Dictionary\<string, byte[]\>?          | PRPR 模拟器扩展文件列表，string为文件名，byte[]为文件内容                                                                             |  4   | null |  1   |
|   6   | PrprUnlockVideoData |                    byte[]?                     | PRPR 模拟器解锁视频数据，存储为二进制数据，详见[Phira文档](https://teamflos.github.io/phira-docs/chart-standard/unlock_video/index.html) |  4   | null |  1   |
|  100  |   PrprUnlockVideo   |                    string?                     | PRPR 模拟器解锁视频路径，兼容用字段，不可与 PrprUnlockVideoData 同时使用                                                                 |  4   | null |  1   |

## 行为规范

- `PrprExtra` 字段用于存储 PRPR 模拟器的扩展信息，内容为 JSON 格式字符串。该字段在非 PRPR 模拟器中可以忽略。
- 若 `BpmList` 仅包含一个 BPM，Beat 转实际时间（秒）的公式为：`实际时间 = Beat / BPM * 60`。
- 若 `BpmList` 包含多个 BPM，可参考以下示例代码进行换算：

```csharp
public float BeatTimeToSecond(float beatTime, List<Bpm> bpmList, float bpmFactor)
{
    float totalTime = 0;
    float currentBeat = 0;
    for (int i = 0; i < bpmList.Count; i++)
    {
        var currentBpm = bpmList[i];
        float secPerBeat = 60f / (currentBpm.Bpm / bpmFactor);
        float endBeat = i < bpmList.Count - 1
            ? Math.Min(BeatToBeatTime(bpmList[i + 1].StartTime), beatTime)
            : beatTime;
        // 计算该 BPM 区间的拍数
        float beatInterval = endBeat - currentBeat;
        // 累加时间
        totalTime += beatInterval * secPerBeat;
        currentBeat = endBeat;
        // 达到目标拍数则结束
        if (currentBeat >= beatTime)
            break;
    }
    return totalTime;
}
```

## proto段落

```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;

message CommonChart {
  repeated Bpm BpmList = 1;
  Info ChartInfo = 2;
  repeated JudgeLine JudgeLines = 3;
  string PrprExtraJson = 4;
  map<string, bytes> PrprExtraFiles = 5;
  bytes PrprUnlockVideoData = 6;
  string PrprUnlockVideoPath = 100;
  int32 Version = 10000;
  int32 CompatLevel = 10001;
}
```