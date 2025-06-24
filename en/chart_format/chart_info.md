# ChartInfo

Introduction to chart basic information.
::: info Tips
**All fields on this page have compatibility level 0.**
:::

## JSON Example

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

## Structural specifications

| Unique Identifier |       Field        |  Type   | Description                                                           | Default Value | Added Version |
|:-----------------:|:------------------:|:-------:|:----------------------------------------------------------------------|:-------------:|:-------------:|
|         1         |        Name        | string  | Chart Name                                                            |   UnTitled    |       1       |
|         2         |       Author       | string  | Chart Author                                                          |    Unknown    |       1       |
|         3         | IllustrationAuthor | string  | Illustration Author                                                   |    Unknown    |       1       |
|         4         |  IllustrationData  | byte[]? | Illustration Data                                                     |     null      |       1       |
|         5         |     SongAuthor     | string  | Song Author                                                           |    Unknown    |       1       |
|         6         |     SongOffset     |   int   | The time offset between the song start and the chart, in milliseconds |       0       |       1       |
|         7         |      SongData      | byte[]  | Song Data                                                             |       -       |       1       |
|         8         |       Level        | string  | Chart Difficulty Level                                                |   UK  Lv.0    |       1       |

## Field Behavior Rules

- `IllustrationData` stores binary illustration data, usually in PNG or JPEG format
- `IllustrationData` can be null, meaning no illustration is provided. A default black image is recommended in this case.
- `SongData` stores binary song data, usually in MP3 or OGG format.
- `SongOffset` adjusts the song's start time in milliseconds. Can be negative.
- In the `Level` field, `UK` and `Lv` must be separated by two spaces.
