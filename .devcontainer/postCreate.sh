#!/bin/bash

# Future use script

# Fetch and add the .aider.conf.yml to the root of the repo
curl -o .aider.conf.yml https://raw.githubusercontent.com/paul-gauthier/aider/main/aider/website/assets/sample.aider.conf.yml

# Add *.aider to .gitignore if not already present
if ! grep -qx "*.aider" .gitignore; then
    echo "*.aider" >> .gitignore
fi

# Install aider-chat using pip
pip install aider-chat

# Install project dependencies with Yarn
yarn install

echo "Post-create script has been executed."