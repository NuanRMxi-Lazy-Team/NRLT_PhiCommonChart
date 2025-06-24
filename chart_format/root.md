# 谱面根结构

本节介绍谱面文件的根结构定义。

::: info 提示
**本页所有字段兼容等级为 0。**
:::

## JSON 示例

```json
{
  "Version": 0,
  "CompatLevel": 0
}
```

## 结构规范

| 唯一标识符 |     字段名     |                       类型                       | 描述                                           | 默认值 | 加入版本 |
|:-----:|:-----------:|:----------------------------------------------:|:---------------------------------------------|:---:|:----:|
| 10000 |   Version   |                      int                       | 谱面版本号，从 1 开始，通常无需关注                          |  1  |  1   |
| 10001 | CompatLevel |                      int                       | 谱面兼容等级，详见[前言](/markdown-examples.md#兼容性等级系统) |  0  |  1   |
|   1   |   BpmList   |       List<[BPM](/chart_format/bpm.md)>        | 谱面 BPM 列表                                    |  -  |  1   |
|   2   |  ChartInfo  |    [ChartInfo](/chart_format/chart_info.md)    | 谱面信息                                         |  -  |  1   |
|   3   | JudgeLines  | List<[JudgeLine](/chart_format/judge_line.md)> | 判定线列表                                        | []  |  1   |

## 行为规范

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