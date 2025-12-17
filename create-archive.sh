#!/bin/bash

# Script to create a clean zip archive of the interview project
# Excludes node_modules, generated content, IDE files, and SOLUTION.md

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Output filename with timestamp
OUTPUT_NAME="interview-$(date +%Y%m%d).zip"

echo "Creating archive: $OUTPUT_NAME"

mkdir -p ./snapshots

zip -r "./snapshots/$OUTPUT_NAME" . \
  -x "node_modules/*" \
  -x "snapshots/*" \
  -x ".nx/*" \
  -x "dist/*" \
  -x "tmp/*" \
  -x "out-tsc/*" \
  -x "bazel-out/*" \
  -x ".angular/*" \
  -x "coverage/*" \
  -x ".idea/*" \
  -x ".vscode/*" \
  -x ".history/*" \
  -x ".git/*" \
  -x ".DS_Store" \
  -x "*.log" \
  -x ".sass-cache/*" \
  -x "SOLUTION.md" \
  -x "*.zip" \
  -x "create-archive.sh"

echo ""
echo "✅ Archive created: $OUTPUT_NAME"
echo "📦 Size: $(du -h "./snapshots/$OUTPUT_NAME" | cut -f1)"

