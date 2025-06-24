# Chart Root Structure
This section introduces the root structure definition of a chart file.

::: info Note
**All fields on this page have compatibility level 0.**
:::

## JSON Example

```json
{
  "Version": 0,
  "CompatLevel": 0
}
```



## Structural Specifications

| Unique Identifier | Field Name  | Type                                           | Description                                                                                                    | Default Value | Added Version |
|:-----------------:|:-----------:|:-----------------------------------------------|:---------------------------------------------------------------------------------------------------------------|:-------------:|:-------------:|
|       10000       |   Version   | int                                            | Chart version number, starts from 1                                                                            |       1       |       1       |
|       10001       | CompatLevel | int                                            | Compatibility level of the chart, see [Compatibility System](/markdown-examples.md#compatibility-level-system) |       0       |       1       |
|         1         |   BpmList   | List<[BPM](/chart_format/bpm.md)>              | List of BPMs used in the chart                                                                                 |       -       |       1       |
|         2         |  ChartInfo  | [ChartInfo](/chart_format/chart_info.md)       | Metadata and basic information about the chart                                                                 |       -       |       1       |
|         3         | JudgeLines  | List<[JudgeLine](/chart_format/judge_line.md)> | List of judge lines that make up the chart                                                                     |      []       |       1       |

## Behavior Rules

- If `BpmList` contains only one BPM, the formula to convert beat time to actual time (in seconds) is: `Actual Time = Beat / BPM * 60`
- - If `BpmList` contains multiple BPM entries, use the following sample code for conversion:

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
        // Calculate beat interval under current BPM
        float beatInterval = endBeat - currentBeat;
        // Accumulate time
        totalTime += beatInterval * secPerBeat;
        currentBeat = endBeat;
        // Stop if target beat reached
        if (currentBeat >= beatTime)
            break;
    }
    return totalTime;
}
```