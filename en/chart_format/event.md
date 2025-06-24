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

## 结构规范

| Unique Identifier |   Field    | Type  |            Description            | Default Value | Added Version |
|:-----------------:|:----------:|:-----:|:---------------------------------:|:-------------:|:-------------:|
|         1         | StartBeat  | float | The Beats where this event starts |       -       |       1       |
|         2         |  EndBeat   | float |  The Beats where this event ends  |       -       |       1       |
|         3         | StartValue |   T   |    Initial value of the event     |       -       |       1       |
|         4         |  EndValue  |   T   |     Final value of the event      |       -       |       1       |

# Field Behavior Rules

- `StartBeat` and `EndBeat` define the time range of the event. `EndBeat` must be greater than or equal to `StartBeat`.
- The type of `Value` can be arbitrary. For example, in `ColorEvent`, the type of `Value` is `byte[]`.
- No easing functions are designed for events. All values change linearly.