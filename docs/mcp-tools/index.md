# MCP Tools Documentation

This section covers the Model Context Protocol (MCP) tools available in ThreadQL.

## Overview

ThreadQL provides 5 MCP tools that allow AI models to interact with databases through natural language queries. These tools are designed to be secure, efficient, and easy to use.

## Available Tools

### 1. run_sql_query

**Description**: Execute a parameterized SQL SELECT query against a tenant database with read-only safeguards.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "query_id": {
      "type": "integer",
      "description": "The query ID to execute against"
    },
    "sql": {
      "type": "string",
      "description": "The SQL SELECT statement to execute"
    },
    "parametersJson": {
      "type": "string",
      "description": "JSON-encoded parameters for the query"
    }
  },
  "required": ["query_id", "sql", "parametersJson"]
}
```

**Response Types**:
- **Aggregate Results**: Single cell/value results
- **Row Results**: Tabular data with columns and rows
- **Pending Table**: Results will be posted in Slack thread
- **No Results**: Empty result set
- **Error**: Error information

### 2. ExportCsvTool

**Description**: Export query results to CSV format.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "query_id": {
      "type": "integer",
      "description": "The query ID to export"
    },
    "sql": {
      "type": "string",
      "description": "The SQL SELECT statement to export"
    },
    "filename": {
      "type": "string",
      "description": "Optional filename for the CSV"
    }
  },
  "required": ["query_id", "sql"]
}
```

**Response**: CSV file URL or error message

### 3. FetchTableDdlsTool

**Description**: Fetch table DDL schemas for database inspection.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "query_id": {
      "type": "integer",
      "description": "The query ID for context"
    },
    "table_names": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of table names to fetch DDL for"
    }
  },
  "required": ["query_id", "table_names"]
}
```

**Response**: Array of table DDL definitions

### 4. RunQueryForCsvExportTool

**Description**: Execute query and export results to CSV in one operation.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "query_id": {
      "type": "integer",
      "description": "The query ID to execute"
    },
    "sql": {
      "type": "string",
      "description": "The SQL SELECT statement to execute"
    },
    "filename": {
      "type": "string",
      "description": "Optional filename for the CSV"
    }
  },
  "required": ["query_id", "sql"]
}
```

**Response**: CSV file URL or error message

### 5. RequestDefinitionTool

**Description**: Request definition and metadata for queries.

**Input Schema**:
```json
{
  "type": "object",
  "properties": {
    "query_id": {
      "type": "integer",
      "description": "The query ID to get definition for"
    }
  },
  "required": ["query_id"]
}
```

**Response**: Query definition and metadata

## Tool Usage Examples

### Basic SQL Query

```json
{
  "query_id": 123,
  "sql": "SELECT name, email FROM users WHERE created_at > :date",
  "parametersJson": "{\"date\": \"2024-01-01\"}"
}
```

### CSV Export

```json
{
  "query_id": 123,
  "sql": "SELECT * FROM sales WHERE amount > 1000",
  "filename": "high_value_sales.csv"
}
```

### Table Schema

```json
{
  "query_id": 123,
  "table_names": ["users", "orders", "products"]
}
```

## Security Considerations

### Internal Network Restriction
- MCP endpoint only accessible from internal networks
- Private IP ranges (10.x, 172.16-31.x, 192.168.x) allowed
- Localhost always permitted

### Query Validation
- Only SELECT statements allowed
- Parameterized queries required
- SQL injection prevention
- Read-only access enforced

### Rate Limiting
- Slack rate limiting per channel
- Concurrent message protection
- Rate limit retries with exponential backoff

## Error Handling

### Common Errors

1. **Invalid Query ID**: Query not found
2. **Invalid SQL**: Syntax errors or non-SELECT statements
3. **Database Error**: Connection or execution errors
4. **Parameter Error**: Invalid JSON or parameter types
5. **Rate Limited**: Slack rate limiting applied

### Error Response Format

```json
{
  "ok": false,
  "error": "Error message",
  "took_ms": 123
}
```

## Response Formats

### Aggregate Results
```json
{
  "ok": true,
  "result_kind": "aggregate",
  "label": "total_sales",
  "value": 12345.67,
  "row_count": 1,
  "took_ms": 456
}
```

### Row Results
```json
{
  "ok": true,
  "result_kind": "rows",
  "columns": ["id", "name", "email"],
  "rows": [
    [1, "John Doe", "john@example.com"],
    [2, "Jane Smith", "jane@example.com"]
  ],
  "row_count": 2,
  "took_ms": 789
}
```

### Pending Table
```json
{
  "ok": true,
  "result_kind": "pending_table",
  "message": "Resultset will be posted in the Slack thread.",
  "took_ms": 123
}
```

## Integration Examples

### Python Integration

```python
import requests

url = "http://localhost/mcp"
headers = {"Content-Type": "application/json"}

payload = {
    "query_id": 123,
    "sql": "SELECT * FROM users LIMIT 10",
    "parametersJson": "{}"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

### Node.js Integration

```javascript
const fetch = require('node-fetch');

const url = 'http://localhost/mcp';
const payload = {
  query_id: 123,
  sql: 'SELECT * FROM users LIMIT 10',
  parametersJson: '{}'
};

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(data));
```

## Testing Tools

### Local Testing

```bash
# Test MCP discovery
curl http://localhost/mcp/tools/list

# Test specific tool
curl -X POST http://localhost/mcp \
  -H "Content-Type: application/json" \
  -d '{"query_id":123,"sql":"SELECT 1","parametersJson":"{}"}'
```

### Integration Testing

```bash
# Test with real database
php artisan tinker

# Test tool discovery
$mcp = new McpClient('http://localhost/mcp');
$tools = $mcp->listTools();
```

## Performance Considerations

### Query Optimization
- Use proper indexes
- Limit result sets with pagination
- Avoid complex joins when possible
- Use parameterized queries

### Rate Limiting
- Respect Slack API limits
- Implement exponential backoff
- Monitor queue performance
- Consider caching frequent queries

## Best Practices

### Query Design
- Use SELECT instead of SELECT *
- Apply proper WHERE clauses
- Use LIMIT for large result sets
- Include appropriate indexes

### Error Handling
- Always validate inputs
- Handle database errors gracefully
- Log errors appropriately
- Provide meaningful error messages

### Security
- Never expose raw SQL
- Validate all inputs
- Use parameterized queries
- Monitor for suspicious activity

---

For more information, see the [API Reference](/threadql/api) or [Examples](/threadql/examples).
