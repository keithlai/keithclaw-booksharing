## ADDED Requirements

### Requirement: API MUST execute system commands
#### Scenario: POST /api/command/exec with body {cmd: "openclaw status"} returns stdout + stderr
#### Scenario: GET /api/command/history returns last 20 executed commands
#### Scenario: API MUST handle long-running commands with timeout (10s default)

### Requirement: UI MUST have Command tab
#### Scenario: Command tab has predefined buttons: openclaw status, gateway restart, doctor, podman ps
#### Scenario: Custom command input field for arbitrary commands
#### Scenario: Output displayed in terminal-like monospace view with stderr in red
#### Scenario: Loading spinner while command is running
