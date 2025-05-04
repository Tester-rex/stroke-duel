document.getElementById("start-button").addEventListener("click", function() {
    const player1Name = document.getElementById("player1-name").value;
    const player2Name = document.getElementById("player2-name").value;

    // Check if the names contain simplified Chinese
    if (/[一-鿿]/.test(player1Name) && /[一-鿿]/.test(player2Name)) {
        if (player1Name.includes("简") || player2Name.includes("简")) {
            document.getElementById("battle-result").textContent = "簡體字使用者敗北！";
            return;
        }
    }

    // Randomly assign attributes
    const attributes = ["金", "木", "水", "火", "土", "雷", "風", "光", "暗"];
    const player1Attribute = attributes[Math.floor(Math.random() * attributes.length)];
    const player2Attribute = attributes[Math.floor(Math.random() * attributes.length)];

    // Assign random HP and MP
    const player1HP = Math.floor(Math.random() * 1000);
    const player2HP = Math.floor(Math.random() * 1000);
    const player1MP = Math.floor(Math.random() * 100);
    const player2MP = Math.floor(Math.random() * 100);

    let log = `玩家1: ${player1Name} - 屬性: ${player1Attribute} - HP: ${player1HP} - MP: ${player1MP}
`;
    log += `玩家2: ${player2Name} - 屬性: ${player2Attribute} - HP: ${player2HP} - MP: ${player2MP}
`;

    // Perform battle
    while (player1HP > 0 && player2HP > 0) {
        // Each player attacks
        player1HP -= Math.floor(Math.random() * 100);
        player2HP -= Math.floor(Math.random() * 100);

        log += `玩家1使用技能: ${player1Attribute}之力
`;
        log += `玩家2使用技能: ${player2Attribute}之力
`;
        log += `玩家1剩餘HP: ${player1HP}
`;
        log += `玩家2剩餘HP: ${player2HP}
`;

        if (player1HP <= 0) {
            log += `${player1Name} 敗北！
`;
            document.getElementById("battle-result").textContent = `${player2Name} 勝利！`;
            break;
        }
        if (player2HP <= 0) {
            log += `${player2Name} 敗北！
`;
            document.getElementById("battle-result").textContent = `${player1Name} 勝利！`;
            break;
        }
    }
    document.getElementById("battle-log").textContent = log;
});
