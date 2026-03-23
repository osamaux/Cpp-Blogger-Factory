let isEngineReady = false;

async function initEngine() {
    const loadBtn = document.getElementById('loadBtn');
    const loadStatus = document.getElementById('loadStatus');
    const runBtn = document.getElementById('runBtn');

    loadBtn.disabled = true;
    loadBtn.innerText = "جاري المحاولة...";
    loadStatus.innerText = "جاري محاولة الاتصال المباشر...";

    try {
        // نستخدم رابط مباشر ومختلف للمحرك (CDN) لضمان عدم الحظر
        const testReq = await fetch('https://wasmer.sh/api/run/cpp', { 
            method: 'OPTIONS' // فحص أولي بسيط
        });
        
        isEngineReady = true;
        loadStatus.innerText = "✅ المحرك جاهز للعمل!";
        loadStatus.style.color = "#28a745";
        loadBtn.style.display = "none";
        runBtn.disabled = false;
        runBtn.style.background = "#007acc";
        runBtn.style.cursor = "pointer";
        runBtn.innerText = "تشغيل المصنع (Run)";

    } catch (err) {
        loadStatus.innerText = "❌ فشل التحميل. الشبكة تمنع الاتصال بالمحرك.";
        loadBtn.disabled = false;
        loadBtn.innerText = "إعادة المحاولة";
        console.error("Connection Error:", err);
    }
}

async function runCodeLocally() {
    const code = document.getElementById('cppInput').value;
    const outputDiv = document.getElementById('outputConsole');
    outputDiv.innerText = "جاري المعالجة...";

    try {
        const response = await fetch('https://wasmer.sh/api/run/cpp', {
            method: 'POST',
            body: code
        });
        const result = await response.text();
        outputDiv.innerText = result || "تم التنفيذ.";
    } catch (e) {
        outputDiv.innerText = "عذراً: المحرك لا يستجيب في منطقتك حالياً.";
    }
}
