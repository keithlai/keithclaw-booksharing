# AI-04：Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow

> **作者**：Aurélien Géron  
> **GitHub Star數**：業界最Top嘅ML實戰書

| 項目 | 內容 |
|------|------|
| **難度** | 🟡 中階 |
| **作者** | Aurélien Géron（前Google工程師，YouTube影片分類團隊） |
| **版次** | 第3版（2022年） |
| **預估閱讀時間** | 4-8週（跟住Code做） |
| **前置技能** | Python基礎（Pandas/NumPy）、基本線性代數概念 |
| **適合對象** | 想由零學Machine Learning Coding嘅developer、Data Scientist起手 |

---

## 📚 本書係咩來頭？

呢本書係Machine Learning實戰界嘅第一暢銷書，Amazon 4.7星嘅神級評分。同花書（理論派）唔同，呢本係**實戰派**——你打開就寫Code，唔會同你拋一大段數學公式。

本書GitHub repository係同類型書中Stars最多嘅。作者Aurélien Géron之前喺Google做YouTube影片分類，有豐富嘅Industry實戰經驗。

本書分兩大部分：
1. **Part I：Scikit-Learn（傳統ML）** — 適合初學者建立ML基礎
2. **Part II：Keras/TensorFlow（深度學習）** — 現代DL實作

---

## 🧠 核心概念（詳細解說）

### Part I：傳統機器學習（Scikit-Learn）

#### 1. 端到端ML專案完整流程

本書第一個實戰係一個完整嘅ML專案（加州房價預測），教你成個流程：
1. **問題定義**：Business understanding → ML Problem Framing
2. **數據收集**：API、CSV、Database
3. **EDA**（探索式數據分析）：可視化、統計摘要
4. **數據清洗**：處理Missing Values、Outliers、Duplicates
5. **Feature Engineering**：One-Hot Encoding、Scaling（StandardScaler/MinMaxScaler）、Feature Creation
6. **Model Selection**：試幾個Model比較Baseline
7. **Training & Evaluation**：Cross-Validation、Metrics
8. **Hyperparameter Tuning**：Grid Search、Random Search
9. **Deployment**：Model Export到Production

呢個流程係Data Scientist嘅基本技能，本書教得極好。

#### 2. 分類問題（手寫數字識別）

用MNIST數據集：
- **Binary Classifier**：SGD Classifier、Precision/Recall Tradeoff
- **Multi-Class Classifier**：One-vs-All、One-vs-One
- **Confusion Matrix**：真正解讀
- **ROC Curve & AUC**：Model性能比較
- **Error Analysis**：邊啲手寫數字最易撈亂？

呢部份**極其實用**，因為分類係ML最常見嘅任務。

#### 3. 訓練模型（理論+實戰）

呢章混合理論同Code：
- **Linear Regression**：Normal Equation vs Gradient Descent
- **Polynomial Regression**：Overfitting嘅Live Demo
- **Regularization**：Ridge、Lasso、Elastic Net — 用Scikit-Learn Code示範
- **Logistic Regression**：分類嘅線性模型

作者用Code同圖表解釋數學概念，唔使睇公式都明。

#### 4. SVM（Support Vector Machines）

- **Linear SVM**：Max Margin Classifier
- **Kernel Trick**：RBF Kernel令非線性可分
- **SVM Regression**（SVR）
- **邊個時候用SVM**？而家SVM唔算最流行，但理解對比Deep Learning有好處

#### 5. Decision Trees & Ensemble Methods

呢章係傳統ML嘅皇牌：
- **Decision Trees**：Gini Impurity、Information Gain、Max Depth
- **Random Forest**：Bagging + Feature Randomness
- **Gradient Boosting**：XGBoost、LightGBM、CatBoost
- **Stacking**：多個Model疊加

Ensemble Methods（集成學習） 係Kaggle比賽嘅常勝軍，本書解釋得好清楚。

#### 6. 降維（Dimensionality Reduction）

- **PCA**（主成分分析）：最常用嘅降維方法
- **t-SNE**：可視化高維數據（NLP Embeddings經常用）
- **LDA**：有監督降維

#### 7. 無監督學習

- **K-Means**：Clustering嘅基本功
- **DBSCAN**：處理唔規則形狀嘅Cluster
- **Gaussian Mixture Models**：軟聚類（每個點屬於多個cluster嘅概率）

---

### Part II：深度學習（Keras/TensorFlow）

#### 8. 神經網絡基礎（Keras）

- **Sequential API** vs **Functional API**
- **Callbacks**：Early Stopping、Model Checkpoint、ReduceLROnPlateau
- **Custom Layers**、**Custom Loss Functions**
- **TensorBoard**：訓練過程可視化

Keras嘅API設計係而家最友好嘅DL框架，本書從零教起。

#### 9. CNN（卷積神經網絡）

- **Conv2D**、**MaxPooling2D**、**Dropout**
- **Pretrained Models（Transfer Learning）**：用ImageNet預訓練嘅ResNet/VGG做Fine-tuning
- **Data Augmentation**：旋轉、翻轉、裁切生成更多訓練數據
- **Classification + Localization**：物件檢測基礎

呢部份係Computer Vision入門嘅最佳教材。

#### 10. RNN（循環神經網絡）

- **SimpleRNN**、**LSTM**、**GRU**
- **Time Series Forecasting**（股價預測經典練習）
- **Text Generation**（Char-RNN）
- **Encoder-Decoder** for Translation
- **Attention Mechanism**：Bahdanau vs Luong Attention

呢部份係進入Transformer之前嘅必要背景。

#### 11. 強化學習（Reinforcement Learning）

- **Policy Gradient** vs **Q-Learning**
- **Deep Q-Network（DQN）**
- **OpenAI Gym**：用CartPole同Atari Game做練習

呢章比較簡潔，但足夠建立RL嘅直覺。

#### 12. 訓練技巧同生產部署

- **Distributed Training**：多GPU、TPU
- **Model Optimization**：Quantization、Pruning
- **TF Serving**、**TFLite**：Model上Production
- **AutoML**：自動化Hyperparameter Search

---

## 💡 關鍵 Takeaways

1. **由Scikit-Learn開始，再學Deep Learning**：本書嘅結構就係最佳學習路徑。
2. **Model Evaluation > Model Training**：唔好剩係Train Model，要識得Evaluate同分析錯誤。
3. **Feature Engineering Domain Knowledge**：好嘅Features比好嘅Model更緊要。
4. **Ensemble Methods**往往係最佳「開箱即用」方案，尤其係Tabular Data。
5. **Transfer Learning**：唔好由零Train，用Pre-trained Model做微調。

---

## 🎯 呢本書教識你咩？

- 完整嘅ML專案開發流程，由數據到Deployment
- 識用Scikit-Learn/Pandas/Keras/TensorFlow做實際預測
- 理解ML Pipeline（預處理 → 訓練 → 評估 → 調參 → 部署）
- 有能力參加Kaggle比賽或者做Data Science相關工作

---

## 👤 適合咩人喺咩階段睇？

| 適合程度 | 建議 |
|---------|------|
| ✅ **有Python基礎，想轉做Data Science** | 最佳起手書 |
| ✅ **做緊Software想轉ML** | 跟住Part I做一次就明 |
| ✅ **想Systematic學ML嘅大學生** | 配合Coursera Andrew NG課程效果更佳 |
| ❌ **完全冇Programming經驗** | 先學Python Basics（30天入門） |
| ❌ **Phd研究員想理解數學推導** | 去睇花書，呢本對你嚟講太淺 |

---

## 🔗 相關資源

- **GitHub Code**: https://github.com/ageron/handson-ml3
- **Jupyter Notebook（免費閱讀）**: 上面GitHub可以直接睇
- **Scikit-Learn Docs**: https://scikit-learn.org/stable/
- **Keras Docs**: https://keras.io/
- **Kaggle ML Course**: https://www.kaggle.com/learn
- **Coursera Andrew Ng ML Specialization**: https://www.coursera.org/specializations/machine-learning-introduction
- **Goodreads**: https://www.goodreads.com/book/show/40363665-hands-on-machine-learning-with-scikit-learn-keras-and-tensorflow
- **Amazon**: https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1098125975

---

## 📝 閱讀建議

| 階段 | 建議作法 | 配套Project |
|------|---------|------------|
| **Week 1-2** | Ch1-4：端到端專案+分類+Regression | 用Kaggle Titanic Dataset練 |
| **Week 3-4** | Ch5-7：SVM+Decision Tree+Ensemble | 用Kaggle House Prices練 |
| **Week 5** | Ch8-9：降維+K-Means | 用客戶分群Dataset |
| **Week 6-8** | Ch10-16：Keras/TensorFlow章節 | 用CIFAR-10/CIFAR-100練 |
| **Bonus** | Ch17-19：RL + Training技巧 | OpenAI Gym練CartPole |

**同其他書嘅關係**：
- **前置**：要識Python（Pandas/NumPy）
- **同步**：理論部分睇花書Ch6-8（訓練技巧）+ Part I（數學）
- **進階**：做完本書DL部分，就可以開始Build LLM From Scratch
