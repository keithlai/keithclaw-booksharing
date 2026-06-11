# AI-10：MCP (Model Context Protocol) 入門

> **Anthropic推出嘅開放協議，標準化LLM同外部工具/數據源嘅連接**

| 項目 | 內容 |
|------|------|
| **難度** | 🟢 入門 |
| **開發者** | Anthropic |
| **協議性質** | 開放協議（Open Protocol），類似「LLM嘅USB插頭」 |
| **發布日期** | 2024年11月 |
| **GitHub Stars** | 40K+（極速增長） |
| **預估學習時間** | 1-2天（概念理解），1週（開發MCP Server） |
| **適合對象** | 任何想俾LLM連接外部工具/數據嘅Developer |

---

## 📚 MCP係咩來頭？

MCP（Model Context Protocol）係Anthropic（Claude嘅開發公司）喺2024年底推出嘅**開放協議**。佢嘅目標係解決一個好基本但一直冇標準嘅問題：

> **點樣令LLM可以方便、安全、標準化咁連接外部工具同數據源？**

之前，每個框架（LangChain、OpenAI Function Calling、Vercel AI SDK）都有自己的Tool Calling方式，Developer要為每個平台寫唔同嘅Adapter。MCP就係為了解決呢個**碎片化問題**，制定一個統一標準。

Anthropic官方形容得好好：**MCP之於LLM，就好似USB之於周邊設備**。以前每個硬件要用自己嘅插頭（Serial Port、Printer Port、Game Port），USB統一咗硬件連接。MCP就係做同一件事——統一LLM同外部工具嘅連接。

---

## 🧠 核心概念（詳細解說）

### 1. MCP Architecture（兩層架構）

MCP採用 **Client-Server架構**：

```
LLM Application (Host) ←→ MCP Client ←→ MCP Server ←→ External System
```

- **Host**：運行LLM嘅應用（Claude Desktop、OpenClaw、VS Code Extension）
- **MCP Client**：Host入面負責同Server溝通嘅組件
- **MCP Server**：一個輕量級Server，提供特定嘅Tool/Data Source
- **External System**：Database、File System、API、Web Service

**一個Host可以同時連接到多個MCP Server**，每個Server提供唔同能力：

```
Claude Desktop
  ├── MCP Server: File System (讀寫本地檔案)
  ├── MCP Server: GitHub API (搜Repos/PR)
  ├── MCP Server: Database (查SQL)
  └── MCP Server: Calendar (Check行程)
```

### 2. 三大核心原語（Primitives）

MCP定義咗三個基本能力：

#### Tools（工具）
- LLM可以Call嘅Function（類似Function Calling）
- Server定義Tool Name + Input Schema（JSON Schema格式）
- LLM決定幾時Call、Call邊個
- **Tool Execution係User Side**（唔係LLM Side）

#### Resources（資源）
- Server可以Expose嘅數據（好似API Endpoint）
- URI-based（`file:///`、`db:///`、`api:///`）
- LLM可以Read、Search、Subscribe（睇到更新通知）

#### Prompts（提示模板）
- Server可以定義Pre-built Prompt Templates
- 類似「Plugin」用標準化嘅Prompt

### 3. MCP Server嘅開發方式

開發一個MCP Server可以好簡單：

```python
# Python example
from mcp.server import Server
from mcp.types import Tool, TextContent

server = Server("my-server")

@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="get_weather",
            description="獲取指定城市天氣",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名稱"}
                }
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    if name == "get_weather":
        weather = await fetch_weather(arguments["city"])
        return [TextContent(type="text", text=weather)]
```

**MCP Server係輕量級程序**，可以係：
- Python Script（用mcp library）
- Node.js（用@modelcontextprotocol/sdk）
- 或者任何語言（Standard Input/Output協議）

### 4. MCP Transport（連接方式）

MCP支援兩種Transport方式：

**stdio（標準輸入輸出）**：
- Server同Host喺同一部機行
- 透過stdin/stdout溝通
- 適合本地工具（File System、本機Database）
- 最簡單嘅部署方式

**HTTP（SSE）**：
- Server可以Remote Host
- Host用HTTP SSE連接到Remote Server
- 適合共享嘅Team Service

### 5. MCP Security Model

MCP嘅安全設計：
- **User有完全控制權**：Host問User「Allow Server X to use Tool Y?」
- **Tool Execution喺Server Side**：LLM只係發Request，實際執行喺Server
- **Server可以有限制**：Read-only File System、Limited API Access
- **Anthropic已經內置安全審查**：Pre-built MCP Server會經過安全審查

### 6. MCP Ecosystem（生態系）

MCP推出半年，生態已經好豐富：

**Pre-built MCP Servers**：
- **File System**：讀寫本地檔案（OpenClaw用緊）
- **GitHub**：Search Code、Create PR、Comment
- **Slack**：Search Messages、Send Message
- **PostgreSQL / SQLite**：Database Query
- **Puppeteer**：Browser Automation
- **Brave Search**：Web Search
- **Memory**：LLM記憶持久化

**主要Host支援**：
- **Claude Desktop**（Anthropic原生支援）
- **OpenClaw**（你而家用緊嘅平台）
- **VS Code + Cline/Copilot**（程式碼助手）
- **LangChain**（MCP Integration）
- **Continue.dev**（Open Source IDE Assistant）

---

## 💡 關鍵 Takeaways

1. **MCP係AI Tool生態嘅USB標準**：LLM同外部工具嘅連接方式將會統一。
2. **MCP Server可以好簡單**：幾十行Code就可以將你嘅系統變成LLM可以Call嘅Tool。
3. **生態增長極快**：Anthropic推出唔夠半年GitHub Stars 40K+，係AI基建最快增長嘅項目之一。
4. **OpenClaw已經原生支援MCP**：你而家可以用OpenClaw連MCP Server做Tool Calling。
5. **同Function Calling嘅關係**：MCP係更高層次嘅抽象，Function Calling係單一Model嘅能力，MCP係跨Model/跨Framework嘅標準。

---

## 🎯 MCP教識你咩？

- 理解LLM Tool Calling嘅標準化設計
- 有能力開發自己嘅MCP Server，將任何API變成LLM Tool
- 知道點樣用MCP嚟擴展AI Agent嘅能力
- 理解AI Tool生態嘅發展方向

---

## 👤 適合咩人喺咩階段睇？

| 適合程度 | 建議 |
|---------|------|
| ✅ **任何用緊LLM嘅Developer** | MCP係而家最熱嘅AI基建 |
| ✅ **喺OpenClaw/Claude上整工具嘅人** | MCP係擴展你工具嘅最佳方式 |
| ✅ **用LangChain/n8n嘅人** | MCP可以作為Tool Source |
| ❌ **唔會寫Code嘅非技術人員** | MCP係Developer工具 |
| ❌ **只想用ChatGPT網頁版** | ChatGPT暫未支援MCP（2025） |

---

## 🔗 相關資源

- **MCP官方網站**：https://modelcontextprotocol.io/
- **MCP GitHub（規範 + Server SDK）**：https://github.com/modelcontextprotocol
- **MCP Quick Start**：https://modelcontextprotocol.io/quickstart
- **MCP Python SDK**：https://github.com/modelcontextprotocol/python-sdk
- **MCP TypeScript SDK**：https://github.com/modelcontextprotocol/typescript-sdk
- **Anthropic MCP公告**：https://www.anthropic.com/news/model-context-protocol
- **MCP Specification**：https://spec.modelcontextprotocol.io/
- **Awesome MCP Servers List**：https://github.com/punkpeye/awesome-mcp-servers
- **YouTube Tutorials**：https://www.youtube.com/results?search_query=mcp+model+context+protocol+tutorial

---

## 📝 學習路階

| 階段 | 學習內容 | Project Idea |
|------|---------|------------|
| **1小時** | 讀MCP官網Quick Start | 了解概念同架構 |
| **2-3小時** | 睇Claude Desktop點用MCP | 用Claude Desktop連File System |
| **半天** | 寫第一個MCP Server（Python） | 天氣API MCP Server |
| **1天** | 寫複雜MCP Server（Database） | PostgreSQL MCP Server |
| **進階** | MCP + LangChain/n8n | 用MCP作為AI Agent嘅Tool Source |

**同其他書嘅關係**：
- **配合使用**：AI-06 LangChain（MCP Integration）、AI-07 n8n（MCP作為Tool Source）、AI-09 LiteLLM（一齊構成AI Infrastructure）
- **前置**：有Python編程基礎就夠
