async function executeCode() {
    const code = document.getElementById('cppInput').value;
    const outputConsole = document.getElementById('outputConsole');
    const runBtn = document.querySelector('button');

    runBtn.disabled = true;
    runBtn.innerText = "جاري الاتصال بالسحاب...";
    outputConsole.innerText = "Processing...";

    try {
        const response = await fetch('https://emkc.org/api/v2/piston/execute', {
            method: 'POST',
            body: JSON.stringify({
                "language": "cpp",
                "version": "10.2.0",
                "files": [{ "content": code }]
            })
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        if (result.run) {
            outputConsole.innerText = result.run.output || "تم التنفيذ (لا مخرجات)";
            outputConsole.style.color = result.run.stderr ? "#f44747" : "#4ec9b0";
        }
    } catch (err) {
        outputConsole.innerText = "خطأ: تعذر الاتصال بمحرك التشغيل. تأكد من الإنترنت أو حاول مرة أخرى.";
        outputConsole.style.color = "#f44747";
        console.error(err);
    } finally {
        runBtn.disabled = false;
        runBtn.innerText = "تشغيل المصنع (Run)";
    }
}
