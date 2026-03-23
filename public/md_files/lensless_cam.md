# Lensless Camera

## Diffuser Cam WorkFlow
> lensless imaging = optics（mask） + reconstruction（inverse problem）

![Lens image](picture/diffusercam.png "Lens")
> From: DiffuserCam — lensless single-exposure 3D imaging。

### Compare lenscamera with lensless-camera

![lens compare](picture/lenscompare.png "compare")
> From: Lensless camera: Unraveling the breakthroughs and prospects

## Calibration
1. normal lens camera（a point map to point）。lensless：如果需要知道3D空间中的每一个点的信息，需要把点光源放在3D空间中每一个Voxel上拍照标定，非常耗时间。
2. Diffuser cam标定：选择表面平滑的相位扩散片作为diffuser（满足paraxial approximation），因此在同一平面左右移动point source的时候具有Shift invariance。只有在不同深度时光斑图像才会变化。
3. 想要重建多少层，就标定多少张。
![Shift invariance](picture/shift_invariance.png "invariance")
> From: DiffuserCam — lensless single-exposure 3D imaging。


> 把一个原本需要在 X、Y、Z 三个维度上进行的全空间暴力扫描，降维成了只在 Z 轴上进行的一维直线扫描。

## 3D Convolution Model

> 把在`calibration`中标定的几百张`PSF`堆叠起来变成一个3维矩阵`H`。

### 公式解释

- **公式（向量形式）**: $b = H*v$
- **直观含义**: 观测向量 `b` 是传感器上得到的 2D 散斑图像（将图像摊平成向量），`v` 是我们要重建的 3D 体积（把每一层平面按顺序展开并连接成向量），`H` 则是把 3D 体积映射到 2D 传感器的线性算子（由标定得到的各深度点扩散函数 PSF 构成）。

## Alternating Diraction Method of Multiplier (ADMM)

根据拍到的2D散斑图，反推真实的3D场景是什么(inverse problem)。

### ADMM如何与3D convolution model协同工作 
```mermaid
graph TD
    %% 定义节点颜色样式
    classDef input fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
    classDef model fill:#e8f5e9,stroke:#388e3c,stroke-width:2px;
    classDef decision fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef algo fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    classDef result fill:#ffebee,stroke:#d32f2f,stroke-width:2px;

    %% 节点定义
    RealData[/"已知线索：<br/>墙上的真实影子照片<br/>【相机拍到的 2D 散斑图 b】"/]:::input
    
    Init["第 1 步：瞎猜 (初始化)<br/>随便画一个虚拟的积木形状<br/>【初始化未知的 3D 场景矩阵 v】"]:::algo
    
    Forward["第 2 步：影子模拟器 (正向计算)<br/>算出这个虚拟积木会投出什么影子<br/>【执行 3D 卷积模型: 虚拟 2D 图 = Hv】"]:::model
    
    Compare{"第 3 步：找茬对比<br/>算出的虚拟影子<br/>跟真实照片一样吗？<br/>【计算目标函数误差】"}:::decision
    
    Update["第 4 步：ADMM 微调修正<br/>根据误差修改积木形状，并把毛刺抹平<br/>【更新 3D 矩阵，并应用 3D TV 稀疏约束】"]:::algo
    
    Output["第 5 步：破案！(最终输出)<br/>此时的虚拟积木就是真实的积木<br/>【输出高清的 3D 场景】"]:::result

    %% 连接线与逻辑流向
    RealData -.->|提供对比标准| Compare
    Init --> Forward
    
    %% 核心循环圈
    Forward --> Compare
    Compare -- "不一样，差距很大<br/>(误差 > 阈值)" --> Update
    Update -- "拿着新改好的积木<br/>再扔进模拟器算一次" --> Forward
    
    %% 结束条件
    Compare -- "一模一样！<br/>(误差极小，达到收敛)" --> Output
```

## 流程图 (Flowchart)

```mermaid
graph TD
    %% 定义节点样式
    classDef hardware fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    classDef data fill:#fff3e0,stroke:#f57c00,stroke-width:2px;
    classDef model fill:#e8f5e9,stroke:#388e3c,stroke-width:2px;
    classDef algo fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;
    classDef result fill:#ffebee,stroke:#d32f2f,stroke-width:2px;

    %% 流程节点
    A["阶段一：硬件搭建与设置<br/>点光源 ➔ 光圈 ➔ 扩散片 ➔ 传感器"]:::hardware
    B["阶段二：系统标定 Calibration<br/>沿轴向移动点光源，记录各深度的点扩散函数 PSF"]:::hardware
    C["阶段三：单次曝光采集 Measurement<br/>对真实 3D 场景进行单次曝光，获得 2D 散斑图像"]:::data
    D["阶段四：正向物理模型构建<br/>基于空间平移不变性，建立 3D 卷积模型: b = Hv"]:::model

    %% 算法子图 - 使用英文 ID 并在括号内加双引号显示中文
    subgraph Stage5 ["阶段五：ADMM 迭代重建算法"]
        direction TB
        E["1. 变量分裂 Variable Splitting<br/>将复杂优化问题拆解"]:::algo
        F["2. 稀疏性约束<br/>引入 3D 全变分 (3D TV) 先验"]:::algo
        G["3. 频域加速<br/>在 3D 傅里叶域中进行高效的矩阵求逆"]:::algo
        
        E --> F --> G
    end

    H["阶段六：最终输出<br/>生成非均匀网格的、上亿体素的高分辨率 3D 图像"]:::result

    %% 连接关系
    A --> B
    B --> C
    C --> D
    D --> E
    G --> H
```



