/* محرك تشغيل C++ عبر السحاب */
async function executeCode() {
    const code = document.getElementById('cppInput').value;
    const outputConsole = document.getElementById('outputConsole');
    const runBtn = document.querySelector('button');

    // تجهيز الواجهة للتحميل
    runBtn.disabled = true;
    runBtn.innerText = "جاري المعالجة في السحاب...";
    outputConsole.innerText = "Connecting to Engine...";
    outputConsole.style.color = "#4ec9b0";

    try {
        // الاتصال بـ API المترجم السحابي
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "language": "cpp",
                "version": "10.2.0",
                "files": [{ "name": "main.cpp", "content": code }]
            })
        });

        const result = await response.json();

        if (result.run) {
            // عرض المخرجات أو الأخطاء
            const finalOutput = result.run.output || "تم التنفيذ بنجاح (لا توجد مخرجات نصية)";
            outputConsole.innerText = finalOutput;
            
            // تلوين النص أحمر إذا وجد خطأ برمجي
            if (result.run.stderr) {
                outputConsole.style.color = "#f44747";
            }
        } else {
            outputConsole.innerText = "خطأ: تعذر الاتصال بمحرك التشغيل.";
        }
    } catch (err) {
        outputConsole.innerText = "فشل في الشبكة: تأكد من اتصالك بالإنترنت.";
        outputConsole.style.color = "#f44747";
    } finally {
        runBtn.disabled = false;
        runBtn.innerText = "تشغيل البرنامج (Run)";
    }
}