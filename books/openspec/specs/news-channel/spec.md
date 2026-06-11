# news-channel Specification

## Purpose
TBD - created by archiving change news-channel-burger-menu. Update Purpose after archive.
## Requirements
### Requirement: Burger menu MUST toggle between Book Sharing and News
#### Scenario: 左上角 ☰ button 顯示選單（Book Sharing / 新聞）
#### Scenario: 撳選項切換顯示內容，唔 reload page
#### Scenario: Active mode 高亮顯示

### Requirement: News MUST have its own layout
#### Scenario: 新聞頁面顯示 article cards（標題 + source + date）
#### Scenario: 撳 article → modal 顯示內容 + 主要得著
#### Scenario: Article modal 似 book modal（close, back button）

### Requirement: News MUST have category filters
#### Scenario: 四類：香港重大、世界重大、金融財經、時事
#### Scenario: Filter tabs 獨立於 book category tabs
#### Scenario: Default 顯示全部

### Requirement: News data MUST be served from API
#### Scenario: GET /api/news/list 回傳 articles list
#### Scenario: GET /api/news/article?id=X 回傳 article detail（content + takeaways）
#### Scenario: 讀取 news.json，唔硬塞 HTML

### Requirement: Burger menu MUST NOT interfere with login
#### Scenario: 未 login 時 burger menu 唔顯示
#### Scenario: z-index 係 login overlay 之下

