# AI-08：RAG 檢索增強生成實戰

> **Retrieval-Augmented Generation — 解決LLM知識截止同幻覺問題嘅主流方法**

| 項目 | 內容 |
|------|------|
| **難度** | 🟡 中階 |
| **來源** | 社群資源（OpenAI Cookbook + LangChain Docs + Pinecone Learn） |
| **預估學習時間** | 1-2週（理解概念），2-4週（實戰精通） |
| **前置技能** | Python基礎、基本LLM概念（知道咩係Prompt同Completion） |
| **適合對象** | 想將LLM應用落地嘅Developer、想構建企業級AI知識庫嘅人 |

---

## 📚 RAG係咩？

RAG（Retrieval-Augmented Generation）係目前LLM應用落地最主流嘅架構。佢嘅核心概念好簡單：

**唔好直接問LLM。先去Database（Knowledge Base）Search相關嘅資訊，再將Search結果連同問題一齊俾LLM，叫LLM根據搜到嘅資料回答。**

點解要咁做？
- **LLM知識有截止日期**（例如GPT-4知識截止2023年）
- **LLM會幻覺**（一本正經講大話）
- **LLM唔知道你公司嘅內部資料**
- **LLM處理長文件有Token限制**

RAG解決咗呢啲問題：**LLM唔需要記住資料，佢只需要睇你俾佢嘅資料然後理解。**

---

## 🧠 核心概念（詳細解說）

### 1. RAG完整流程 Pipeline

```
Document → Load → Split(Chunk) → Embedding → Vector Store → 
                                                              ↓
User Query → Embedding → Vector Search → Retrieved Chunks → 
                                                              ↓
                                                        LLM Generate Response
```

成個Pipeline可以拆成三個階段：
1. **Indexing（索引）**：將文檔變成Vector存起
2. **Retrieval（檢索）**：根據Query Search相關Chunks
3. **Generation（生成）**：LLM根據Chunks + Query生成回答

### 2. Chunking（文本分割）—— RAG嘅成敗關鍵

**好多RAG Project失敗就係死喺Chunking**。

Chunking係將長文檔切分成可以Search嘅細塊（chunks）。唔同策略：
- **Fixed Size Chunking**：簡單但Cut斷語義（上句中間Cut開）
- **Recursive Character Text Splitting**：以段落/句子為分隔，盡量保持語義完整
- **Semantic Chunking**：用Embedding判斷邊度係語義邊界
- **Agentic Chunking**：用LLM決定點樣切分

**Chunk Size**：常見係256-1024 tokens。太大→Search精度低；太細→缺乏上下文。
**Chunk Overlap**：Chunk之間留20-50 tokens重疊，避免Cut斷關鍵資訊。

### 3. Embedding（文本向量化）

Embedding係將Text變成一個Vector（數字列表）嘅過程：
- **Sentence Transformers**（all-MiniLM-L6-v2）：開源輕量級
- **OpenAI Embeddings**（text-embedding-3-small/large）：高質量但要錢
- **Cohere Embeddings**：企業級
- **BGE系列**（BAAI）：中文表現極好

Embedding嘅關鍵：
- **Semantic Similarity**：語義相近嘅Text，Vector距離近
- **Dimension**：越細越快但越唔準，越準但越慢（常見384-1536維）
- **Normalization**：用Cosine Similarity時要Normalize

### 4. Vector Store（向量數據庫）

儲存Vector同做Similarity Search嘅Database：
- **Chroma**：開源、輕量、本地檔案存儲，適合開發
- **FAISS**：Facebook開源，純記憶體，最快
- **Pinecone**：Managed Service，適合Production
- **Qdrant**：開源+Cloud，Rust寫，性能好（n8n預設支援）
- **Weaviate**：開源+Cloud，支援混合Search（Vector + Keyword + Filter）

**Search算法**：
- **Cosine Similarity**：最常用
- **Euclidean Distance**：L2距離
- **Dot Product**：同Cosine但更快
- **HNSW**（Hierarchical Navigable Small World）：高效ANN（Approximate Nearest Neighbor）

### 5. Retrieval策略（點Search最好？）

**Basic**：Query Embedding → Search Top-K Chunks

**Advanced**：
- **Hybrid Search**：Vector Search + Keyword Search（BM25）一齊做，Merge結果。處理「精準匹配」同「語義匹配」兩邊嘅需求
- **Multi-Query**：將User Query用LLM擴充成多個相關Query，分別Search再合併結果
- **Parent Document Retriever**：先搵細Chunk，再返回Parent Document嘅更多內容畀LLM
- **Contextual Compression**：壓縮Search結果，剩係留最相關嘅部分

### 6. Advanced RAG Techniques

**RAG Fusion**：Search多個來源，用Reciprocal Rank Fusion（RRF）合併排序

**Self-RAG**：用LLM判斷：
- 是否需要Search？（可以唔search就答嘅就唔search）
- Search結果夠唔夠答？
- Search結果有冇矛盾？

**Agentic RAG**：
- 用Agent決定搜邊個Data Source
- 決定需要唔需要多次Search
- 決定要唔要Write to Database（記憶功能）

**Graph RAG**：用Knowledge Graph（如Neo4j）做RAG。適合多關聯嘅資料（公司關係、知識圖譜）

**Multimodal RAG**：同時Search Text + Image，LLM可以睇到圖片

### 7. Evaluation（評估RAG系統）

**點知你個RAG系統好唔好**？
- **Retrieval Quality**：Hit Rate、MRR（Mean Reciprocal Rank）、NDCG
- **Generation Quality**：Faithfulness（Has LLM遵循Search結果？）、Answer Relevance
- **RAGAS Framework**：專為RAG評估而設嘅Open Source Tool

---

## 💡 關鍵 Takeaways

1. **Chunking決定下限，Embedding決定上限**：Chunking做得好，RAG至少合格。
2. **Hybrid Search好過純Vector Search**：Keyword Search對精準匹配（人名、ID、日期）無可取代。
3. **唔好高估RAG**：RAG解決咗「Static Knowledge」問題，但解決唔到「Reasoning」問題。
4. **Agentic RAG係下一步**：Static RAG（每次都Search同樣方式）已經Outdated。
5. **Production RAG要考慮**：Latency（Vector Search要快）、Cost（Embedding API Call）、Updates（點Update Document？）。

---

## 🎯 RAG教識你咩？

- 構建一個真正有用嘅LLM知識庫系統
- 理解從Document到Search到Generation嘅完整數據流
- 掌握Chunking/Embedding/Vector Search三大核心技術
- 有能力評估同優化RAG系統嘅性能

---

## 👤 適合咩人喺咩階段睇？

| 適合程度 | 建議 |
|---------|------|
| ✅ **做緊LLM應用嘅Developer** | RAG係你嘅日常工具箱 |
| ✅ **想整企業內部AI搜索嘅人** | RAG係最佳方案 |
| ✅ **讀過LangChain嘅人** | LangChain最強就係做RAG |
| ❌ **完全未接觸過LLM** | 先玩下ChatGPT再學RAG |
| ❌ **AI Research人員** | RAG對你嚟講太應用，睇論文更好 |

---

## 🔗 相關資源

- **Pinecone RAG Guide（最佳入門）**：https://www.pinecone.io/learn/rag/
- **OpenAI Cookbook RAG Examples**：https://cookbook.openai.com/examples/rag
- **LangChain RAG Documentation**：https://python.langchain.com/docs/tutorials/rag/
- **Advanced RAG（YouTube Playlist）**：https://www.youtube.com/playlist?list=PLfaIDFEXuae2LXbO1_PKyVJiQ23IXQ4SU
- **RAGAS（Evaluation Framework）**：https://docs.ragas.io/
- **Graph RAG（Microsoft）**：https://www.microsoft.com/en-us/research/project/graphrag/
- **LlamaIndex（另一個RAG Framework）**：https://docs.llamaindex.ai/
- **James Briggs YouTube（RAG專家）**：https://www.youtube.com/@jamesbriggs

---

## 📝 學習路徑

| 階段 | 學習內容 | Project Idea |
|------|---------|------------|
| **Week 1** | Basic RAG：Load → Chunk → Embed → Search → Generate | Doc Q&A Bot |
| **Week 2** | Advanced Retrieval：Hybrid Search、Multi-Query | 公司內部Wiki Search |
| **Week 3** | Agentic RAG + Tools | 可以Search Multiple Source嘅Agent |
| **Week 4** | Evaluation + Production Optimization | 完整Production RAG System |

**同其他書嘅關係**：
- **實作工具**：AI-06 LangChain（RAG實作嘅主要Framework）
- **配合**：AI-09 LiteLLM（RAG多Model Fallback）、AI-10 MCP（RAG嘅Data Source連接）
- **前置理解**：AI-05 Build LLM From Scratch（明白LLM內部運作，更好Design RAG Pipeline）
