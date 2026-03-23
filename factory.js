let compiler;

async function setupLocalEngine() {
    const btn = document.getElementById('loadBtn');
    const status = document.getElementById('loadStatus');
    const runBtn = document.getElementById('runBtn');

    btn.disabled = true;
    btn.innerText = "جاري التحميل...";
    status.innerText = "يتم الآن تحميل المترجم بداخل متصفحك...";

    try {
        // نستخدم CppIt وهو محرك WASM خفيف جداً ومستقر
        compiler = new CppIt();
        await compiler.init();
        
        status.innerText = "✅ المحرك جاهز تماماً!";
        status.style.color = "#2ecc71";
        btn.style.display = "none";
        runBtn.disabled = false;
        runBtn.style.background = "#27ae60";
        runBtn.style.cursor = "pointer";
    } catch (err) {
        status.innerText = "❌ فشل التحميل. جرب VPN لمرة واحدة فقط.";
        btn.disabled = false;
        btn.innerText = "إعادة محاولة";
    }
}

async function runLocally() {
    const code = document.getElementById('cppInput').value;
    const outputDiv = document.getElementById('outputConsole');
    outputDiv.innerText = "Running code locally...";

    try {
        const result = await compiler.run(code);
        outputDiv.innerText = result.stdout || result.stderr || "Done.";
    } catch (err) {
        outputDiv.innerText = "خطأ أثناء التنفيذ: " + err;
    }
}
