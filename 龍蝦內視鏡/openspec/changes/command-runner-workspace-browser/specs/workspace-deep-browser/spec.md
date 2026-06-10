## ADDED Requirements

### Requirement: API MUST serve workspace file content
#### Scenario: GET /api/workspace/read?path=SOUL.md returns file content as text
#### Scenario: GET /api/workspace/list?dir=memory returns directory listing
#### Scenario: API MUST handle files outside workspace with 403 error

### Requirement: UI MUST have Workspace Deep Browser
#### Scenario: Workspace tab shows file tree of agent workspace (SOUL, TOOLS, AGENTS, etc)
#### Scenario: Clicking a file shows its content in a preview pane
#### Scenario: Markdown files render as formatted HTML (not raw text)
#### Scenario: memory/ directory shows dated entries with preview
