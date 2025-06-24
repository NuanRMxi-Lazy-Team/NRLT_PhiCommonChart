# Note
Introduction to the fundamental component in chart: Note.

::: warning Note
**Compatibility level for each field is specified individually.**
:::

## JSON Example

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

## Structural Specifications

| Unique Identifier |   Field Name    |  Type   | Description                                                   | Default Value | Compatibility Level | Added Version |
|:-----------------:|:---------------:|:-------:|:--------------------------------------------------------------|:-------------:|:-------------------:|:-------------:|
|         1         |      Type       |  enum   | Type of note                                                  | NoteType.Tap  |          0          |       1       |
|         2         |    XPosition    |  float  | X position relative to the center of the judge line           |       -       |          0          |       1       |
|         3         |     YOffset     |  float  | Y offset from the center of the judge line                    |       0       |          2          |       1       |
|         4         |    StartBeat    |  float  | Beat when the note starts                                     |       -       |          0          |       1       |
|         5         |     EndBeat     |  float  | Beat when the note ends. Same as StartBeat if not a Hold note |       -       |          0          |       1       |
|         6         |      Alpha      |  byte   | Opacity of the note                                           |      255      |          2          |       1       |
|         7         | SpeedMultiplier |  float  | Speed multiplier of the note                                  |      1.0      |          2          |       1       |
|         8         |      Width      |  float  | Width multiplier of the note                                  |       1       |          2          |       1       |
|         9         |     IsFake      |  bool   | Whether this note is fake (cannot be hit)                     |     false     |          1          |       1       |
|        10         |   VisibleTime   |  float  | Visibility duration of the note, in seconds                   |    999999     |          2          |       1       |
|        11         |  HitSoundData   | byte[]? | Custom hit sound data of the note                             |     null      |          3          |       1       |
|        12         |      Above      |  bool   | Whether the note appears above the judge line                 |     true      |          0          |       1       |
|        100        |  HitSoundPath   | string? | Path to custom hit sound file (for compatibility)             |     null      |          3          |       1       |

## Behavior Rules

### Type

- The `Type` field defines the type of the note. Valid values are:

| Enum Value     | Description      | Numeric Value |
|----------------|------------------|---------------|
| NoteType.Tap   | Regular Tap Note | 0             |
| NoteType.Hold  | Hold Note        | 1             |
| NoteType.Flick | Flick Note       | 2             |
| NoteType.Drag  | Drag Note        | 3             |

### IsFake

- Determines whether the note is fake and cannot be hit.
- If a `Hold` note is fake (`IsFake = true`), it always appears un-hit. Otherwise, it reduces opacity after a miss.
- Fake notes disappear immediately at `EndBeat`, with no hit effect or sound.

### HitSoundData

- Stores binary data of a custom hit sound, usually WAV or OGG format.
- Can be null, meaning no custom hit sound is used.
- Notes that are not hit will not play the custom hit sound.
- Cannot be used together with `HitSoundPath`.

### HitSoundPath

- Specifies the path to a custom hit sound file, relative to the chart root directory.
  Example: `sound/hit.wav` means the file `hit.wav` inside the `sound` folder.
- Can be null, meaning no custom hit sound is used.
- Notes that are not hit will not play the custom hit sound.
- Cannot be used together with `HitSoundData`.

### YOffset

- Defines the Y-axis offset of the note relative to the center of the judge line.
- Positive values indicate the note is above the line; negative values indicate below.
- This field can affect the position of hit effects.

## Proto Paragraph

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