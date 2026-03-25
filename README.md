# ReactSample

A React Native project bootstrapped with `@react-native-community/cli`.

---

## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- Ruby (for iOS)
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

---

### Create a new project with the same setup

```bash
npx @react-native-community/cli@latest init ForTesting --version 0.84.1
cd MyApp
```

---

### Install dependencies

```bash
npm install \
  @hookform/resolvers \
  @react-navigation/native \
  @react-navigation/native-stack \
  axios \
  react-hook-form \
  react-native-dotenv \
  react-native-safe-area-context \
  react-native-screens \
  zod
```

---

### Install dev dependencies

```bash
npm install --save-dev \
  @babel/plugin-transform-export-namespace-from \
  typescript
```

---

### iOS setup

```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

---

### Add to babel.config.js

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      allowUndefined: true,
    }],
  ],
};
```

---

## Running the App

### Step 1 — Set up environment variables

**macOS** — add to `~/.zshrc` or `~/.bashrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
source ~/.zshrc
```

**Windows** — run in PowerShell or add to System Environment Variables:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\platform-tools"
```

> To set permanently on Windows:
> Control Panel → System → Advanced System Settings → Environment Variables

---

### Step 2 — List available emulators

```bash
emulator -list-avds
```

---

### Step 3 — Start the emulator

```bash
emulator -avd <AVD_NAME>
```

> Replace `<AVD_NAME>` with the name from the list above (e.g. `Pixel_8_API_35`)

---

### Step 4 — Verify device is detected

```bash
adb devices
```

Expected output:

```
List of devices attached
emulator-5554   device
```

---

### Step 5 — Start Metro Bundler

Open a terminal and run:

```bash
npx react-native start
```

> Keep this terminal open. Metro must be running before launching the app.

---

### Step 6 — Run on Android

Open a **new terminal** and run:

```bash
npx react-native run-android
```

Or using npm script:

```bash
npm run android
```

---

### Step 7 — Run on iOS (macOS only)

```bash
npx react-native run-ios
```

Or using npm script:

```bash
npm run ios
```

---

> **Note:** Always start Metro first in one terminal, then run the app in a second terminal.

```
Terminal 1                        Terminal 2
─────────────────────────────     ─────────────────────────────
$ npx react-native start          $ npx react-native run-android
  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░      BUILD SUCCESSFUL
  Metro waiting on port 8081...     Launching on emulator-5554
```

---

## Troubleshooting

| Issue | macOS Fix | Windows Fix |
|-------|-----------|-------------|
| `emulator` not found | Add `$ANDROID_HOME/emulator` to PATH in `~/.zshrc` | Add `%ANDROID_HOME%\emulator` to System PATH |
| `adb` not found | Add `$ANDROID_HOME/platform-tools` to PATH | Add `%ANDROID_HOME%\platform-tools` to System PATH |
| Metro not starting | Run `npx react-native start` in a separate terminal | Same |
| Metro port in use | `npx react-native start --port 8082` | Same |
| Build fails | `cd android && ./gradlew clean && cd ..` | `cd android`, then `.\gradlew clean`, then `cd ..` |
| Emulator slow | Enable Hardware Acceleration (HAXM) in Android Studio | Enable Hyper-V or HAXM in BIOS/Android Studio |
| `pod install` fails | `sudo gem install cocoapods` then retry | N/A (iOS only) |
