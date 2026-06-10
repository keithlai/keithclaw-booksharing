# AI-06：LangChain 入門與實戰

> **官方文檔 & 社群資源** — 最流行嘅LLM應用開發框架

| 項目 | 內容 |
|------|------|
| **難度** | 🟢 入門 |
| **作者** | LangChain（Harrison Chase創立） |
| **語言** | Python、JavaScript/TypeScript |
| **GitHub Stars** | 100K+（極活躍） |
| **預估學習時間** | 1-2週（基礎概念熟練），1-2個月（精通） |
| **適合對象** | 任何想用LLM整應用嘅開發者。唔需要ML背景 |

---

## 📚 呢個Framework係咩來頭？

LangChain係而家最主流嘅LLM應用開發框架，由Harrison Chase喺2022年創立。佢嘅目標係**降低開發LLM應用嘅門檻**，提供抽象層令開發者可以用幾行Code就實現複雜嘅LLM工作流。

唔係一本實體書，而係由官方文檔、Tutorial同社群Best Practices組成嘅「活教材」。因為LLM領域變化極快，呢類Framework嘅學習材料永遠係Online First。

---

## 🧠 核心概念（詳細解說）

### 1. Models（模型封裝）

LangChain提供咗統一接口去Call唔同嘅LLM：
- **Chat Models**：GPT-4、Claude、Gemini、DeepSeek等
- **LLMs**：Text Completion Models
- **Embedding Models**：Text → Vector嘅模型（用於RAG）

用法極簡單：
```python
from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model="gpt-4")
response = llm.invoke("Hello!")
```

呢個抽象層令你切換模型只用改一行Code，框架handle API Format差異。

### 2. Prompts（提示工程框架）

唔係簡單嘅String Template，而係：
- **PromptTemplate**：用變數填入Prompt（如 `{question}`）
- **ChatPromptTemplate**：管理System/User/Assistant三種角色嘅多輪對話
- **FewShotPromptTemplate**：Few-shot Examples自動嵌入Prompt
- **Message History**：管理對話歷史

```python
prompt = ChatPromptTemplate.from_messages([
    ("system", "你係一個{language}專家"),
    ("human", "請解釋{concept}")
])
```

呢個系統令Prompt管理更结构化、可測試。

### 3. Chains（串連操作）

Chain係LangChain嘅核心概念——**將多個操作串連成Pipeline**：
- **LLMChain**：最基本嘅LLM Call
- **Sequential Chain**：A結果 → B輸入
- **Router Chain**：根據輸入內容決定用邊條Chain
- **LCEL（LangChain Expression Language）**：用| Operator串連操作

```python
chain = prompt | llm | output_parser
result = chain.invoke({"language": "粵語", "concept": "Transformer"})
```

LCEL嘅設計令Chain嘅定義極簡潔，類似Unix Pipe嘅概念。

### 4. RAG（檢索增強生成）

**呢個係LangChain最殺手嘅功能之一**：
- **Document Loaders**：支援PDF/HTML/Database/YouTube Transcript等80+格式
- **Text Splitters**（Chunking）：RecursiveCharacterTextSplitter、MarkdownHeaderTextSplitter
- **Vector Stores**：Chroma、Pinecone、Weaviate、FAISS
- **Retrievers**：Similarity Search、MMR Search、Contextual Compression

```python
# 5行Code做RAG
loader = WebBaseLoader("https://...")
docs = loader.load()
vectorstore = Chroma.from_documents(docs, embeddings)
retriever = vectorstore.as_retriever()
chain = RetrievalQA.from_chain_type(llm, retriever=retriever)
```

### 5. Agents（智能代理）

Agent係LangChain嘅**進階功能**——LLM自主決定Tool使用：
- **ReAct Agent**（Reasoning + Acting）：LLM思考→決定用Tool→觀察結果→再思考
- **Tool Calling**：定義Function俾LLM Call，LLM Output Function Name + Args
- **Pre-built Tools**：計算器、Search API、Python REPL、SQL Database
- **Custom Tools**：@tool Decorator，將任何Function變成LLM Tool

```python
@tool
def get_weather(location: str):
    """獲取天氣資訊"""
    return weather_api(location)

agent = create_react_agent(llm, [get_weather], prompt)
```

### 6. MCP Integration

LangChain已經支援MCP Protocol：
- **MCP Server**作為Tool Source
- 透過MCP連接File System、Database、API
- 同LangChain Tool Calling無縫整合

### 7. LangGraph（進階流程控制）

LangChain推出嘅圖形化工作流引擎：
- 支援循環、條件分支、並行執行
- 適合構建複雜嘅Multi-Agent系統
- Stateful Execution（可以保存中間狀態）

---

## 💡 關鍵 Takeaways

1. **Chain概念係核心**：理解點樣串接Operations，係LangChain嘅基本功。
2. **LCEL係未來**：New Code應該用LCEL，唔好用舊嘅Chain Class（Deprecated緊）。
3. **RAG > Fine-tuning**：對多數Use Case，RAG比Fine-tuning更實際、更易維護。
4. **Agent係進化方向**：而家嘅趨勢係Agent（LangGraph）多過單純嘅Chain。
5. **MCP Protocol係Tool生態標準**：配合MCP Server可以極大擴展Agent能力。

---

## 🎯 呢本書教識你咩？

- 用Python快速構建LLM應用（Chatbot、RAG Bot、Agent）
- 理解Chain、RAG、Agent三個層次嘅LLM應用開發
- 有能力Deploy一個Production-ready嘅AI應用
- 掌握Prompt Engineering喺Framework層面嘅實踐

---

## 👤 適合咩人喺咩階段睇？

| 適合程度 | 建議 |
|---------|------|
| ✅ **任何有Python基礎嘅開發者** | 最快上手嘅AI開發框架 |
| ✅ **想由API Call升級做完整應用嘅人** | LangChain幫你handle好多細節 |
| ✅ **Making MVP／Prototype** | LangChain係最快嘅途徑 |
| ❌ **完全唔識Python** | 先學Python基礎 |
| ❌ **Production Scale嘅大型應用** | LangChain抽象層有時係阻礙，Direct API可能更好 |

---

## 🔗 相關資源

- **官方文檔（最佳學習起點）**：https://python.langchain.com/docs/tutorials/
- **LangChain YouTube Channel**：https://www.youtube.com/@LangChain
- **Full Stack LangChain Course（免費）**：https://www.deeplearning.ai/short-courses/
- **LangGraph Docs**：https://langchain-ai.github.io/langgraph/
- **LangSmith（LLM Observability）**：https://smith.langchain.com/
- **LangChain GitHub**：https://github.com/langchain-ai/langchain
- **RAG From Scratch（YouTube Series）**：https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23IXQ4SU
- **NetworkChuck LangChain Tutorial**：https://www.youtube.com/results?search_query=networkchuck+langchain
- **Fireship LangChain in 100 Seconds**：https://www.youtube.com/watch?v=aywZrzNaKjs

---

## 📝 學習路徑

| 階段 | 學習內容 | Project Idea |
|------|---------|------------|
| **Day 1-3** | Models + Prompts + Chains | 做一個LangChain版嘅ChatGPT |
| **Day 4-7** | RAG：Loaders + Splitters + VectorStore | 做一個PDF問答Bot |
| **Week 2** | Agents + Tools | 做一個可以Search Web嘅Agent |
| **Week 3-4** | LangGraph + MCP | 做一個Multi-Agent工作流 |
| **Ongoing** | Follow LangChain Release Notes（更新超快） | |

**同其他書嘅關係**：
- **同步使用**：AI-09 LiteLLM（做Model Router）、AI-10 MCP（做Tool Source）
- **前置**：AI-08 RAG（LangChain嘅RAG實作需要理解RAG概念）
- **互補**：AI-07 n8n（唔同層面嘅工作流—n8n係No Code，LangChain係Code）
