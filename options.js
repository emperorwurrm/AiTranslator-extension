document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

function saveOptions() {
    const backend = document.getElementById('backend').value;
    const language = document.getElementById('language').value;
    const apiKey_openrouter = document.getElementById('apiKey_openrouter').value;
    const openrouter_model = document.getElementById('openrouter_model').value;
    const apiKey_openai = document.getElementById('apiKey_openai').value;
    const apiKey_claude = document.getElementById('apiKey_claude').value;
    const apiKey_gemini = document.getElementById('apiKey_gemini').value;
    const apiKey_deepseek = document.getElementById('apiKey_deepseek').value;

    chrome.storage.local.set({
        chosen_backend: backend,
        chosen_language: language,
        apiKey_openrouter: apiKey_openrouter,
        openrouter_model: openrouter_model,
        apiKey_openai: apiKey_openai,
        apiKey_claude: apiKey_claude,
        apiKey_gemini: apiKey_gemini,
        apiKey_deepseek: apiKey_deepseek
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
            status.textContent = '';
        }, 2000);
    });
}

function restoreOptions() {
    chrome.storage.local.get({
        chosen_backend: 'openrouter',
        chosen_language: 'English',
        apiKey_openrouter: '',
        openrouter_model: '',
        apiKey_openai: '',
        apiKey_claude: '',
        apiKey_gemini: '',
        apiKey_deepseek: ''
    }, (items) => {
        document.getElementById('backend').value = items.chosen_backend;
        document.getElementById('language').value = items.chosen_language;
        document.getElementById('apiKey_openrouter').value = items.apiKey_openrouter;
        document.getElementById('openrouter_model').value = items.openrouter_model;
        document.getElementById('apiKey_openai').value = items.apiKey_openai;
        document.getElementById('apiKey_claude').value = items.apiKey_claude;
        document.getElementById('apiKey_gemini').value = items.apiKey_gemini;
        document.getElementById('apiKey_deepseek').value = items.apiKey_deepseek;
    });
}
