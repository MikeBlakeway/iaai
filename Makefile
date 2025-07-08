# Makefile for itv-api

VENV_DIR=.venv
PYTHON=python

# Create virtual environment
init:
	$(PYTHON) -m venv $(VENV_DIR)
	@echo "✅ Virtual environment created in $(VENV_DIR)"

# Activate & install requirements
install:
	. $(VENV_DIR)/bin/activate && pip install -r requirements.txt
	@echo "✅ Dependencies installed"

# Run dev server with hot reload
dev:
	. $(VENV_DIR)/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Clean everything (CAREFUL!)
clean:
	rm -rf $(VENV_DIR) __pycache__ .mypy_cache .pytest_cache
	@echo "🧹 Cleaned up virtual environment and caches"
