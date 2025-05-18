function describeNodeSimple(node) {
    if (node.nodeType === 1) {
        let s = `<${node.tagName.toLowerCase()}`;
        if (node.id) s += ` id="${node.id}"`;
        if (node.className) s += ` class="${node.className}"`;
        s += '>';
        return s;
    }
    if (node.nodeType === 3) {
        let txt = node.nodeValue.trim();
        if (txt) return `Текст: "${txt}"`;
    }
    return null;
}

function startSimpleDOMWalk() {
    // Збираємо всі вузли (елементи і текстові) preorder обходом
    let nodes = [];
    (function collect(node) {
        if (node.nodeType === 1 || node.nodeType === 3) nodes.push(node);
        for (let c of node.childNodes) collect(c);
    })(document.body);

    let idx = 0;
    while (true) {
        // Знаходимо найближчий валідний вузол
        let desc = null;
        while (idx >= 0 && idx < nodes.length && !(desc = describeNodeSimple(nodes[idx]))) {
            idx++;
        }
        if (idx < 0) idx = 0;
        if (idx >= nodes.length) {
            alert("Кінець обходу!");
            break;
        }

        let msg = `Ви на вузлі: ${desc}\n\n`
            + "1 — Наступний\n"
            + "2 — Попередній\n"
            + "3 — Вийти\n\n"
            + "Введіть номер дії:";

        let answer = prompt(msg, "");
        if (!answer || answer === "3") break;
        if (answer === "1") {
            idx++;
            if (idx >= nodes.length) {
                alert("Це був останній вузол.");
                break;
            }
        } else if (answer === "2") {
            idx--;
            if (idx < 0) {
                alert("Це був перший вузол.");
                idx = 0;
            }
        } else {
            alert("Невірний вибір!");
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
    let btn = document.createElement('button');
    btn.textContent = "Обхід DOM";
    btn.style = "position:fixed;bottom:60px;right:20px;z-index:10000;padding:12px 20px;font-size:16px;background:#3b5bdb;color:white;border-radius:8px;border:none;box-shadow:0 2px 8px #0002;cursor:pointer;";
    btn.onclick = startSimpleDOMWalk;
    document.body.appendChild(btn);
});