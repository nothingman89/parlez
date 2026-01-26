# Justfile for Parlez - a translation practice app
# Run commands with: just <command>

# Install dependencies and setup playwright browsers
setup:
    uv sync
    uv run playwright install

# Start development server with hot reload on http://localhost:8000
dev:
    uv run uvicorn app.main:app --reload

# Run all tests with pytest
test:
    uv run pytest

# Format code with black and auto-fix ruff issues
fmt:
    uv run black .
    uv run ruff check --fix .

# Check code style without making changes
lint:
    uv run ruff check .
    uv run black --check .
