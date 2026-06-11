# AI-09：LiteLLM 實戰：統一多模型接口

> **用一個API Call 100+ LLM，支援Load Balance、Fallback、Rate Limiting**

| 項目 | 內容 |
|------|------|
| **難度** | 🟢 入門 |
| **開發者** | BerriAI（開源社群活躍） |
| **GitHub Stars** | 15K+ |
| **預估學習時間** | 1-2天（基本整合），1週（Production配置） |
| **適合對象** | 任何用多個LLM Provider嘅開發者、想做Model Router嘅人 |

---

## 📚 呢個工具係咩來頭？

LiteLLM係一個**開源嘅LLM Proxy/統一接口工具**，佢解決咗一個好實際嘅問題：

> 你嘅App要Call GPT-4，但萬一OpenAI Server Down咗？要自動Fallback去Claude。你嘅App要Call DeepSeek，但佢Rate Limit好緊，需要分散負載。你公司用5個唔同嘅Model Provider，每個都有唔同嘅API Key同Endpoints。

LiteLLM俾你一個**統一嘅API接口**（兼容OpenAI SDK格式），你可以：
1. 一個API Call 100+ LLM（OpenAI、Anthropic、Google、DeepSeek、Cohere、Hugging Face等）
2. 設定Load Balancing：多個API Key自動分配
3. 設定Fallback：A Model Fail → B Model
4. Rate Limiting：防止爆API Key
5. Spend Tracking：記錄每個Model用咗幾多錢

---

## 🧠 核心概念（詳細解說）

### 1. 統一API接口（OpenAI SDK Compatible）

LiteLLM嘅設計理念係：**你用OpenAI SDK嘅Code，可以Call任何Model Provider**。唔需要為每個Provider寫唔同嘅Code。

```python
# OpenAI SDK（你原本咁寫）
from openai import OpenAI
client = OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}]
)

# LiteLLM（你改個Base URL就得）
from openai import OpenAI
client = OpenAI(base_url="http://localhost:4000")  # LiteLLM Proxy
response = client.chat.completions.create(
    model="claude-3-opus",  # 同一個API Call Claude！
    messages=[{"role": "user", "content": "Hello"}]
)
```

**只需要改Base URL同Model Name**，你成個App嘅Code唔使改。

### 2. Load Balancing（負載均衡）

當你有多個API Key（例如有3個OpenAI Key），LiteLLM自動分配請求：

```yaml
# config.yaml
model_list:
  - model_name: gpt-4
    litellm_params:
      model: openai/gpt-4
      api_key: os.environ/OPENAI_API_KEY_1
  - model_name: gpt-4
    litellm_params:
      model: openai/gpt-4
      api_key: os.environ/OPENAI_API_KEY_2
```

LiteLLM會Round Robin或者Least Load方式分配請求，提高Throughput。

### 3. Fallback（自動降級）

如果Primary Model Fail（TimeOut／Rate Limit／Down），自動轉去Backup：

```python
from litellm import completion

response = completion(
    model="gpt-4",
    messages=[{"role": "user", "content": "Hello"}],
    fallbacks=["claude-3-opus", "gemini-pro"]  
    # GPT-4 Fail → Claude → Gemini
)
```

呢個功能喺Production極重要。你唔想User因為OpenAI Down就用唔到你個App。

### 4. Rate Limiting + Spend Tracking

- **Rate Limit**：每個API Key每分鐘/每小時限制請求數
- **Spend Tracking**：自動記錄每Model用咗幾多錢
- **Budget Management**：設定Monthly Budget，超標自動Stop

呢啲功能對Team/Enterprise使用好重要，避免有Team Member唔小心燒咗大額API Bill。

### 5. LiteLLM Proxy（Docker Deployment）

Production用LiteLLM Proxy模式：

```bash
docker run -p 4000:4000 \
  -v $(pwd)/config.yaml:/app/config.yaml \
  ghcr.io/berriai/litellm:main-latest \
  --config /app/config.yaml --port 4000
```

然後你班Frontend App全部Point去 `http://your-server:4000`，唔使逐個改API Key。

### 6. LiteLLM + n8n + MCP三件套

係構建AI Agent Infrastructure嘅黃金組合：

```
User Query 
  → n8n（Workflow Orchestration）
    → LiteLLM Proxy（Model Routing + Fallback + Rate Limit）
      → OpenAI / Claude / DeepSeek等
  → MCP Server（Tool Execution）
    → Database / API / File System
```

- **n8n**負責「做咩流程」
- **LiteLLM**負責「用邊個Model」
- **MCP**負責「點連接外部工具」

---

## 💡 關鍵 Takeaways

1. **一個API Call 100+ LLM**：只需要學一次API Code。
2. **Fallback係Production必須**：Single Provider永遠會Fail。
3. **Cost Control係大規模使用嘅關鍵**：無Spend Tracking好易燒大錢。
4. **LiteLLM係Infrastructure Layer**：唔係你直接面對嘅工具，而係背景嘅Proxy。
5. **配合OpenAI SDK兼容**：唔使改App Code就可以整合。

---

## 🎯 呢個工具教識你咩？

- 管理多個LLM Provider（Key Rotation、Fallback、Load Balance）
- 控制LLM成本（Spend Tracking、Budget Limit）
- 提升LLM應用嘅Stability（Provider Fail唔影響User）
- 理解AI Infrastructure嘅設計模式

---

## 👤 適合咩人喺咩階段睇？

| 適合程度 | 建議 |
|---------|------|
| ✅ **用緊LLM API嘅任何Developer** | 管理API Key同Provider好麻煩 |
| ✅ **Team/Startup需要多Model** | LiteLLM幫你集中管理 |
| ✅ **用緊LangChain/n8n嘅人** | 配合使用效果最佳 |
| ❌ **只用一個Model** | 用唔著，直接Call OpenAI就得 |
| ❌ **非技術人員** | LiteLLM係DevOps/Backend工具 |

---

## 🔗 相關資源

- **官方文檔**：https://docs.litellm.ai/
- **GitHub**：https://github.com/BerriAI/litellm
- **Quick Start Tutorial**：https://docs.litellm.ai/docs/proxy/quick_start
- **LiteLLM + LangChain Integration**：https://docs.litellm.ai/docs/langchain/basic
- **YouTube Tutorials**：https://www.youtube.com/results?search_query=litellm+tutorial
- **LiteLLM Proxy Deployment Guide**：https://docs.litellm.ai/docs/proxy/deploy

---

## 📝 學習路徑

| 階段 | 學習內容 |
|------|---------|
| **1小時** | pip install litellm，Call 3個唔同Model |
| **半天** | 設定config.yaml，做Load Balancing |
| **1天** | Deploy LiteLLM Proxy Docker，整合Fallback |
| **2天** | 設定Spend Tracking + Rate Limit |
| **進階** | LiteLLM + n8n + MCP整合 |

**同其他書嘅關係**：
- **配合使用**：AI-06 LangChain、AI-07 n8n、AI-10 MCP
- **前置**：LangChain入門（可選）
