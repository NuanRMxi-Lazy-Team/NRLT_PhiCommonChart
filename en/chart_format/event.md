# Event

Introduction to event structure in chart.
::: info Tips
**All fields on this page have compatibility level 0.**
:::

## JSON Example

```json
{
  "StartBeat": 0,
  "EndBeat": 1,
  "StartValue": 0.0,
  "EndValue": 1.0
}
```

## Structural specifications

| Unique Identifier |   Field    | Type  |            Description             | Default Value | Added Version |
|:-----------------:|:----------:|:-----:|:----------------------------------:|:-------------:|:-------------:|
|         1         | StartBeat  | float | The Beats where this event starts  |       -       |       1       |
|         2         |  EndBeat   | float |  The Beats where this event ends   |       -       |       1       |
|         3         | StartValue |   T   |     Initial value of the event     |       -       |       1       |
|         4         |  EndValue  |   T   |      Final value of the event      |       -       |       1       |
|         5         | StartTime  | float | Event start time (in milliseconds) |       -       |       1       |
|         6         |  EndTime   | float |  Event end time (in milliseconds)  |       -       |       1       |

## Field Behavior Rules

- `StartBeat` and `EndBeat` define the time range of the event. `EndBeat` must be greater than or equal to `StartBeat`.
- The type of `Value` can be arbitrary. For example, in `ColorEvent`, the type of `Value` is `byte[]`.
- No easing functions are designed for events. All values change linearly.
- `StartTime` and `EndTime` represent the start and end times of the event, respectively, in milliseconds. They coexist with `StartBeat` and `EndBeat`, and can be used as needed.

## Proto Paragraph
- Because the type of `T` can vary, we define multiple event types: `Event_Array_Byte`, `Event_Byte`, `Event_Single`, and `Event_String`.

```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;
message Event_Array_Byte {
   float StartBeat = 1;
   float EndBeat = 2;
   bytes StartValue = 3;
   bytes EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
message Event_Byte {
   float StartBeat = 1;
   float EndBeat = 2;
   uint32 StartValue = 3;
   uint32 EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
message Event_Single {
   float StartBeat = 1;
   float EndBeat = 2;
   float StartValue = 3;
   float EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
message Event_String {
   float StartBeat = 1;
   float EndBeat = 2;
   string StartValue = 3;
   string EndValue = 4;
   float StartTime = 5;
   float EndTime = 6;
}
```