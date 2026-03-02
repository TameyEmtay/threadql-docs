# Installation Guide

This guide covers the installation and setup of ThreadQL.

## Prerequisites

- PHP 8.1+ with required extensions
- Composer
- Node.js and npm
- Redis server
- MySQL or MariaDB
- Slack workspace (for Slack integration)

## Installation Steps

### 1. Clone the Repository

```bash
git clone git@github.com:TheIrritainer/conundrum.git
cd conundrum
```

### 2. Install Dependencies

```bash
composer install
npm install
```

### 3. Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
APP_NAME=Laravel
APP_ENV=local
APP_KEY=your_app_key
APP_DEBUG=true
APP_URL=https://your-domain.com

# Database
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=conundrum
DB_USERNAME=root
DB_PASSWORD=root

# Redis
CACHE_STORE=redis
REDIS_HOST=conundrum-redis
REDIS_PORT=6379

# Slack Configuration
SLACK_APP_ID=your_slack_app_id
SLACK_CLIENT_ID=your_client_id
SLACK_BOT_TOKEN=your_bot_token
SLACK_SIGNING_SECRET=your_signing_secret

# MCP Configuration
MCP_APP_URL=https://your-domain.com/mcp
MCP_SESSION_DRIVER=database
MCP_HTTP_DEDICATED_STATELESS=true
```

### 4. Generate Application Key

```bash
php artisan key:generate
```

### 5. Database Migration

```bash
php artisan migrate
```

### 6. Cache Configuration

```bash
php artisan config:cache
php artisan route:cache
```

### 7. Queue Configuration

```bash
php artisan queue:restart
```

### 8. Build Assets

```bash
npm run build
```

### 9. Start Services

```bash
docker-compose up -d
```

## Docker Setup

ThreadQL includes Docker configuration for easy deployment:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Service Configuration

### Redis
```yaml
services:
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
```

### MySQL
```yaml
services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: conundrum
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
```

### MCP Service
```yaml
services:
  mcp:
    build: .
    ports:
      - "8091:8091"
    environment:
      - MCP_APP_URL=http://nginx/mcp
```

## Configuration Options

### Slack Integration
- **App ID**: Your Slack app ID
- **Client ID**: OAuth client ID
- **Bot Token**: Bot user token
- **Signing Secret**: App signing secret

### Database
- **Connection**: MySQL/MariaDB
- **Host**: Database host
- **Port**: Database port (default 3306)
- **Database**: Database name
- **Username/Password**: Database credentials

### Redis
- **Host**: Redis server address
- **Port**: Redis port (default 6379)
- **Password**: Redis password (if configured)

## Verification

After installation, verify your setup:

```bash
# Check if application is running
curl -I http://localhost

# Test MCP endpoint
curl -I http://localhost/mcp

# Check queue status
php artisan queue:failed
```

## Common Issues

### Database Connection
- Ensure MySQL is running on the correct port
- Verify database credentials in .env
- Check MySQL user permissions

### Redis Connection
- Verify Redis is running
- Check Redis port and authentication
- Ensure firewall allows Redis connections

### Slack Integration
- Verify Slack app is installed in workspace
- Check bot token permissions
- Ensure correct signing secret

### MCP Tools
- Verify MCP endpoint is accessible
- Check tool registration
- Test tool discovery via MCP protocol

## Next Steps

1. **Setup Slack App**: Install and configure your Slack app
2. **Configure MCP**: Set up MCP tools for AI integration
3. **Test Queries**: Test basic SQL queries
4. **Deploy**: Deploy to production environment

---

For more information, see the [API Reference](/api/) or [MCP Tools](/mcp-tools/).
