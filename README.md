# AiTranslator

A powerful browser extension that provides instant AI-powered translation for any text on the web. Simply select text and translate it using multiple AI providers including OpenAI, Claude, Gemini, DeepSeek, and OpenRouter.

![AiTranslator](icons/icon-128.png)

## Features

- 🌐 **Instant Translation**: Select any text on any webpage and get instant translations
- 🤖 **Multiple AI Providers**: Choose from OpenAI, Claude (Anthropic), Gemini, DeepSeek, or OpenRouter
- 🎨 **Beautiful Neumorphic UI**: Clean, modern design with smooth animations
- 📋 **One-Click Copy**: Copy translated text with a single click
- 🌍 **Multiple Languages**: Support for English, Spanish, French, German, Chinese, Japanese, Persian, Arabic, Russian, and more
- 🔒 **Local Storage**: All API keys stored locally in your browser

## Installation

### Chrome/Edge/Brave

1. Download or clone this repository
2. Open your browser and navigate to:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the `TranslateExtention` folder

## Setup

### Getting Your API Key

Before using AiTranslator, you need to obtain an API key from one of the supported providers:

#### OpenRouter (Recommended for beginners)
1. Visit [OpenRouter](https://openrouter.ai/keys)
2. Sign up for a free account
3. Generate an API key
4. Choose a model (e.g., `mistralai/mistral-7b-instruct`)

#### OpenAI
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up and add credits to your account
3. Generate an API key

#### Claude (Anthropic)
1. Visit [Anthropic Console](https://console.anthropic.com/settings/keys)
2. Sign up for an account
3. Generate an API key

#### Gemini (Google)
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Create an API key

#### DeepSeek
1. Visit [DeepSeek Platform](https://platform.deepseek.com/api_keys)
2. Sign up for an account
3. Generate an API key

### Configuring the Extension

1. Click the AiTranslator icon in your browser toolbar
2. Click **Open Settings**
3. Select your preferred **Backend Provider**
4. Paste your **API Key** in the corresponding field
5. (For OpenRouter) Enter your chosen model name
6. Select your **Default Target Language**
7. Click **Save Settings**

## Usage

1. **Select Text**: Highlight any text on a webpage
2. **Click the Icon**: A green translation icon will appear next to your selection
3. **Choose Language**: Select your target language from the dropdown
4. **Translate**: Click the "Translate" button
5. **Copy**: Use the Copy button to copy the translation to your clipboard

## Screenshots

### Translation Panel
The floating translation panel appears when you click the green icon:
- Clean neumorphic design
- Language selector
- Instant translation
- Copy button

### Settings Page
Configure your AI provider and API keys in the settings page with an intuitive interface.

## Privacy

- All API keys are stored **locally** in your browser using `chrome.storage.local`
- No data is sent to any third-party servers except the AI provider you choose
- Your translations are processed directly by your selected AI provider

## Development

### Project Structure

```
TranslateExtention/
├── manifest.json          # Extension configuration
├── background.js          # Background service worker (API calls)
├── content.js            # Content script (UI injection)
├── popup.html            # Extension popup
├── popup.css             # Popup styles
├── popup.js              # Popup logic
├── options.html          # Settings page
├── options.js            # Settings logic
└── icons/                # Extension icons
    ├── icon-16.png
    ├── icon-48.png
    ├── icon-64.png
    └── icon-128.png
```

### Technologies Used

- **Manifest V3**: Latest Chrome extension format
- **Vanilla JavaScript**: No frameworks required
- **Chrome Storage API**: For persistent settings
- **Fetch API**: For AI provider communication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

**Developed by**: [TheRealPourya](https://x.com/TheRealPourya)  
**GitHub**: [@xPOURY4](https://github.com/xPOURY4)

## Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/xPOURY4)
- Follow [@TheRealPourya](https://x.com/TheRealPourya) on X for updates

## Changelog

### Version 1.0
- Initial release
- Support for 5 AI providers
- Neumorphic UI design
- Multi-language support
- One-click copy functionality

---

Made with ❤️ by [TheRealPourya](https://github.com/xPOURY4)
