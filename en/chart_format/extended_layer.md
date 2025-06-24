# Extended Layer

Extended components in chart: RPE-compatible extended features.

::: info Note
**All fields on this page have compatibility level 3.**
:::

## JSON Example

```json
{
  "ScaleXEvents": [],
  "ScaleYEvents": [],
  "ColorEvents": [],
  "TextEvents": []
}
```

## Structural Specifications

| Unique Identifier |  Field Name  |                         Type                         | Description                   | Default Value | Added Version |
|:-----------------:|:------------:|:----------------------------------------------------:|:------------------------------|:-------------:|:-------------:|
|         1         | ScaleXEvents | List\<[Event](/en/chart_format/event.md)\<float\>\>  | List of X-axis scaling events |      []       |       1       |
|         2         | ScaleYEvents | List\<[Event](/en/chart_format/event.md)\<float\>\>  | List of Y-axis scaling events |      []       |       1       |
|         3         | ColorEvents  | List\<[Event](/en/chart_format/event.md)\<byte[]\>\> | List of color change events   |      []       |       1       |
|         4         |  TextEvents  | List\<[Event](/en/chart_format/event.md)\<string\>\> | List of text overlay events   |      []       |       1       |

## Behavior Rules

- `ScaleXEvents` and `ScaleYEvents` define the scaling of the judge line along the X and Y axes. The event value
  represents the scale factor.
- `ColorEvents` define color change events for the judge line. The event value is a 3-byte RGB color value.
- When `ColorEvents` are present, FC/AP indicators should not affect the judge line's color.
- Interpolation of `ColorEvents` must apply to all three RGB values simultaneously.
- When `TextEvents` are present, FC/AP indicators should not affect the judge line's color.
- When `TextEvents` are present, default textures, custom textures (`TextureData`), and GIF textures (`IsGifTexture`) of
  the judge line should be ignored.
- The value of `TextEvents` is a string representing the text content displayed on the judge line. The display position
  is affected by the judge line's `Anchor`.
- The text content of `TextEvents` can include newline characters `\n` to display multi-line text.
