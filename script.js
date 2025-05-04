
function getStroke(name) {
  let total = 0;
  for (let char of name) {
    total += char.charCodeAt(0);
  }
  return total;
}

function getElement(index) {
  const elements = ["金", "木", "水", "火", "土", "雷", "風", "光", "暗"];
  return elements[index % elements.length];
}

function generateStats(name) {
  const stroke = getStroke(name);
  return {
    name: name,
    element: getElement(stroke),
    hp: 500 + (stroke % 500),
    mp: 200 + (stroke % 300),
    atk: 30 + (stroke % 40),
    def: 10 + (stroke % 20),
  };
}

function getRandomSkill(name, atk) {
  const skills = [
    "揮出烈焰斬",
    "釋放雷光彈",
    "使出影子突刺",
    "施放冰封咒",
    "衝撞對手胸口",
    "斬擊對手肩膀",
    "召喚流星雨",
    "念出混亂咒語"
  ];
  const skill = skills[Math.floor(Math.random() * skills.length)];
  const cost = 30 + Math.floor(Math.random() * 20);
  const damage = atk + Math.floor(Math.random() * 50);
  return { skill, cost, damage };
}

function simulateBattle(p1, p2) {
  const log = [];

  log.push(`${p1.name}（屬性：${p1.element}｜HP：${p1.hp}｜MP：${p1.mp}）`);
  log.push(`${p2.name}（屬性：${p2.element}｜HP：${p2.hp}｜MP：${p2.mp}）`);
  log.push("戰鬥開始！");

  let attacker = p1;
  let defender = p2;

  for (let round = 1; round <= 10; round++) {
    if (attacker.mp < 30) {
      log.push(`${attacker.name} 魔力不足，跳過回合。`);
    } else {
      const { skill, cost, damage } = getRandomSkill(attacker.name, attacker.atk);
      attacker.mp -= cost;
      const actualDamage = Math.max(0, damage - defender.def);
      defender.hp -= actualDamage;
      log.push(`${attacker.name} 使用 ${skill}（耗MP ${cost}），造成 ${defender.name} ${actualDamage} 傷害！`);
    }

    if (defender.hp <= 0) {
      log.push(`${defender.name} 倒下了！${attacker.name} 獲勝！`);
      return log;
    }

    [attacker, defender] = [defender, attacker]; // 交換攻守
  }

  if (p1.hp === p2.hp) {
    log.push("雙方勢均力敵，平手收場！");
  } else {
    const winner = p1.hp > p2.hp ? p1 : p2;
    log.push(`戰鬥結束，${winner.name} 獲勝！`);
  }

  return log;
}

function startBattle() {
  const n1 = document.getElementById("name1").value.trim();
  const n2 = document.getElementById("name2").value.trim();
  if (!n1 || !n2) return alert("請輸入兩個名字");

  const p1 = generateStats(n1);
  const p2 = generateStats(n2);

  const battleLog = simulateBattle(p1, p2);
  document.getElementById("arena").innerHTML = battleLog.map(line => `<div>${line}</div>`).join("");
}
