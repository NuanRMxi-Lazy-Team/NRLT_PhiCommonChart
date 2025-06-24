# 譜面根結構

本節介紹譜面文件的根結構定義。

::: warning 注意事項
**本頁部分兼容等級見字段描述**
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

## 結構規範

| 唯一標識符 |         字段名         |                       類型                       | 描述                                                                                                                | 兼容等級 | 默認值  | 加入版本 |
|:-----:|:-------------------:|:----------------------------------------------:|:------------------------------------------------------------------------------------------------------------------|:----:|:----:|:----:|
| 10000 |       Version       |                      int                       | 譜面版本號，從 1 開始，通常無需關注                                                                                               |  0   |  1   |  1   |
| 10001 |     CompatLevel     |                      int                       | 譜面兼容等級，詳見[概述](/zh_hant/markdown-examples.md#兼容性等級系統)                                                                      |  0   |  0   |  1   |
|   1   |       BpmList       |       List<[BPM](/zh_hant/chart_format/bpm.md)>        | 譜面 BPM 列表                                                                                                         |  0   |  -   |  1   |
|   2   |      ChartInfo      |    [ChartInfo](/zh_hant/chart_format/chart_info.md)    | 譜面信息                                                                                                              |  0   |  -   |  1   |
|   3   |     JudgeLines      | List<[JudgeLine](/zh_hant/chart_format/judge_line.md)> | 判定線列表                                                                                                             |  0   |  []  |  1   |
|   4   |      PrprExtra      |                    string?                     | PRPR 模擬器擴展，內部存儲的僅為Json，詳見[Phira文檔](https://teamflos.github.io/phira-docs/chart-standard/extra/index.html)         |  4   | null |  1   |
|   5   |   PrprExtraFiles    |         Dictionary\<string, byte[]\>?          | PRPR 模擬器擴展文件列表，string為文件名，byte[]為文件內容                                                                             |  4   | null |  1   |
|   6   | PrprUnlockVideoData |                    byte[]?                     | PRPR 模擬器解鎖視頻數據，存儲為二進制數據，詳見[Phira文檔](https://teamflos.github.io/phira-docs/chart-standard/unlock_video/index.html) |  4   | null |  1   |
|  100  |   PrprUnlockVideo   |                    string?                     | PRPR 模擬器解鎖視頻路徑，兼容用字段，不可與 PrprUnlockVideoData 同時使用                                                                 |  4   | null |  1   |

## 行為規範

- `PrprExtra` 字段用於存儲 PRPR 模擬器的擴展信息，內容為 JSON 格式字符串。該字段在非 PRPR 模擬器中可以忽略。
- 若 `BpmList` 僅包含一個 BPM，Beat 轉實際時間（秒）的公式為：`實際時間 = Beat / BPM * 60`。
- 若 `BpmList` 包含多個 BPM，可參考以下示例代碼進行換算：

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
        // 計算該 BPM 區間的拍數
        float beatInterval = endBeat - currentBeat;
        // 累加時間
        totalTime += beatInterval * secPerBeat;
        currentBeat = endBeat;
        // 達到目標拍數則結束
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
