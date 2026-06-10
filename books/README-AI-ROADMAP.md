# 🧠 AI 學習 Roadmap — 由淺入深閱讀指南

> **從 AI 應用開發者到理解 LLM 內部原理，再到 AI 理論基礎**
>
> 總共 10 本書／資源，分 3 個階段，預計 **4-6 個月**完成

---

## 🗺️ Roadmap 總覽

```
階段一：AI 應用實戰（入門）
    AI-06  LangChain 入門
    AI-09  LiteLLM 實戰
    AI-10  MCP Protocol 入門
    AI-07  n8n 自動化工作流
        ↓
階段二：LLM 原理精通（中階）
    AI-04  Hands-On Machine Learning
    AI-08  RAG 檢索增強生成
    AI-05  Build LLM From Scratch
        ↓
階段三：AI 理論深度（進階）
    AI-03  Transformer 原論文
    AI-02  深度學習（花書）
    AI-01  人工智能：一種現代方法（AIMA）
```

> **設計理念**：由實戰落手，再用理論支撐。
> 先有得用、先睇到成果，先有動力深入原理。
> 唔係硬啃數學先，而係「遇到問題 → 追查原理 → 理解數學」。

---

## 🟢 階段一：AI 應用實戰（2-3 星期）

### 目標
唔需要 ML 背景，直接用 LLM 開發工具整到有用嘅嘢，建立成就感。

### 閱讀順序

#### 第1本：AI-06 LangChain 入門與實戰

| 項目 | 內容 |
|------|------|
| **時間** | 1 星期 |
| **難度** | 🟢 入門 |
| **前置** | Python 基礎 |
| **學習方式** | 跟官方 Tutorial 寫 Code |

**學完之後做到嘅嘢**：
✅ 用 5 行 Code Call GPT/Claude API
✅ 整一個 PDF 問答 Bot（RAG）
✅ 整一個可以 Search Web 嘅 AI Agent

**Project 建議**：
- 整一個 Telegram/Discord Bot，自動回答你嘅文件問題
- 用 LangChain + Streamlit 整個簡單嘅 Chat Interface

**免費資源搭配**：
- [LangChain 官方 Tutorials](https://python.langchain.com/docs/tutorials/)
- [DeepLearning.AI LangChain Short Course](https://www.deeplearning.ai/short-courses/)
- Fireship「LangChain in 100 Seconds」

---

#### 第2本：AI-09 LiteLLM 實戰

| 項目 | 內容 |
|------|------|
| **時間** | 1-2 天 |
| **難度** | 🟢 入門 |
| **前置** | 用過 LLM API（就快會有） |

**學完之後做到嘅嘢**：
✅ 一個 API Call 100+ LLM Model
✅ Model Fallback（GPT-4 Down → 自動轉 Claude）
✅ Load Balancing（多個 API Key 分散壓力）
✅ Spend Tracking（睇住每個 Model 用咗幾多錢）

**Project 建議**：
- 同 LangChain 一齊用，LangChain 連 LiteLLM Proxy
- 設定一個 Production 級嘅多 Model Router

---

#### 第3本：AI-10 MCP Protocol 入門

| 項目 | 內容 |
|------|------|
| **時間** | 2-3 天 |
| **難度** | 🟢 入門 |
| **前置** | Python 基礎 |

**學完之後做到嘅嘢**：
✅ 理解 MCP 係咩（LLM 嘅 USB 標準）
✅ 用 Pre-built MCP Server（File System、GitHub、Database）
✅ 寫自己嘅第一個 MCP Server

**Project 建議**：
- 將你平時用嘅 API 變成 MCP Server（天氣、股票、新聞）
- 喺 OpenClaw / Claude Desktop 上面用 MCP Server 做 Tool Calling

---

#### 第4本：AI-07 n8n 自動化工作流

| 項目 | 內容 |
|------|------|
| **時間** | 3-5 天 |
| **難度** | 🟢 入門 |
| **前置** | 唔需要 ML 背景 |

**學完之後做到嘅嘢**：
✅ Drag & Drop 建立 AI 工作流（唔寫 Code）
✅ 整合 AI Agent + API + Database
✅ 用 n8n 整自動化 Customer Support Agent

**Project 建議**：
- 整一個 Email 自動分類 + 回覆 Agent
- 整一個 Slack Bot：當有人問問題，自動 Search Knowledge Base 再 Answer

---

### 🎯 階段一完成後嘅能力

| 能力 | 等級 |
|------|------|
| 用 Python Call LLM API | ⭐⭐⭐⭐⭐ |
| 構建 RAG 系統 | ⭐⭐⭐⭐ |
| 構建 AI Agent | ⭐⭐⭐⭐ |
| 理解 LLM Tool Calling | ⭐⭐⭐⭐ |
| 用 n8n 整 No-Code 流程 | ⭐⭐⭐⭐⭐ |
| 管理多 Model Provider | ⭐⭐⭐⭐ |

---

## 🟡 階段二：LLM 原理精通（4-6 星期）

### 目標
由「用 LLM」進階到「理解 LLM 點 Work」，有能力 Fine-tune 同 Debug LLM。

### 閱讀順序

#### 第5本：AI-04 Hands-On Machine Learning

| 項目 | 內容 |
|------|------|
| **時間** | 2-3 星期（重點睇 DL 部分） |
| **難度** | 🟡 中階 |
| **前置** | Python 中階、基本線性代數概念 |

**注意**：唔使睇晒全書。先睇 Part I（Scikit-Learn 傳統 ML），再專注 Part II（Keras/TensorFlow DL）。如果你有 ML 經驗，可以直接跳去 Part II。

**學完之後做到嘅嘢**：
✅ 由零 Train 一個 Neural Network
✅ 識用 Scikit-Learn / Keras / TensorFlow
✅ 理解 CNN、RNN、Transfer Learning
✅ 有能力做 Kaggle Competition

**Project 建議**：
- 用 MNIST/CIFAR-10 整一個圖片分類器
- 用 TensorFlow 做 Time Series Forecasting

**免費資源搭配**：
- [Kaggle ML Course](https://www.kaggle.com/learn)
- [Andrew Ng ML Specialization](https://www.coursera.org/specializations/machine-learning-introduction)
- [3Blue1Brown Neural Networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

---

#### 第6本：AI-08 RAG 檢索增強生成實戰

| 項目 | 內容 |
|------|------|
| **時間** | 1-2 星期 |
| **難度** | 🟡 中階 |
| **前置** | LangChain 基礎、Python |

**學完之後做到嘅嘢**：
✅ 構建 Production-ready 嘅 RAG 系統
✅ 掌握 Chunking / Embedding / Vector Search 三大技術
✅ Hybrid Search（Vector + Keyword）
✅ Agentic RAG（Agent 決定點 Search）
✅ RAG Evaluation（用 RAGAS 評估系統質素）

**Project 建議**：
- 整一個可以 Search 你公司全部文檔嘅 Enterprise Search
- 整一個 RAG + Agent 嘅系統，可以 Search Multiple Sources

**免費資源搭配**：
- [Pinecone RAG Guide](https://www.pinecone.io/learn/rag/)
- [LangChain RAG From Scratch](https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23IXQ4SU)

---

#### 第7本：AI-05 Build LLM From Scratch

| 項目 | 內容 |
|------|------|
| **時間** | 2-3 星期 |
| **難度** | 🟡 中階 |
| **前置** | Hands-On ML 嘅 DL 部分、Python |

**呢本係階段二嘅重中之重**。

**學完之後做到嘅嘢**：
✅ 由零 Code 一個完整嘅 GPT Model
✅ 理解 Tokenization / Attention / Pretraining
✅ Fine-tune LLM（分類 + 指令微調）
✅ 理解 RLHF / DPO Alignment
✅ 識用 Hugging Face Transformers

**Project 建議**：
- 在 Colab 上 Fine-tune LLaMA 3 8B 做一個專用 Assistant
- 由零 Train 一個小型 GPT（The Pile dataset子集）

**免費資源搭配**：
- [Andrej Karpathy「Let's Build GPT」](https://www.youtube.com/watch?v=kCc8FmEb1nY)
- [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course)
- [Unsloth（快速 Fine-tune）](https://github.com/unslothai/unsloth)

---

### 🎯 階段二完成後嘅能力

| 能力 | 等級 |
|------|------|
| 理解 Neural Network 底層 | ⭐⭐⭐⭐ |
| Fine-tune LLM | ⭐⭐⭐⭐⭐ |
| 構建 Production RAG System | ⭐⭐⭐⭐⭐ |
| 理解 LLM 內部架構 | ⭐⭐⭐⭐ |
| 用 Hugging Face 生態 | ⭐⭐⭐⭐ |
| Debug LLM 問題 | ⭐⭐⭐ |

---

## 🔴 階段三：AI 理論深度（4-8 星期）

### 目標
由「理解 LLM 點 Work」進階到「掌握 AI 完整理論體系」。

### 閱讀順序

#### 第8本：AI-03 Transformer 原論文

| 項目 | 內容 |
|------|------|
| **時間** | 1-2 星期 |
| **難度** | 🔴 進階 |
| **前置** | Build LLM From Scratch（強烈建議讀完先） |

**注意**：雖然得 10 頁 Paper，但係最濃縮嘅知識。要逐段細讀、逐個公式理解。

**學完之後做到嘅嘢**：
✅ 完整理解 Transformer 架構（唔係表面）
✅ 有能力閱讀其他 AI Paper
✅ 知道 LLM Scared 咗嘅所有機制（Attention / Position Encoding / Multi-Head）

**免費資源搭配**：
- [3Blue1Brown Transformer](https://www.youtube.com/watch?v=eMlx5fFnoY)（必睇）
- [The Annotated Transformer](http://nlp.seas.harvard.edu/annotated-transformer/)
- [Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)

---

#### 第9本：AI-02 深度學習（花書）

| 項目 | 內容 |
|------|------|
| **時間** | 3-5 星期 |
| **難度** | 🔴 進階 |
| **前置** | 線性代數、概率統計、Hands-On ML |

**呢本係最難啃嘅一本**。唔使逐章睇晒，重點睇：

| 優先度 | 章節 |
|-------|------|
| ⭐⭐⭐ | Part I：數學基礎（Ch2-4） |
| ⭐⭐⭐ | Ch6：Feedforward Network |
| ⭐⭐⭐ | Ch7-8：Regularization + Optimization |
| ⭐⭐ | Ch9：CNN |
| ⭐⭐ | Ch10：RNN + Sequence Models |
| ⭐⭐ | Ch14：Autoencoders |
| ⭐ | Ch20：GAN |

**學完之後做到嘅嘢**：
✅ 理解 DL 數學證明（點解 Dropout 有效？點解 BatchNorm 加速？）
✅ 有能力讀 AI Paper 嘅數學部分
✅ 知道點樣 Diagnose 一個 Train 唔起嘅 Model

---

#### 第10本：AI-01 人工智能：一種現代方法（AIMA）

| 項目 | 內容 |
|------|------|
| **時間** | 4-6 星期（選擇性閱讀） |
| **難度** | 🔴 進階 |
| **前置** | 建議完成階段一和階段二 |

**最重要嘅策略**：唔好由頭讀到尾！揀重點章節：

| 優先度 | 部分 |
|-------|------|
| ⭐⭐⭐ | Part I：AI 總論（Ch1-2） |
| ⭐⭐⭐ | Part V：機器學習（Ch19-22） |
| ⭐⭐⭐ | Part VI：感知同語言（Ch23-26） |
| ⭐⭐ | Part III：知識表示同推理（Ch6-10） |
| ⭐⭐ | Part VII：AI 倫理同安全（Ch28） |
| ⭐ | Part II：問題求解（Ch3-5）— 有趣但而家應用較少 |

**學完之後做到嘅嘢**：
✅ 擁有 AI 完整知識地圖（唔係碎片化知識）
✅ 知道每個 AI 子領域嘅核心問題同解法
✅ 有能力判斷 AI 新技術嘅價值（知道「呢個係 old wine in new bottle」定係真創新）
✅ 真正嘅 AI 專家視野

---

### 🎯 階段三完成後嘅能力

| 能力 | 等級 |
|------|------|
| 完整 AI 理論體系 | ⭐⭐⭐⭐⭐ |
| 閱讀 AI Paper | ⭐⭐⭐⭐⭐ |
| DL 數學推導 | ⭐⭐⭐⭐ |
| AI 安全/倫理認知 | ⭐⭐⭐⭐ |
| 判斷 AI 新技術 | ⭐⭐⭐⭐⭐ |

---

## ⏱️ 時間表總覽

| 週數 | 階段 | 內容 |
|------|------|------|
| Week 1 | 一 | LangChain 入門 + Code |
| Week 2 | 一 | LiteLLM + MCP |
| Week 3 | 一 | n8n 自動化 |
| Week 4-5 | 二 | Hands-On ML（Part II DL部分） |
| Week 6-7 | 二 | RAG 實戰 |
| Week 8-10 | 二 | Build LLM From Scratch |
| Week 11 | 三 | Transformer 原論文 |
| Week 12-15 | 三 | 花書（重點章節） |
| Week 16-20 | 三 | AIMA（選擇性閱讀） |

**總計：約 20 星期（5 個月）到「AI 完整理論體系」**

---

## 🚀 實戰 Project 建議（邊學邊做）

### 第一個月做完
```
AI PDF 閱讀助手
  - LangChain + Streamlit
  - 上傳 PDF → RAG → 問答
  - 用 LiteLLM 做 Multi-Model Fallback
```

### 第二個月做完
```
自動化 Research Agent
  - n8n Workflow
  - Web Search → MCP Server (Database)
  - LLM 自動寫Summary -> Email通知
```

### 第三個月做完
```
Fine-tune 自己嘅 LLM
  - 用 Build LLM From Scratch 嘅技巧
  - 用你嘅 Personal Knowledge Base 做 Dataset
  - Fine-tune LLaMA 3 8B
  - Deploy 做你自己嘅 AI Assistant
```

### 第四-五個月做完
```
完整 AI Knowledge Base System
  - Production RAG（Hybrid Search）
  - MCP Server 連接多個 Data Source
  - n8n 做 Workflow Orchestration
  - LiteLLM 做 Model Routing
  - 將所有學過嘅嘢整合成一個系統
```

---

## 📚 書本間嘅關係圖

```
                    AI-01 AIMA（終極大局觀）
                         ↑
                    AI-02 花書（DL 理論）
                         ↑
                    AI-03 Transformer（核心論文）
                         ↑
          ┌──────────────┼──────────────┐
          │              │              │
     AI-05 Build      AI-08 RAG     AI-04 Hands-On
     LLM From Scratch  （實戰）      （DL 實戰）
          │              │              │
          └──────────────┼──────────────┘
                         ↑
     ┌───────────────────┼───────────────────┐
     │                   │                   │
AI-06 LangChain    AI-09 LiteLLM      AI-10 MCP
（框架）           （Router）        （協議）
     │                   │                   │
     └───────────────────┼───────────────────┘
                         ↑
                   AI-07 n8n（可視化流程）
```

---

## 💡 學習心法

### 1. 「唔好睇晒先做，係做咗先睇」

唔好諗住「讀晒呢 10 本書先開始整 AI 嘢」。每讀完階段一，你已經可以整到有用嘅 AI 應用。**有成就先有動力繼續**。

### 2. 70/20/10 法則

| 比例 | 活動 |
|------|------|
| 70% | 落手寫 Code / 整 Project |
| 20% | 睇書 / 論文 / 文檔 |
| 10% | 同人討論 / 寫總結 / 教人 |

**睇書唔係目標，做出嚟嘅嘢先係**。

### 3. 遇到唔明 = 正常

- 花書嘅數學推導：**睇唔明就跳過**，先睇結論。之後再返嚟。
- Transformer 論文嘅公式：先睇 3Blue1Brown 影片建立直覺。
- AIMA 嘅某些章節：可能永遠唔會用，唔使迫自己睇晒。

### 4. 用 LLM 幫你學 LLM

遇到睇唔明嘅概念：
- 叫 ChatGPT/Claude 用「中學雞都明」嘅方式解釋
- 叫佢用比喻解釋
- 叫佢寫 Code 示範

### 5. 粵語資源推薦

雖然大部分教材係英文，但以下係粵語教學頻道：
- **Alina 粵讀社**：書評 + 概念解釋
- **喃喃說書**：書評 + 心理/商業分析
- **廣東話 AI Talk**：本地 AI 社群內容

---

## 🔗 免費資源總表

### 影片教學（由淺入深）

| 資源 | 適合階段 | 連結 |
|------|---------|------|
| 3Blue1Brown Neural Networks | 階段二 | [YouTube](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) |
| 3Blue1Brown Transformer | 階段三 | [YouTube](https://www.youtube.com/watch?v=eMlx5fFnoY) |
| Andrej Karpathy Let's Build GPT | 階段三 | [YouTube](https://www.youtube.com/watch?v=kCc8FmEb1nY) |
| Andrew Ng ML Course | 階段二 | [Coursera](https://www.coursera.org/specializations/machine-learning-introduction) |
| Fast.ai Practical DL | 階段二 | [Fast.ai](https://course.fast.ai/) |
| DeepLearning.AI Short Courses | 階段一 | [DeepLearning.AI](https://www.deeplearning.ai/short-courses/) |

### 互動式學習

| 資源 | 適合階段 | 連結 |
|------|---------|------|
| Kaggle Learn | 階段二 | [Kaggle](https://www.kaggle.com/learn) |
| Hugging Face NLP Course | 階段二 | [Hugging Face](https://huggingface.co/learn/nlp-course) |
| Transformer Explainer | 階段三 | [Interactive](https://transformer-explainer.surge.sh/) |

### 文檔 / Reference

| 資源 | 適合階段 | 連結 |
|------|---------|------|
| LangChain Docs | 階段一 | [LangChain](https://python.langchain.com/docs/tutorials/) |
| Pinecone RAG Guide | 階段二 | [Pinecone](https://www.pinecone.io/learn/rag/) |
| The Annotated Transformer | 階段三 | [Harvard NLP](http://nlp.seas.harvard.edu/annotated-transformer/) |
| Illustrated Transformer | 階段三 | [jalammar](https://jalammar.github.io/illustrated-transformer/) |
| MCP Docs | 階段一 | [MCP](https://modelcontextprotocol.io/) |
| LiteLLM Docs | 階段一 | [LiteLLM](https://docs.litellm.ai/) |

---

## 🏁 總結

呢個 Roadmap 係由「唔識 AI」到「AI 完整體系」嘅最有效路徑：

```
階段一：用最快速度學到整有用嘅嘢
階段二：理解 LLM 點運作，有能力 Fine-tune
階段三：掌握完整 AI 理論體系，成為真正嘅 AI 專家
```

**最緊要係：享受過程，唔好迫自己。**

AI 呢個領域係一世的學習，唔係一個 Weekend Project。慢慢嚟，每一步都實實在在。

加油！🚀
