// مصنع أسامة الصغير - المحرك الداخلي (No-Network Engine)
const JSCPP = {
    run: function(code, input, config) {
        let output = "";
        
        // تنظيف الكود من التعليقات والفراغات
        let lines = code.split('\n');
        
        lines.forEach(line => {
            // معالجة أمر cout
            if (line.includes("cout <<")) {
                // استخراج النصوص بين علامات التنصيص
                let matches = line.match(/"([^"]+)"/g);
                if (matches) {
                    matches.forEach(m => {
                        output += m.replace(/"/g, "");
                    });
                }
                // معالجة endl (سطر جديد)
                if (line.includes("endl")) {
                    output += "\n";
                }
            }
        });

        // إرسال النتيجة للكونسول
        if (config && config.stdio && config.stdio.write) {
            config.stdio.write(output);
        }
        return 0;
    }
};
