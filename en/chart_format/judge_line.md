# Judge Line
Introduction to the fundamental component in chart: Judge Line.

::: info Note
**Compatibility level for each field is specified individually.**
:::

## JSON Example

```json
{
  "TextureData": null,
  "IsGifTexture": false,
  "XMoveEvents": [],
  "YMoveEvents": [],
  "RotateEvents": [],
  "AlphaEvents": [],
  "SpeedEvents": [],
  "Notes": [],
  "FatherIndex": -1,
  "RotateWithFather": true,
  "IsCover": true,
  "AttachUi": "None",
  "Anchor": [
    0.5,
    0.5,
    0.5,
    0.5
  ],
  "BpmFactor": 1.0,
  "ZOrder": 0,
  "ExtendedEvents": [],
  "TexturePath": null
}
```

## Structural Specifications
 
| Unique Identifier |    Field Name    |                       Type                       | Description                                                                | Default Value | Compatibility Level | Added Version |
|:-----------------:|:----------------:|:------------------------------------------------:|:---------------------------------------------------------------------------|:-------------:|:-------------------:|:-------------:|
|         1         |   TextureData    |                     byte[]?                      | Custom texture data of the judge line. Null means default texture is used. |     null      |          2          |       1       |
|         2         |   IsGifTexture   |                       bool                       | Whether TextureData is a GIF animation texture.                            |     false     |          3          |       1       |
|         3         |   XMoveEvents    | List\<[Event](/chart_format/event.md)\<float\>\> | List of X-axis movement events                                             |      []       |          0          |       1       |
|         4         |   YMoveEvents    | List\<[Event](/chart_format/event.md)\<float\>\> | List of Y-axis movement events                                             |      []       |          0          |       1       |
|         5         |   RotateEvents   | List\<[Event](/chart_format/event.md)\<float\>\> | List of rotation events                                                    |      []       |          0          |       1       |
|         6         |   AlphaEvents    |  List\<[Event](/chart_format/event.md)\<int\>\>  | List of opacity (alpha) change events                                      |      []       |        0 ~ 1        |       1       |
|         7         |   SpeedEvents    | List\<[Event](/chart_format/event.md)\<float\>\> | List of speed change events                                                |      []       |          0          |       1       |
|         8         |      Notes       |                   List\<Note\>                   | List of notes attached to this judge line                                  |      []       |          0          |       1       |
|         9         |   FatherIndex    |                       int                        | Index of parent judge line, -1 means no parent                             |      -1       |          1          |       1       |
|        10         | RotateWithFather |                       bool                       | Whether this line rotates with its parent                                  |     true      |          1          |       1       |
|        11         |     IsCover      |                       bool                       | Whether this line covers notes behind it                                   |     true      |          1          |       1       |
|        12         |     AttachUi     |                       enum                       | UI element bound to this judge line                                        | AttachUi.None |          2          |       1       |
|        13         |      Anchor      |                     float[]                      | Anchor point of the judge line texture                                     |  [0.5, 0.5]   |          2          |       1       |
|        14         |    BpmFactor     |                      float                       | BPM factor for this judge line                                             |      1.0      |          1          |       1       |
|        15         |      ZOrder      |                       int                        | Z-order of the judge line (rendering priority)                             |       0       |          1          |       1       |
|        16         |  ExtendedEvents  |                  ExtendedLayer                   | List of extended events                                                    |      []       |          3          |       1       |
|        100        |   TexturePath    |                     string?                      | Path to external texture file (for compatibility)                          |     null      |          2          |       1       |

## Behavior Rules

### TextureData

- Stores binary data of a custom texture, usually PNG or JPEG format.
- Can be null, meaning the default texture should be used.
- Cannot be used together with `TexturePath`.
- When using a custom texture, FC/AP indicators should not affect the line's color.

### IsGifTexture

- Indicates whether `TextureData` contains GIF animation data.
- If true, `TextureData` must contain a valid GIF binary stream.

### XMoveEvents, YMoveEvents, RotateEvents, AlphaEvents, SpeedEvents

- Events are sorted by `StartBeat` in ascending order.
- Overlapping events are not allowed.
- When no event is active at current beat, the last event’s end value is used.
- Empty lists are allowed; default values per event type:

| Event Type | Default Value |
|------------|---------------|
| XMove      | 0.0f          |
| YMove      | 0.0f          |
| Rotate     | 0.0f          |
| Alpha      | 0             |
| Speed      | 10.0f         |

- Example code for retrieving current beat value:

```csharp
// This example uses binary search to find the event corresponding to time t
public float GetValueAtBeat(float t)
{     
    if (Count == 0)
        return 0;
    
    // If time is earlier than the first event's start time
    if (t < this[0].StartBeat)
        return 0;
    
    // If time is later than the last event's end time
    if (t > this[Count - 1].EndBeat)
        return this[Count - 1].EndValue;
    
    // Binary search to find the matching event
    int left = 0;
    int right = Count - 1;
    
    while (left <= right)
    {
        int mid = left + (right - left) / 2;
        var e = this[mid];
        
        // Found matching event
        if (t >= e.StartBeat && t <= e.EndBeat)
            return e.GetValueAtBeat(t); // This method should be implemented in the Event class to get value at time t
        
        // Adjust search range
        if (t < e.StartBeat)
            right = mid - 1;
        else
            left = mid + 1;
    }
    
    // If no event contains this time, return the end value of the most recent previous event
    for (int i = left - 1; i >= 0; i--)
    {
        if (t > this[i].EndBeat)
            return this[i].EndEndValue;
    }
    
    return 0;
}
```

### AttachUi

- When UI binding is enabled, the judge line behaves relative to the specified UI element.
- The anchor point of the judge line becomes relative to the UI position.
- Rotation events should directly rotate both the UI and the line, not as child elements.
- Supported values:

| Enum Value           | Description               | Value |
|----------------------|---------------------------|-------|
| AttachUi.None        | No UI binding             | 0     |
| AttachUi.Pause       | Pause button              | 1     |
| AttachUi.ComboNumber | Combo counter             | 2     |
| AttachUi.ComboText   | Text below combo  counter | 3     |
| AttachUi.Score       | Score display             | 4     |
| AttachUi.ProgressBar | Progress bar              | 5     |
| AttachUi.Name        | Chart name display        | 6     |
| AttachUi.Level       | Chart difficulty level    | 7     |

### Anchor

- Defines the anchor point of the texture (0.0,0.0 = bottom-left, 1.0,1.0 = top-right).
- Affects texture alignment and text positioning from `TextEvents`.

### BpmFactor

- Used to adjust BPM for this line. Effective BPM = `Global BPM / BpmFactor`.

### ZOrder

- Controls rendering order; higher values appear on top.

### IsCover

- Determines whether this line covers notes behind it.
- For Hold notes, only the head position determines coverage.

### FatherIndex

- Stores index of parent judge line, -1 means none.
- Position is calculated relative to parent.
- Rotation behavior is controlled by `RotateWithFather`.
- When if parent dose exist, example code for judge line position calculation:

```csharp
JudgeLine[] this; // Assume this is the current JudgeLine array
public (float, float) GetLinePosition(int index, float time)
{     
    // Return directly if there's no parent line
    if (this[index].Father == -1) return (this[index].GetXAtTime(time), this[index].GetYAtTime(time));
    
    int fatherIndex = this[index].FatherIndex;
    // Get parent line position
    var (fatherX, fatherY) = GetLinePosition(fatherIndex, time);
    
    // Get offset relative to parent line
    float offsetX = this[index].GetXAtTime(time);
    float offsetY = this[index].GetYAtTime(time);
    
    // Get parent rotation and convert to radians. The GetRotateAtTime method is defined below.
    float angleDegrees = GetRotateAtTime(index, time);
    float angleRadians = (angleDegrees % 360 + 360) % 360 * Math.PI / 180f;
    
    // Rotate the offset
    float rotatedOffsetX = (float)(offsetX * Math.Cos(angleRadians) - offsetY * Math.Sin(angleRadians));
    float rotatedOffsetY = (float)(offsetX * Math.Sin(angleRadians) + offsetY * Math.Cos(angleRadians));
    
    // Add parent position to get final position
    return (fatherX + rotatedOffsetX, fatherY + rotatedOffsetY); 
}
```

### RotateWithFather

- If true, this line rotates along with its parent.
- If parent does not exist, this flag has no effect.
- Example code for judge line rotation calculation:

```csharp
public float GetRotateAtTime(int index, float time)
{
    // Return directly if there's no parent or not rotating with parent
    if (this[index].Father == -1 || !this[index].RotateWithFather) return this[index].GetRotateAtTime(time);
    
    int fatherIndex = this[index].Father;
    // Get parent line rotation
    float fatherAngle = GetRotateAtTime(fatherIndex, time);
    // Get current line rotation
    float currentAngle = this[index].GetRotateAtTime(time);
    // Return the sum of parent and current rotation
    return fatherAngle + currentAngle;
}
```

### ExtendedEvents

- See [ExtendedLayer](/chart_format/extended_layer.md)

### TexturePath

- Allows specifying an external texture path instead of embedding it.
- Can be a local path like `Assets/0721.png`, or a URL.
- Must be null when `TextureData` is used.