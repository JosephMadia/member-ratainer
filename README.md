## Getting Started

### Prerequisites

- Node.js >= 22.11.0
- Ruby (for iOS)
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

### Create a new project with the same setup

```bash
npx @react-native-community/cli@latest init MyApp --version 0.84.1
cd MyApp
```

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

### Install dev dependencies

```bash
npm install --save-dev \
  @babel/plugin-transform-export-namespace-from \
  typescript
```

### iOS setup

```bash
cd ios && bundle install && bundle exec pod install && cd ..
```

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

### Run

```bash
# Android
npm run android

# iOS
npm run ios
```
