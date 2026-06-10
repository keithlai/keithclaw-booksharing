@rem Claude Code + DeepSeek 快速啟動腳本
@rem 每次開新 terminal 都要 run 一次，或者加到 profile

set ANTHROPIC_BASE_URL=https://api.deepseek.com/anthropic
set ANTHROPIC_AUTH_TOKEN=ds-你的DeepSeek_API_Key
set ANTHROPIC_MODEL=deepseek-v4-flash
set ANTHROPIC_DEFAULT_OPUS_MODEL=deepseek-v4-flash
set ANTHROPIC_DEFAULT_SONNET_MODEL=deepseek-v4-flash
set ANTHROPIC_DEFAULT_HAIKU_MODEL=deepseek-v4-flash
set CLAUDE_CODE_SUBAGENT_MODEL=deepseek-v4-flash
set CLAUDE_CODE_EFFORT_LEVEL=max

cd /d C:\Users\Administrator\workspace-dev\books
echo Claude Code + DeepSeek v4-flash Ready!
claude
