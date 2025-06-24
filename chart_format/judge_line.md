# 判定线

本页介绍谱面基本组成部分：判定线。
::: warning 注意事项
**本页部分兼容等级见字段描述**
:::

## JSON 示例

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

## 结构规范

| 唯一标识符 |       字段名        |                        类型                        | 描述                               |      默认值      | 兼容等级  | 加入版本 |
|:-----:|:----------------:|:------------------------------------------------:|:---------------------------------|:-------------:|:-----:|:----:|
|   1   |   TextureData    |                     byte[]?                      | 自定义判定线纹理数据，空则代表不自定义判定线纹理         |     null      |   2   |  1   |
|   2   |   IsGifTexture   |                       bool                       | TextureData 是否为 GIF 动画纹理         |     false     |   3   |  1   |
|   3   |   XMoveEvents    | List\<[Event](/chart_format/event.md)\<float\>\> | X 轴移动事件列表                        |      []       |   0   |  1   |
|   4   |   YMoveEvents    | List\<[Event](/chart_format/event.md)\<float\>\> | Y 轴移动事件列表                        |      []       |   0   |  1   |
|   5   |   RotateEvents   | List\<[Event](/chart_format/event.md)\<float\>\> | 旋转事件列表                           |      []       |   0   |  1   |
|   6   |   AlphaEvents    |  List\<[Event](/chart_format/event.md)\<int\>\>  | 不透明度事件列表                         |      []       | 0 ~ 1 |  1   |
|   7   |   SpeedEvents    | List\<[Event](/chart_format/event.md)\<float\>\> | 速度事件列表                           |      []       |   0   |  1   |
|   8   |      Notes       |                   List\<Note\>                   | 音符列表                             |      []       |   0   |  1   |
|   9   |   FatherIndex    |                       int                        | 父判定线索引，-1 代表无父判定线                |      -1       |   1   |  1   |
|  10   | RotateWithFather |                       bool                       | 是否跟随父判定线旋转                       |     true      |   1   |  1   |
|  11   |     IsCover      |                       bool                       | 是否遮罩                             |     true      |   1   |  1   |
|  12   |     AttachUi     |                       enum                       | 绑定UI                             | AttachUi.None |   2   |  1   |
|  13   |      Anchor      |                     float[]                      | 判定线锚点                            | \[0.5f,0.5f\] |   2   |  1   |
|  14   |    BpmFactor     |                      float                       | BPM 因子                           |     1.0f      |   1   |  1   |
|  15   |      ZOrder      |                       int                        | 判定线 Z 轴顺序                        |       0       |   1   |  1   |
|  16   |  ExtendedEvents  |                  ExtendedLayer                   | 扩展事件列表                           |      []       |   3   |  1   |
|  100  |   TexturePath    |                     string?                      | 判定线纹理路径，兼容用字段，不可与TextureData同时使用 |     null      |   2   |  1   |

## 行为规范

本小节将介绍各字段的行为规范。

### TextureData

- 本字段存储自定义判定线纹理的二进制数据，通常为 PNG 或 JPEG 格式。
- 本字段可以为 null，表示不使用自定义纹理，使用默认纹理。
- 本字段和 `TexturePath` 字段不能同时使用。
- 有自定义纹理时，FC/AP 提示器应当忽略对判定线的染色。

### IsGifTexture

- 本字段表示 `TextureData` 是否为 GIF 动画纹理。
- 如果为 true，则 `TextureData` 应包含 GIF 动画的二进制数据。

### XMoveEvents, YMoveEvents, RotateEvents, AlphaEvents, SpeedEvents

- 这些字段默认按[事件](/chart_format/event.md)的 `StartBeat` 从小到大排序。
- 不接受时间重叠的事件。
- 当前拍没有事件时，使用上一个拍的结束值。
- 空列表是可能的，以下是各事件的默认数值：

|  事件类型  | 默认数值  |
|:------:|:-----:|
| XMove  | 0.0f  |
| YMove  | 0.0f  |
| Rotate | 0.0f  |
| Alpha  |   0   |
| Speed  | 10.0f |

- 获取事件列表的当前拍数值的示例代码：

```csharp
// 本示例代码使用了二分法寻找t对应的事件
public float GetValueAtBeat(float t)
{     
    if (Count == 0)
        return 0;
    
    // 如果时间早于第一个事件的开始时间
    if (t < this[0].StartBeat)
        return 0;
    
    // 如果时间晚于最后一个事件的结束时间
    if (t > this[Count - 1].EndBeat)
        return this[Count - 1].EndValue;
    
    // 二分查找找到适合的事件
    int left = 0;
    int right = Count - 1;
    
    while (left <= right)
    {
        int mid = left + (right - left) / 2;
        var e = this[mid];
        
        // 找到匹配的事件
        if (t >= e.StartBeat && t <= e.EndBeat)
            return e.GetValueAtBeat(t);// 这里的方法是事件类的一个方法，用于获取在时间t对应的值，需自己实现
        
        // 调整搜索范围
        if (t < e.StartBeat)
            right = mid - 1;
        else
            left = mid + 1;
    }
    
    // 如果没有找到包含该时间的事件，返回之前最近的事件的End值
    for (int i = left - 1; i >= 0; i--)
    {
        if (t > this[i].EndBeat)
            return this[i].EndEndValue;
    }
    
    return 0;
}
```

### AttachUi

- 绑定UI后，此判定线的行为将与指定的 UI 元素关联。
- 请注意，判定线绑定到 UI 后，判定线基准位置锚点相当于 UI 所在位置，但是判定线所在位置仍然是事件值决定，只是它们会同时移动。
- 若有旋转事件，应当直接旋转 UI 元素与判定线，而不是让 UI 元素作为判定线的子物体旋转，那样会让位置出现偏差。
- 本字段表示判定线绑定的 UI 类型，枚举值如下：

|         枚举值          |    描述     | 对应数值 |
|:--------------------:|:---------:|:----:|
|    AttachUi.None     |  不绑定 UI   |  0   |
|    AttachUi.Pause    |   暂停按钮    |  1   |
| AttachUi.ComboNumber |    连击数    |  2   |
|  AttachUi.ComboText  | 连击数下的连击文本 |  3   |
|    AttachUi.Score    |   分数显示    |  4   |
| AttachUi.ProgressBar |    进度条    |  5   |
|    AttachUi.Name     |   谱面名称    |  6   |
|    AttachUi.Level    |   谱面等级    |  7   |

### Anchor

- 本字段定义判定线纹理的锚点，0.0,0.0 代表左下角，1.0,1.0 代表右上角。
- 本字段可以影响自定义纹理的显示位置，也可以影响文字事件显示的文字位置。

### BpmFactor

- 本字段用于影响本判定线的BPM，此判定线的BPM为 `当前谱面BPM / BpmFactor`。

### ZOrder

- 本字段影响判定线的 Z 轴顺序，数值越大，判定线越靠前。

### IsCover

- 本字段控制判定线是否遮罩在背面（音符的`Above`为`false`则反之）的音符。
- 若为 true，则判定线会遮罩在背面（音符的`Above`为`false`则反之）的音符上，反之则不会。
- 对于 `Hold`，遮罩的依据是 `Hold` 的开始位置（头）。

### FatherIndex

- 本字段存储父判定线的索引，-1 代表无父判定线。
- 若有父判定线，则本判定线的位置将相对于父判定线的位置进行计算。
- 角度是否跟随父判定线旋转由 `RotateWithFather` 字段决定。
- 允许多个判定线嵌套父级，比如
    - 判定线 A 是判定线 B 的父级
    - 判定线 B 是判定线 C 的父级
- 有父级的情况下，判定线位置计算代码示例：

```csharp
JudgeLine[] this; // 假设 this 是当前 JudgeLine 数组
public (float, float) GetLinePosition(int index, float time)
{     
    // 在没有父线的情况下直接返回
    if (this[index].Father == -1) return (this[index].GetXAtTime(time), this[index].GetYAtTime(time));
    
    int fatherIndex = this[index].FatherIndex;
    // 获取父线位置
    var (fatherX, fatherY) = GetLinePosition(fatherIndex, time);
    
    // 获取当前线相对于父线的偏移量
    float offsetX = this[index].GetXAtTime(time);
    float offsetY = this[index].GetYAtTime(time);
    
    // 获取父线的角度并转换为弧度，这里使用的GetRotateAtTime是下文的示例代码。
    float angleDegrees = GetRotateAtTime(index, time);
    float angleRadians = (angleDegrees % 360 + 360) % 360 * Math.PI / 180f;
    
    // 对偏移量进行旋转
    float rotatedOffsetX = (float)(offsetX * Math.Cos(angleRadians) - offsetY * Math.Sin(angleRadians));
    float rotatedOffsetY = (float)(offsetX * Math.Sin(angleRadians) + offsetY * Math.Cos(angleRadians));
    
    // 最后加上父线的位置得到最终位置 
    return (fatherX + rotatedOffsetX, fatherY + rotatedOffsetY); 
}
```

### RotateWithFather
- 本字段控制当前判定线是否跟随父判定线旋转。
- 若为 true，则当前判定线的角度将与父线角度相加，反之则不跟随父判定线旋转。
- 如果父判定线不存在，则本字段无效。
- 以下是一个示例代码，展示如何计算当前判定线的角度：

```csharp
JudgeLine[] this; // 假设 this 是当前 JudgeLine 数组
public float GetRotateAtTime(int index, float time)
{
    // 在没有父线或不跟随父线旋转的情况下直接返回
    if (this[index].Father == -1 && !this[index].RotateWithFather ) return this[index].GetRotateAtTime(time);
    
    int fatherIndex = this[index].Father;
    // 获取父线角度
    float fatherAngle = GetRotateAtTime(fatherIndex, time);
    // 获取当前线的角度
    float currentAngle = this[index].GetRotateAtTime(time);
    // 返回父线角度与当前线角度的和
    return fatherAngle + currentAngle;
}
```

### ExtendedEvents

- 本字段存储扩展事件列表，详见[ExtendedLayer](/chart_format/extended_layer.md)。

### TexturePath
- 本字段用于兼容一些谱面与资源分体存储的情况。
- 本字段存储判定线纹理相对于谱面文件所在目录的路径，如 `Assets/0721.png` 则表示谱面文件所在目录下的 `Assets` 文件夹中的 `0721.png` 文件。
- 本字段允许存储 URL 地址，方便了谱面分发网站对谱面的单独分发，其它资源可以靠模拟器自行下载。
- 在使用本字段时，`TextureData` 字段必须为 null。