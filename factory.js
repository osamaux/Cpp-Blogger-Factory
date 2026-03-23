async function executeCode() {
    const code = document.getElementById('cppInput').value;
    const outputDiv = document.getElementById('outputConsole');
    outputDiv.innerText = "Processing...";

    try {
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
        outputDiv.innerText = result.run.output || result.run.stderr || "Done";
    } catch (e) {
        outputDiv.innerText = "Network Error. Please try again.";
    }
}
