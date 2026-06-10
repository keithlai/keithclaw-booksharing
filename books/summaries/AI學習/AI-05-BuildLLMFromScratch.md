# AI-05：Build a Large Language Model (From Scratch)

> **作者**：Sebastian Raschka（威斯康辛大學麥迪遜分校教授、Lightning AI）

| 項目 | 內容 |
|------|------|
| **難度** | 🟡 中階 |
| **作者** | Sebastian Raschka，知名ML研究者兼作家（之前寫過Python Machine Learning） |
| **出版** | 2024年 Manning Publications |
| **預估閱讀時間** | 3-6週（跟埋Code練習） |
| **前置技能** | Python中階、基本ML概念（Neural Network點運作） |
| **GitHub** | 完整Code accompany，每章都有Notebook |
| **適合對象** | 想徹底搞明LLM點Build出嚟嘅工程師、想做LLM開發嘅人 |

---

## 📚 本書係咩來頭？

2024年出版嘅新書，係市面上極少數「由零寫一個LLM」嘅實戰書。多數LLM教材剩係講點用API或者LangChain，但呢本書帶你**逐行Code實作**一個完整嘅LLM。

Sebastian Raschka係ML教育界嘅知名作者，他嘅Python Machine Learning系列係Amazon暢銷書。佢喺Lightning AI做Developer Advocate，有豐富嘅Industry + Academic經驗。

本書嘅GitHub Repository有超過10K Stars，Community非常活躍。

---

## 🧠 核心概念（詳細解說）

### 第1章：理解LLM（Overview）

- **LLM vs 傳統ML Model**：點解LLM咁特別？（Emergent Abilities、In-Context Learning）
- **GPT vs BERT**：Autoregressive vs Encoder-Only
- **Transformer架構回顧**：呢度作者會快速Review Transformer基礎（建議先讀過Transformer原論文或用Raschka嘅YouTube影片做預習）
- **Scaling Law**：參數越多=效果越好？OpenAI嘅Scaling Law論文

### 第2章：Tokens同Tokenization

**呢章係全書最實用之一！**
- **Byte Pair Encoding（BPE）**：GPT用嘅Tokenization算法，由零實作
- **Special Tokens**：`<|endoftext|>`、`<|pad|>`、`<|unk|>`等嘅用途
- **Vocabulary Building**：點樣由Raw Text建立Token Dictionary
- **Tokenization嘅陷阱**：
  - 點解「hello world」同「helloworld」係唔同Token？
  - 點解Tokenizer決定咗Model嘅能力上限？
  - LLM處理唔同語言嘅能力差異（CJK Language嘅Token Efficiency低）

### 第3章：Attention Mechanism實作

**最關鍵亦最難嘅一章**：
- **Simplified Self-Attention**：由最基本嘅Weighted Sum開始
- **Scaled Dot-Product Attention**：加上Scale factor
- **Causal Attention（Masked Attention）**：確保只睇到前面嘅Token
- **Multi-Head Attention**：8個Head並行計算
- **Dropout in Attention**：對Attention Weights做Regularization

作者用**逐步實作**嘅方式：先寫最簡單版本，再逐個加入新功能，最後完結咗成個Multi-Head Causal Attention。

### 第4章：GPT Model Architecture

**組裝成個LLM**：
- **GPT Blocks**：Layer Norm → Multi-Head Attention → Layer Norm → FFN
- **Layer Normalization** vs Batch Normalization（點解LLM用Layer Norm？）
- **GELU Activation**：ReLU嘅平滑版本
- **Shortcut Connections（Residual）**：多層Network嘅訓練關鍵
- **位置編碼**：論文用Sinusoidal，但而家更多用Learnable Positional Embeddings

呢章完結嘅時候，你有一個**完整但未訓練**嘅小型GPT Model。

### 第5章：預訓練（Pretraining）

**最消耗GPU嘅部分**：
- **Language Modeling Objective**：Next Token Prediction
- **Cross-Entropy Loss**：點計算Loss
- **Perplexity**：評估語言模型嘅Metric
- **Data Loading**：Efficient Batch Loading（要確保每個Batch嘅Sample長度一致）
- **Training Loop**：Standard Training Loop + Learning Rate Warmup + Cosine Decay
- **GPU Memory Management**：Gradient Accumulation、Mixed Precision Training

作者用The Pile dataset嘅子集做訓練，你可以喺Google Colab（免費GPU）上行到小型版本。

### 第6章：微調分類任務（Fine-tuning for Classification）

- **Base Model vs Instruction Model**：兩者分別
- **Classification Head**：喺Top加一個Linear Layer做分類
- **最後一層Token**：`<|eos|>` Token嘅Hidden State做分類
- **Full Fine-tuning**：更新晒所有Parameters
- **Evaluation**：Accuracy、F1 Score

呢章示範點樣將Pre-trained LLM Adapt到具體Task（如Spam Detection、Sentiment Analysis）。

### 第7章：微調指令（Fine-tuning for Instruction Following）

**呢章係而家最熱門嘅主題**：
- **Instruction Dataset**：點構造（Input-Output Pair、Chat Template）
- **Loss Masking**：Train時只對Output部分算Loss，Ignore Input部分
- **Supervised Fine-tuning**：OpenAI用嘅方法
- **Chat Template**：Assistant/User/System角色嘅處理
- **Model Saving & Loading**

呢章教你點樣令Base Model識跟Instruction（即係變做ChatGPT咁樣）。

### 第8章：Alignment（對齊）

**RLAIF同DPO**：
- **RLHF（強化學習人類反饋）**：如何將人類偏好加入LLM
- **Reward Model**：Train一個模型判別好/壞回答
- **PPO（Proximal Policy Optimization）**：RL微調（呢部份比較複雜）
- **DPO（Direct Preference Optimization）**：而家更流行嘅替代方案，唔需要Reward Model
- **Constitutional AI**：Claude用嘅Alignment方法

作者詳細比較RLHF vs DPO，解釋爲咩DPO更簡單但效果相近。

---

## 💡 關鍵 Takeaways

1. **LLM唔神秘，係可以用Code實作嘅**：本書證明了LLM唔係黑魔法，而係一堆可理解嘅數學+良好嘅Engineering。
2. **Tokenization係LLM嘅基礎**：好多LLM問題（如唔識處理某啲語言、Token限制）都源於Tokenizer。
3. **Attention Mechanism係核心**：如果你只可以專注理解一個概念，就係Multi-Head Causal Attention。
4. **Fine-tuning > Pretraining**：對大多數人嚟講，用Open Source Model做Fine-tuning比由零Pretrain實際得多。
5. **Alignment決定Model Safety**：點解Claude比Base LLaMA安全？就係Alignment做得好。

---

## 🎯 呢本書教識你咩？

- 由零寫一個完整嘅GPT Model
- 理解LLM內部點運作（唔係黑箱）
- 有能力Fine-tune Open Source LLM（LLaMA、Mistral等）
- 理解RLHF/DPO等Alignment技術嘅原理同實作

---

## 👤 適合咩人喺咩階段睇？

| 適合程度 | 建議 |
|---------|------|
| ✅ **想由Application Developer轉LLM Developer** | 呢本係最好嘅橋樑書 |
| ✅ **讀過Hands-On ML或花書嘅人** | 有DL基礎就可以直接啃 |
| ✅ **做RAG/Agent開發嘅人想理解底層** | 理解LLM內部有助Debug同優化 |
| ❌ **完全零ML基礎** | 先讀Hands-On ML嘅DL部分 |
| ❌ **只想用API（GPT/Claude API）嘅人** | 呢本對你嚟講Overkill |

---

## 🔗 相關資源

- **GitHub（完整Code）**：https://github.com/rasbt/LLMs-from-scratch
- **YouTube Channel（作者係活躍YouTuber）**：https://www.youtube.com/@SebastianRaschka
- **Manning官網（有互動Notebook）**：https://www.manning.com/books/build-a-large-language-model-from-scratch
- **Andrej Karpathy「Let's Build GPT from Scratch」**：https://www.youtube.com/watch?v=kCc8FmEb1nY
- **Hugging Face Transformers Docs**：https://huggingface.co/docs/transformers/index
- **AI-03 Transformer原論文**：讀呢本書之前最好睇咗Transformer原論文先
- **Goodreads**：https://www.goodreads.com/book/show/209183777-build-a-large-language-model-from-scratch
- **Amazon**：https://www.amazon.com/Build-Large-Language-Model-Scratch/dp/1633437167

---

## 📝 閱讀建議

| 步驟 | 建議作法 |
|------|---------|
| **Week 1** | Ch1-Ch3：Tokenization + Attention實作（呢個係基礎） |
| **Week 2** | Ch4-Ch5：Build GPT Model + Pretraining |
| **Week 3** | Ch6-Ch7：Fine-tuning分類 + 指令 |
| **Week 4** | Ch8：Alignment + Recap |

**配搭資源**：
- 睇完Ch3（Attention）後，睇Andrej Karpathy嘅Let's Build GPT
- 睇完Ch5（Pretraining）後，試用Hugging Face嘅Transformers Library做同樣嘢
- 睇完Ch7（Instruction Fine-tuning）後，試Fine-tune LLaMA 3 8B用Unsloth

**同其他書嘅關係**：
- **前置**：AI-04 Hands-On ML（DL基礎）+ AI-03 Transformer原論文
- **同步閱讀**：AI-08 RAG（理解RAG之後再回頭睇Ch6-7 Fine-tuning對比）
