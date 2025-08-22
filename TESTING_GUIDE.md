# Dynamic Environment Support - Testing Guide

This demonstrates how the enhanced Toward CLI now supports custom environments.

## Setup Test Environment

1. Create a `.toward` file with custom environment variables:

```bash
# Standard environments (still supported)
STAGING_SERVER_IP=192.168.1.10
STAGING_SERVER_ADDRESS=staging.example.com
STAGING_SERVER_USERNAME=forge
STAGING_SITE_DIRECTORY=/home/forge
STAGING_DATABASE_NAME=example_staging
STAGING_DATABASE_USERNAME=forge
STAGING_DATABASE_PASSWORD=password123

PRODUCTION_SERVER_IP=192.168.1.20
PRODUCTION_SERVER_ADDRESS=production.example.com
PRODUCTION_SERVER_USERNAME=forge
PRODUCTION_SITE_DIRECTORY=/home/forge
PRODUCTION_DATABASE_NAME=example_production
PRODUCTION_DATABASE_USERNAME=forge
PRODUCTION_DATABASE_PASSWORD=password456

# Custom testing environment (NEW!)
TESTING_SERVER_IP=192.168.1.30
TESTING_SERVER_ADDRESS=testing.example.com
TESTING_SERVER_USERNAME=forge
TESTING_SITE_DIRECTORY=/home/forge
TESTING_DATABASE_NAME=example_testing
TESTING_DATABASE_USERNAME=forge
TESTING_DATABASE_PASSWORD=password789
```

## Expected Behavior

After these changes, you can now run:

```bash
# Standard environments (still work)
toward assets push -e staging
toward assets push -e production

# Custom environment (NEW!)
toward assets push -e testing
```

## How It Works

1. **Dynamic Detection**: The CLI scans environment variables for patterns like:
   - `{ENV}_SERVER_IP`
   - `{ENV}_SERVER_ADDRESS`
   - `{ENV}_DATABASE_NAME`
   - etc.

2. **Environment Extraction**: From variable names like `TESTING_SERVER_IP`, it extracts "testing" as an environment name.

3. **Validation**: The CLI validates that all required variables exist for an environment before allowing its use.

## Help Text

The help text now dynamically includes detected environments:

**Before**: `<dev | staging | production>`
**After**: `<dev | production | staging | testing>`

## Backwards Compatibility

- Existing `dev`, `staging`, `production` environments continue to work exactly as before
- No breaking changes to existing workflows
- Graceful fallback if no custom environments are defined