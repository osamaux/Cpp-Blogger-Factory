function runCodeNow() {
    const code = document.getElementById('cppInput').value;
    const outputDiv = document.getElementById('outputConsole');
    outputDiv.innerText = "جاري المعالجة محلياً...";
    outputDiv.style.color = "#4ec9b0";

    try {
        // استخدام مكتبة JSCPP المدمجة
        let output = "";
        const config = {
            stdio: {
                write: function (s) {
                    output += s;
                }
            }
        };

        // تشغيل الكود
        const exitCode = JSCPP.run(code, "", config);
        
        outputDiv.innerText = output || "تم التنفيذ بنجاح.";
    } catch (err) {
        outputDiv.innerText = "خطأ في الكود: " + err;
        outputDiv.style.color = "#f44747";
    }
}
