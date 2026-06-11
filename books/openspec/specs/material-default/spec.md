# material-default Specification

## Purpose
TBD - created by archiving change replace-classic-with-material. Update Purpose after archive.
## Requirements
### Requirement: Material Design UI MUST be served at root path
#### Scenario: User visits / and receives Material Design HTML
#### Scenario: /ui/ 不再存在，返回 404

### Requirement: Classic version MUST be deleted
#### Scenario: book-browser.html 已從 repo 刪除
#### Scenario: server.js 不再參考 Classic HTML

### Requirement: All existing features MUST work
#### Scenario: Book grid renders correctly
#### Scenario: Category filter works
#### Scenario: Modal view opens on click
#### Scenario: Lazy load detail via API

