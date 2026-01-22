# Installing Node.js on macOS

You need to install Node.js and npm before you can run this project. Here are the options:

## Option 1: Download from Official Website (Easiest)

1. Go to [https://nodejs.org/](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version for macOS
3. Run the installer and follow the instructions
4. Restart your terminal
5. Verify installation:
   ```bash
   node --version
   npm --version
   ```

## Option 2: Install Homebrew First, Then Node.js

### Step 1: Install Homebrew

Open Terminal and run:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the prompts (you'll need to enter your password).

### Step 2: Install Node.js

After Homebrew is installed, run:
```bash
brew install node
```

### Step 3: Verify Installation

```bash
node --version
npm --version
```

## Option 3: Using nvm (Node Version Manager)

If you want to manage multiple Node.js versions:

1. Install nvm:
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. Restart your terminal or run:
   ```bash
   source ~/.zshrc
   ```

3. Install Node.js:
   ```bash
   nvm install --lts
   nvm use --lts
   ```

4. Verify:
   ```bash
   node --version
   npm --version
   ```

## After Installing Node.js

Once Node.js is installed, you can proceed with the project setup:

1. Navigate to the project directory:
   ```bash
   cd /Users/ashutoshojha/Desktop/CarrerConnect
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Follow the setup instructions in `SETUP.md`

## Troubleshooting

- If `npm` command is still not found after installation, restart your terminal
- Make sure you're using the correct terminal (zsh in your case)
- Check that Node.js is in your PATH:
  ```bash
  echo $PATH
  ```

## Recommended Version

Install Node.js version **18.x or higher** for best compatibility with this project.

