# AI-07：n8n 自動化工作流實戰

> **開源可視化AI工作流自動化工具**

| 項目 | 內容 |
|------|------|
| **難度** | 🟢 入門 |
| **開發者** | n8n GmbH（德國柏林） |
| **開源協議** | Sustainable Use License（免費自托管 / Cloud Paid） |
| **GitHub Stars** | 50K+ |
| **預估學習時間** | 3-7天（基礎概念），2-4週（實戰精通） |
| **適合對象** | 想整AI自動化工作流但唔想寫Code嘅人、想串接AI+API嘅營運人員 |

---

## 📚 呢個工具係咩來頭？

n8n係一個**開源嘅可視化工作流自動化工具**，概念上類似Zapier/Make（以前叫Integromat），但佢係Open Source可以自托管，數據唔會出你嘅Server。

最近n8n加入咗**AI Agent Nodes**同**LangChain Integration**，令佢由一個純API自動化工具，變成可以整合LLM/Embedding/VectorStore嘅AI工作流平台。

n8n嘅最大賣點係**可視化（Drag & Drop Nodes）**，你唔使寫Code都可以建立複雜嘅自動化流程。但佢同時支援Code Node（JavaScript/Python），俾Developer有更大彈性。

> **注意**：同LangChain唔係競爭關係。LangChain係俾Developer嘅Framework，n8n係俾任何人（包括非技術人員）嘅可視化平台。兩者可以一齊用。

---

## 🧠 核心概念（詳細解說）

### 1. Node（節點）

n8n最基本嘅單位係Node：
- **Trigger Node**：開關，由咩事件觸發？（Email收到、Webhook Call、Schedule）
- **Action Node**：做咩動作？（Send Email、Create Database Record、Call API）
- **AI Node**：LLM Call、Embedding、Vector Store

拖一個Node上Canvas → 設定參數 → 連接到下一個Node。就係咁簡單。

### 2. Workflow（工作流）

一個Workflow係一連串Node嘅Pipeline：
```
Trigger → Data Transform → AI Processing → Action
```
例如：
```
Gmail收到Attachment(PDF) 
  → Read PDF Node 
  → Split Text Node 
  → Embedding Node → Save to VectorStore 
  → LLM Node（問AI總結） 
  → Slack Node（Send Result）
```

你喺Canvas上拖Node、拉線連接，每個Node都有可設定嘅參數（唔使Code）。

### 3. Expression（表達式）

n8n用類似Angular嘅`{{ }}` Template Syntax攞資料：
```
{{ $json["summary"] }}
{{ $node["Split"]["data"]["chunks"] }}
```

呢個係唯一需要學嘅「語言」。學識咗就可以靈活處理數據流。

### 4. AI Agent Nodes

n8n而家有完整嘅AI Agent功能：
- **AI Agent Node**：LLM可以透過Tool Node執行操作
- **Tool Node**：定義Tool（Search、Calculate、API Call）
- **Memory Node**：對話歷史管理
- **Vector Store Nodes**：Qdrant、Pinecone、Chroma
- **Embedding Node**：Text → Vector

你可以喺n8n入面整一個AI Agent，佢可以Search Database、Check Email、Send Message，全部都係可視化設定。

### 5. LangChain Integration

n8n嘅AI功能底層係用LangChain：
- **LangChain LLM Node**：接任何LangChain支援嘅Model
- **LangChain Chain Node**：執行一個LangChain Chain
- **LangChain Agent Node**：Agent Execution

所以LangChain識嘅概念（Chain、Agent、Tool），喺n8n度都係似。

### 6. n8n + LiteLLM + MCP 黃金組合

n8n可以同其他AI工具組成強大嘅生態系：
```
MCP Server (提供Tool) 
  → n8n Workflow (串接流程) 
    → LiteLLM Proxy (多Model Routing)
```

例如：
- MCP Server提供Database Query Tool
- n8n Workflow檢查User Input → Decide Query Database → Call LLM → Format Response
- LiteLLM Proxy負責Load Balance（GPT-4貴就Fallback到Claude）

**呢個組合係而家構建AI Agent Infrastructure嘅最佳實踐之一。**

### 7. 自托管（Self-hosting）

n8n嘅一大優勢係可以自己Host：
```bash
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```

數據、API Keys、Workflow全部喺你嘅Server入面，唔使經過第三方。

---

## 💡 關鍵 Takeaways

1. **可視化 + 開源係n8n嘅殺手鐧**：非技術人員都可以整AI自動化，Developer又可以自己Host。
2. **AI Agent Node係game changer**：n8n由自動化工具進化成AI Agent平台。
3. **n8n + LiteLLM + MCP = AI Infrastructure三件套**：呢個組合可以handle大部分AI Agent Scenario。
4. **Debug Workflow好方便**：每個Node嘅Input/Output都可以睇，唔使逐行Code Debug。
5. **Community Nodes超豐富**：200+ Integrations，由Gmail到Salesforce到Discord到OpenAI。

---

## 🎯 呢個工具教識你咩？

- 唔寫Code都做到複雜嘅AI自動化（對非技術人員友好）
- 理解工作流編排嘅概念（Trigger → Process → Action）
- 有能力建立Production-level嘅AI Agent Pipeline
- 整合唔同SaaS工具同AI Model

---

## 👤 適合咩人喺咩階段睇？

| 適合程度 | 建議 |
|---------|------|
| ✅ **營運/市場/非技術人員** | 最適合嘅可視化AI工具 |
| ✅ **Developers想做快速Prototype** | 比寫LangChain Code快好多 |
| ✅ **Startup/中小企想慳人手成本** | 用n8n做自動化代替人手重複操作 |
| ❌ **大型Enterprise** | n8n自托管要考慮Scalability同Security |
| ❌ **想深入理解AI原理** | n8n係應用層工具，唔會教你AI原理 |

---

## 🔗 相關資源

- **官方文檔**：https://docs.n8n.io/
- **n8n YouTube Channel（大量Tutorial）**：https://www.youtube.com/@n8n-io
- **n8n AI Agent Tutorial Playlist**：https://www.youtube.com/playlist?list=PLlET0GsrETYIdxTzC4iPk5dJbIUWOPYCC
- **n8n GitHub**：https://github.com/n8n-io/n8n
- **n8n Community Templates**：https://n8n.io/workflows
- **Self-hosting Guide**：https://docs.n8n.io/hosting/
- **n8n + AI Agent 範例**：https://docs.n8n.io/advanced-ai/

---

## 📝 學習路徑

| 階段 | 學習內容 | Project Idea |
|------|---------|------------|
| **Day 1-2** | 安裝 + Basic Nodes（Webhook、HTTP Request） | Auto Email Responder |
| **Day 3-5** | AI Nodes（LLM + Embedding + Vector Store） | RAG Q&A Bot with PDFs |
| **Week 2** | Agent Node + Tool Node | AI Customer Support Agent |
| **Week 3-4** | n8n + LiteLLM + MCP組合 | 完整AI Agent Infrastructure |

**同其他書嘅關係**：
- **前置學習**：唔需要，直接上手用
- **配合使用**：AI-06 LangChain（n8n背後嘅AI Engine）、AI-09 LiteLLM（做Multi-Model Router）、AI-10 MCP（做Tool/Data Source）
