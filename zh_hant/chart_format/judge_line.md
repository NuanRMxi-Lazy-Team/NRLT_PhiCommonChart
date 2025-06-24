# 判定線

本頁介紹譜面基本組成部分：判定線。
::: warning 注意事項
**本頁部分兼容等級見字段描述**
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

## 結構規範

| 唯一標識符 |       字段名        |                        類型                        | 描述                               |      默認值      | 兼容等級  | 加入版本 |
|:-----:|:----------------:|:------------------------------------------------:|:---------------------------------|:-------------:|:-----:|:----:|
|   1   |   TextureData    |                     byte[]?                      | 自定義判定線紋理數據，空則代表不自定義判定線紋理         |     null      |   2   |  1   |
|   2   |   IsGifTexture   |                       bool                       | TextureData 是否為 GIF 動畫紋理         |     false     |   3   |  1   |
|   3   |   XMoveEvents    | List\<[Event](/zh_hant/chart_format/event.md)\<float\>\> | X 軸移動事件列表                        |      []       |   0   |  1   |
|   4   |   YMoveEvents    | List\<[Event](/zh_hant/chart_format/event.md)\<float\>\> | Y 軸移動事件列表                        |      []       |   0   |  1   |
|   5   |   RotateEvents   | List\<[Event](/zh_hant/chart_format/event.md)\<float\>\> | 旋轉事件列表                           |      []       |   0   |  1   |
|   6   |   AlphaEvents    |  List\<[Event](/zh_hant/chart_format/event.md)\<int\>\>  | 不透明度事件列表                         |      []       | 0 ~ 1 |  1   |
|   7   |   SpeedEvents    | List\<[Event](/zh_hant/chart_format/event.md)\<float\>\> | 速度事件列表                           |      []       |   0   |  1   |
|   8   |      Notes       |                   List\<Note\>                   | 音符列表                             |      []       |   0   |  1   |
|   9   |   FatherIndex    |                       int                        | 父判定線索引，-1 代表無父判定線                |      -1       |   1   |  1   |
|  10   | RotateWithFather |                       bool                       | 是否跟隨父判定線旋轉                       |     true      |   1   |  1   |
|  11   |     IsCover      |                       bool                       | 是否遮罩                             |     true      |   1   |  1   |
|  12   |     AttachUi     |                       enum                       | 綁定UI                             | AttachUi.None |   2   |  1   |
|  13   |      Anchor      |                     float[]                      | 判定線錨點                            | \[0.5f,0.5f\] |   2   |  1   |
|  14   |    BpmFactor     |                      float                       | BPM 因子                           |     1.0f      |   1   |  1   |
|  15   |      ZOrder      |                       int                        | 判定線 Z 軸順序                        |       0       |   1   |  1   |
|  16   |  ExtendedEvents  |                  ExtendedLayer                   | 擴展事件列表                           |      []       |   3   |  1   |
|  100  |   TexturePath    |                     string?                      | 判定線紋理路徑，兼容用字段，不可與TextureData同時使用 |     null      |   2   |  1   |

## 行為規範

本小節將介紹各字段的行為規範。

### TextureData

- 本字段存儲自定義判定線紋理的二進制數據，通常為 PNG 或 JPEG 格式。
- 本字段可以為 null，表示不使用自定義紋理，使用默認紋理。
- 本字段和 `TexturePath` 字段不能同時使用。
- 有自定義紋理時，FC/AP 提示器應當忽略對判定線的染色。

### IsGifTexture

- 本字段表示 `TextureData` 是否為 GIF 動畫紋理。
- 如果為 true，則 `TextureData` 應包含 GIF 動畫的二進制數據。

### XMoveEvents, YMoveEvents, RotateEvents, AlphaEvents, SpeedEvents

- 這些字段默認按[事件](/zh_hant/chart_format/event.md)的 `StartBeat` 從小到大排序。
- 不接受時間重疊的事件。
- 當前拍沒有事件時，使用上一個拍的結束值。
- 空列表是可能的，以下是各事件的默認數值：

|  事件類型  | 默認數值  |
|:------:|:-----:|
| XMove  | 0.0f  |
| YMove  | 0.0f  |
| Rotate | 0.0f  |
| Alpha  |   0   |
| Speed  | 10.0f |

- 獲取事件列表的當前拍數值的示例代碼：

```csharp
// 本示例代碼使用了二分法尋找t對應的事件
public float GetValueAtBeat(float t)
{     
    if (Count == 0)
        return 0;
    
    // 如果時間早於第一個事件的開始時間
    if (t < this[0].StartBeat)
        return 0;
    
    // 如果時間晚於最後一個事件的結束時間
    if (t > this[Count - 1].EndBeat)
        return this[Count - 1].EndValue;
    
    // 二分查找找到適合的事件
    int left = 0;
    int right = Count - 1;
    
    while (left <= right)
    {
        int mid = left + (right - left) / 2;
        var e = this[mid];
        
        // 找到匹配的事件
        if (t >= e.StartBeat && t <= e.EndBeat)
            return e.GetValueAtBeat(t);// 這裡的方法是事件類的一個方法，用於獲取在時間t對應的值，需自己實現
        
        // 調整搜索範圍
        if (t < e.StartBeat)
            right = mid - 1;
        else
            left = mid + 1;
    }
    
    // 如果沒有找到包含該時間的事件，返回之前最近的事件的End值
    for (int i = left - 1; i >= 0; i--)
    {
        if (t > this[i].EndBeat)
            return this[i].EndEndValue;
    }
    
    return 0;
}
```

### AttachUi

- 綁定UI後，此判定線的行為將與指定的 UI 元素關聯。
- 請注意，判定線綁定到 UI 後，判定線基準位置錨點相當於 UI 所在位置，但是判定線所在位置仍然是事件值決定，只是它們會同時移動。
- 若有旋轉事件，應當直接旋轉 UI 元素與判定線，而不是讓 UI 元素作為判定線的子物體旋轉，那樣會讓位置出現偏差。
- 本字段表示判定線綁定的 UI 類型，枚舉值如下：

|         枚舉值          |    描述     | 對應數值 |
|:--------------------:|:---------:|:----:|
|    AttachUi.None     |  不綁定 UI   |  0   |
|    AttachUi.Pause    |   暫停按鈕    |  1   |
| AttachUi.ComboNumber |    連擊數    |  2   |
|  AttachUi.ComboText  | 連擊數下的連擊文本 |  3   |
|    AttachUi.Score    |   分數顯示    |  4   |
| AttachUi.ProgressBar |    進度條    |  5   |
|    AttachUi.Name     |   譜面名稱    |  6   |
|    AttachUi.Level    |   譜面等級    |  7   |

### Anchor

- 本字段定義判定線紋理的錨點，0.0,0.0 代表左下角，1.0,1.0 代表右上角。
- 本字段可以影響自定義紋理的顯示位置，也可以影響文字事件顯示的文字位置。

### BpmFactor

- 本字段用於影響本判定線的BPM，此判定線的BPM為 `當前譜面BPM / BpmFactor`。

### ZOrder

- 本字段影響判定線的 Z 軸順序，數值越大，判定線越靠前。

### IsCover

- 本字段控制判定線是否遮罩在背面（音符的`Above`為`false`則反之）的音符。
- 若為 true，則判定線會遮罩在背面（音符的`Above`為`false`則反之）的音符上，反之則不會。
- 對於 `Hold`，遮罩的依據是 `Hold` 的開始位置（頭）。

### FatherIndex

- 本字段存儲父判定線的索引，-1 代表無父判定線。
- 若有父判定線，則本判定線的位置將相對於父判定線的位置進行計算。
- 角度是否跟隨父判定線旋轉由 `RotateWithFather` 字段決定。
- 允許多個判定線嵌套父級，比如
    - 判定線 A 是判定線 B 的父級
    - 判定線 B 是判定線 C 的父級
- 有父級的情況下，判定線位置計算代碼示例：

```csharp
JudgeLine[] this; // 假設 this 是當前 JudgeLine 數組
public (float, float) GetLinePosition(int index, float time)
{     
    // 在沒有父線的情況下直接返回
    if (this[index].Father == -1) return (this[index].GetXAtTime(time), this[index].GetYAtTime(time));
    
    int fatherIndex = this[index].FatherIndex;
    // 獲取父線位置
    var (fatherX, fatherY) = GetLinePosition(fatherIndex, time);
    
    // 獲取當前線相對於父線的偏移量
    float offsetX = this[index].GetXAtTime(time);
    float offsetY = this[index].GetYAtTime(time);
    
    // 獲取父線的角度並轉換為弧度，這裡使用的GetRotateAtTime是下文的示例代碼。
    float angleDegrees = GetRotateAtTime(index, time);
    float angleRadians = (angleDegrees % 360 + 360) % 360 * Math.PI / 180f;
    
    // 對偏移量進行旋轉
    float rotatedOffsetX = (float)(offsetX * Math.Cos(angleRadians) - offsetY * Math.Sin(angleRadians));
    float rotatedOffsetY = (float)(offsetX * Math.Sin(angleRadians) + offsetY * Math.Cos(angleRadians));
    
    // 最後加上父線的位置得到最終位置 
    return (fatherX + rotatedOffsetX, fatherY + rotatedOffsetY); 
}
```

### RotateWithFather
- 本字段控制當前判定線是否跟隨父判定線旋轉。
- 若為 true，則當前判定線的角度將與父線角度相加，反之則不跟隨父判定線旋轉。
- 如果父判定線不存在，則本字段無效。
- 以下是一個示例代碼，展示如何計算當前判定線的角度：

```csharp
JudgeLine[] this; // 假設 this 是當前 JudgeLine 數組
public float GetRotateAtTime(int index, float time)
{
    // 在沒有父線或不跟隨父線旋轉的情況下直接返回
    if (this[index].Father == -1 && !this[index].RotateWithFather ) return this[index].GetRotateAtTime(time);
    
    int fatherIndex = this[index].Father;
    // 獲取父線角度
    float fatherAngle = GetRotateAtTime(fatherIndex, time);
    // 獲取當前線的角度
    float currentAngle = this[index].GetRotateAtTime(time);
    // 返回父線角度與當前線角度的和
    return fatherAngle + currentAngle;
}
```

### ExtendedEvents

- 本字段存儲擴展事件列表，詳見[ExtendedLayer](/zh_hant/chart_format/extended_layer.md)。

### TexturePath
- 本字段用於兼容一些譜面與資源分體存儲的情況。
- 本字段存儲判定線紋理相對於譜面文件所在目錄的路徑，如 `Assets/0721.png` 則表示譜面文件所在目錄下的 `Assets` 文件夾中的 `0721.png` 文件。
- 本字段允許存儲 URL 地址，方便了譜面分發網站對譜面的單獨分發，其它資源可以靠模擬器自行下載。
- 在使用本字段時，`TextureData` 字段必須為 null。

## proto 段落

```protobuf
syntax = "proto3";
package PhiCommonChart.ChartStructs;

message JudgeLine {
   bytes TextureData = 1;
   bool IsGitTexture = 2;
   repeated Event_Single XMoveEvents = 3;
   repeated Event_Single YMoveEvents = 4;
   repeated Event_Single RotateEvents = 5;
   repeated Event_Byte AlphaEvents = 6;
   repeated Event_Single SpeedEvents = 7;
   repeated Note Notes = 8;
   int32 FatherIndex = 9;
   bool RotateWithFather = 10;
   bool IsCover = 11;
   AttachUi AttachUi = 12;
   repeated float Anchor = 13 [packed = false];
   float BpmFactor = 14;
   int32 ZOrder = 15;
   ExtendedEventLayer ExtendedEvents = 16;
   string TexturePath = 100;
}
enum AttachUi {
  None = 0;
  Pause = 1;
  ComboNumber = 2;
  ComboText = 3;
  Score = 4;
  ProgressBar = 5;
  Name = 6;
  Level = 7;
}
```
