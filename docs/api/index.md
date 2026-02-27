# API Reference

This section covers the HTTP API for ThreadQL MCP tools.

## Base URL

The MCP HTTP endpoint is available at:

```
GET /mcp
POST /mcp
```

Default: `http://localhost:8091/mcp`

## Authentication

MCP tools use internal network authentication:

- **No API keys required** for internal network access
- **IP restrictions** apply (private networks only)
- **HTTPS required** in production

## Endpoints

### GET /mcp/tools/list

**Description**: List all available MCP tools.

**Response**:
```json
{
  "tools": [
    {
      "name": "run_sql_query",
      "description": "Execute a parameterized SQL SELECT query...",
      "inputSchema": {
        "type": "object",
        "properties": {
          "query_id": {"type": "integer"},
          "sql": {"type": "string"},
          "parametersJson": {"type": "string"}
        }
      }
    }
  ]
}
```

### POST /mcp

**Description**: Execute an MCP tool.

**Request Body**:
```json
{
  "name": "run_sql_query",
  "arguments": {
    "query_id": 123,
    "sql": "SELECT * FROM users",
    "parametersJson": "{}"
  }
}
```

**Response**:
```json
{
  "ok": true,
  "result": {
    "result_kind": "rows",
    "columns": ["id", "name", "email"],
    "rows": [[1, "John", "john@example.com"]],
    "row_count": 1,
    "took_ms": 123
  }
}
```

## HTTP Status Codes

| Status | Description |
|--------|-------------|
| 200 | Success |
| 400 | Bad request (invalid JSON, missing fields) |
| 401 | Unauthorized (external IP access) |
| 404 | Tool not found |
| 422 | Validation error |
| 500 | Internal server error |

## Request Examples

### Python

```python
import requests

url = "http://localhost:8091/mcp"
headers = {"Content-Type": "application/json"}

tool = {
    "name": "run_sql_query",
    "arguments": {
        "query_id": 123,
        "sql": "SELECT * FROM users WHERE created_at > :date",
        "parametersJson": '{\"date\": \"2024-01-01\"}'
    }
}

response = requests.post(url, json=tool, headers=headers)
result = response.json()
```

### Node.js

```javascript
const fetch = require('node-fetch');

const url = 'http://localhost:8091/mcp';
const tool = {
  name: 'run_sql_query',
  arguments: {
    query_id: 123,
    sql: 'SELECT * FROM users WHERE created_at > :date',
    parametersJson: '{\"date\": \"2024-01-01\"}'
  }
};

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(tool)
})
.then(res > res.json())
.then(data > console.log(data));
```

### cURL

```bash
# List tools
curl http://localhost:8091/mcp/tools/list

# Execute tool
curl -X POST http://localhost:8091/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "name": "run_sql_query",
    "arguments": {
      "query_id": 123,
      "sql": "SELECT * FROM users",
      "parametersJson": "{}"
    }
  }'
```

## Error Handling

### Common Errors

1. **Invalid Tool Name**: Tool not found
2. **Missing Arguments**: Required fields missing
3. **Validation Error**: Invalid input format
4. **Database Error**: SQL execution failed
5. **Rate Limited**: Slack rate limiting applied

### Error Response

```json
{
  "ok": false,
  "error": "Error message",
  "took_ms": 123
}
```

## Response Formats

### Success Response

```json
{
  "ok": true,
  "result": {
    "result_kind": "rows",
    "columns": ["id", "name", "email"],
    "rows": [[1, "John", "john@example.com"]],
    "row_count": 1,
    "took_ms": 123
  }
}
```

### Error Response

```json
{
  "ok": false,
  "error": "Database connection failed",
  "took_ms": 456
}
```

## Rate Limiting

MCP tools implement Slack rate limiting:

- **Per-channel rate limiting**: 1 message per ~1.1 seconds
- **Concurrent protection**: Prevents duplicate messages
- **Rate limit retries**: Automatic retries with delays

## Security

### IP Restrictions
- Only private networks allowed (10.x, 172.16-31.x, 192.168.x)
- Localhost always permitted
- External IPs blocked by default

### Input Validation
- SQL injection prevention
- Parameterized queries required
- Query validation
- Read-only access enforced

## Performance

### Response Times
- Query execution: Varies by database
- Serialization: ~10-50ms
- Network: Depends on client location

### Optimization
- Use proper database indexes
- Limit result set sizes
- Cache frequent queries
- Monitor queue performance

## Debugging

### Logging
- All tool calls logged
- Query execution times recorded
- Error details captured
- Rate limiting events logged

### Monitoring
- Queue length monitoring
- Response time tracking
- Error rate alerts
- Rate limiting metrics

## Version Compatibility

### MCP Protocol
- Supports MCP 1.0
- JSON-RPC 2.0 compatible
- HTTP transport only

### PHP Version
- Requires PHP 8.1+
- Laravel 10+ compatible
- Composer dependencies managed

## Migration

### From Previous Versions
- Tool signatures unchanged
- Response formats compatible
- Configuration migration guide available

---

For more information, see the [MCP Tools](/threadql/mcp-tools) or [Examples](/threadql/examples).
