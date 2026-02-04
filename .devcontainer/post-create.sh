#!/bin/zsh
set -e

# Remove git credentials inside the devcontainer
find /tmp -maxdepth 1 -name 'vscode-ssh-auth-*.sock' -delete

echo "Installing Bun..."
npm install -g bun

echo "Bun version:"
bun --version

echo "Dev container setup complete!"
