# 事件
本段介绍单个事件结构。
::: info 提示
**本页所有字段兼容等级为 0。**
:::

## JSON 示例

```json
{
  "StartBeat": 0,
  "EndBeat": 1,
  "StartValue": 0.0,
  "EndValue": 1.0
}
```

## 结构规范
| 唯一标识符 |     字段名      |  类型   |         描述         | 默认值 | 加入版本 |
|:-----:|:-------------:|:-----:|:------------------:|:---:|:----:|
|   1   |    StartBeat   | float |      事件开始拍数       |  -  |  1   |
|   2   |     EndBeat    | float |      事件结束拍数       |  -  |  1   |
|   3   |    StartValue   |   T   |      事件开始值        |  -  |  1   |
|   4   |     EndValue    |   T   |      事件结束值        |  -  |  1   |

## 行为规范
- `StartBeat` 和 `EndBeat` 定义了事件的时间范围，`EndBeat` 不可能小于 `StartBeat`。
- `Value` 的类型可能是任意的，比如 `ColorEvent`中、`Value` 的类型是 `byte[]`。
- 我们没有为事件设计缓动，事件的值均为线性变化。