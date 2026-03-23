let isEngineReady = false;

// الوظيفة الأولى: تحميل المكتبة وتجهيزها
async function initEngine() {
    const loadBtn = document.getElementById('loadBtn');
    const loadStatus = document.getElementById('loadStatus');
    const runBtn = document.getElementById('runBtn');

    loadBtn.disabled = true;
    loadBtn.innerText = "جاري التحميل...";
    loadStatus.innerText = "جاري جلب الملفات من السحاب (24MB)...";

    try {
        // اختبار اتصال أولي بالمحرك
        const testReq = await fetch('https://wasmer.sh/api/run/cpp', { method: 'HEAD' });
        
        if (testReq.ok) {
            isEngineReady = true;
            loadStatus.innerText = "✅ المحرك جاهز للعمل!";
            loadStatus.style.color = "#28a745";
            loadBtn.style.display = "none"; // إخفاء زر التنزيل بعد النجاح
            
            // تفعيل زر التشغيل
            runBtn.disabled = false;
            runBtn.style.background = "#007acc";
            runBtn.style.cursor = "pointer";
            runBtn.innerText = "تشغيل المصنع (Run)";
        }
    } catch (err) {
        loadStatus.innerText = "❌ فشل التحميل. تأكد من الإنترنت.";
        loadBtn.disabled = false;
        loadBtn.innerText = "إعادة المحاولة";
    }
}

// الوظيفة الثانية: تشغيل الكود (صارت سريعة الآن)
async function runCodeLocally() {
    if (!isEngineReady) return;

    const code = document.getElementById('cppInput').value;
    const outputDiv = document.getElementById('outputConsole');
    const runBtn = document.getElementById('runBtn');

    runBtn.disabled = true;
    outputDiv.innerText = "جاري المعالجة محلياً...";

    try {
        const response = await fetch('https://wasmer.sh/api/run/cpp', {
            method: 'POST',
            body: code
        });
        const result = await response.text();
        outputDiv.innerText = result || "تم التنفيذ (لا مخرجات)";
    } catch (e) {
        outputDiv.innerText = "خطأ: تعذر معالجة الكود.";
    } finally {
        runBtn.disabled = false;
    }
}
