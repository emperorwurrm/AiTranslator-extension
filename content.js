let icon = null;
let panel = null;
let selectedText = "";

document.addEventListener("mouseup", (e) => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (icon && document.body.contains(icon)) {
        if (!icon.contains(e.target)) {
            icon.remove();
            icon = null;
        }
    }

    if (panel && !panel.contains(e.target) && e.target !== icon) {
        panel.remove();
        panel = null;
    }

    if (text.length > 0 && (!panel || !panel.contains(e.target)) && (!icon || !icon.contains(e.target))) {
        selectedText = text;
        showIcon(e.pageX, e.pageY);
    }
});

function showIcon(x, y) {
    if (icon) icon.remove();

    icon = document.createElement("img");
    icon.src = chrome.runtime.getURL("icons/icon-48.png");
    icon.style.cssText = `
    position: absolute;
    left: ${x + 10}px;
    top: ${y + 10}px;
    width: 32px;
    height: 32px;
    cursor: pointer;
    z-index: 2147483647;
    filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.2));
    transition: all 0.2s ease;
  `;

    icon.onmouseover = () => {
        icon.style.transform = "scale(1.1)";
    };
    icon.onmouseout = () => {
        icon.style.transform = "scale(1.0)";
    };

    icon.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        showPanel(x, y);
        icon.remove();
        icon = null;
    });

    document.body.appendChild(icon);
}

function showPanel(x, y) {
    if (panel) panel.remove();

    panel = document.createElement("div");
    panel.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y + 20}px;
    width: 300px;
    background-color: #f0f0f3;
    border-radius: 15px;
    padding: 15px;
    z-index: 2147483647;
    box-shadow: 8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #0FAF5A;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

    const title = document.createElement("div");
    title.innerText = "Translate";
    title.style.fontWeight = "bold";
    title.style.marginBottom = "5px";
    title.style.color = "#0FAF5A";
    panel.appendChild(title);

    const select = document.createElement("select");
    select.style.cssText = `
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #f0f0f3;
    box-shadow: inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff;
    color: #0FAF5A;
    outline: none;
    font-weight: 500;
  `;

    const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Persian", "Arabic", "Russian"];
    languages.forEach(lang => {
        const opt = document.createElement("option");
        opt.value = lang;
        opt.innerText = lang;
        select.appendChild(opt);
    });

    chrome.storage.local.get(["chosen_language"], (res) => {
        if (res.chosen_language) {
            select.value = res.chosen_language;
        }
    });

    panel.appendChild(select);

    const btn = document.createElement("button");
    btn.innerText = "Translate";
    btn.style.cssText = `
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #f0f0f3;
    box-shadow: 4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff;
    color: #0FAF5A;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;
  `;

    btn.onmousedown = () => {
        btn.style.boxShadow = "inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff";
    };
    btn.onmouseup = () => {
        btn.style.boxShadow = "4px 4px 8px #d1d1d1, -4px -4px 8px #ffffff";
    };

    const resultArea = document.createElement("div");
    resultArea.style.cssText = `
    margin-top: 10px;
    padding: 10px;
    min-height: 40px;
    border-radius: 8px;
    background: #f0f0f3;
    box-shadow: inset 4px 4px 8px #d1d1d1, inset -4px -4px 8px #ffffff;
    color: #333;
    font-size: 14px;
    line-height: 1.4;
    display: none;
  `;

    const copyBtn = document.createElement("button");
    copyBtn.innerText = "Copy";
    copyBtn.style.cssText = `
    display: block;
    margin: 10px auto 0 auto;
    padding: 6px 16px;
    font-size: 11px;
    border: none;
    border-radius: 6px;
    background: #0FAF5A;
    color: white;
    cursor: pointer;
    box-shadow: 2px 2px 4px #d1d1d1, -2px -2px 4px #ffffff;
    font-weight: 600;
    transition: all 0.2s ease;
  `;

    copyBtn.onmouseover = () => {
        copyBtn.style.background = "#0d9449";
    };
    copyBtn.onmouseout = () => {
        copyBtn.style.background = "#0FAF5A";
    };
    copyBtn.onmousedown = () => {
        copyBtn.style.boxShadow = "inset 2px 2px 4px #0d9449";
    };
    copyBtn.onmouseup = () => {
        copyBtn.style.boxShadow = "2px 2px 4px #d1d1d1, -2px -2px 4px #ffffff";
    };

    copyBtn.onclick = () => {
        navigator.clipboard.writeText(resultArea.innerText);
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        setTimeout(() => copyBtn.innerText = originalText, 1500);
    };

    btn.onclick = () => {
        resultArea.style.display = "block";
        resultArea.innerText = "Translating...";
        copyBtn.style.display = "none";

        chrome.runtime.sendMessage({
            action: "translate",
            text: selectedText,
            targetLang: select.value
        }, (response) => {
            if (response && response.success) {
                resultArea.innerText = response.data;
                copyBtn.style.display = "block";
            } else {
                resultArea.innerText = "Error: " + (response ? response.error : "Unknown error");
            }
        });
    };

    panel.appendChild(btn);
    panel.appendChild(resultArea);
    panel.appendChild(copyBtn);

    document.body.appendChild(panel);
}
