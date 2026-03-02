# Single pixel imaging

## 1. Why use single pixel imaging?

Traditional digital camera using `CCD` and `CMOS` matrix to capture millions of pixels once a time. But the main idea of single pixel imaging is to sacrifice time to get spacial information.

- Priciple: Use single point detector without any spacial resolution. Such as photodiode and photo-resistor.Match up with a series of orthogonality patterns.

- Physical model:
    $$O(x,y) = \frac{1}{M} \sum_{i=1}^{M} (d_i - \bar{d}) \cdot P_i(x,y)$$
    **参数说明：**
* **$O(x,y)$**: 最终重建出的二维图像。
* **$M$**: 采样总数，采样率通常定义为 $M / N$（$N$ 为总像素数）。
* **$d_i$**: 桶探测器（Bucket Detector）记录的第 $i$ 个强度信号。
* **$P_i(x,y)$**: 对应第 $i$ 次采集时所用的调制掩模。

