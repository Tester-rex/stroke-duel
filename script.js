
function getStroke(name) {
  let total = 0;
  for (let char of name) {
    total += char.charCodeAt(0);
  }
  return total % 10 + 1;
}

function startBattle() {
  const n1 = document.getElementById("name1").value.trim();
  const n2 = document.getElementById("name2").value.trim();
  if (!n1 || !n2) return alert("請輸入兩個名字");

  const s1 = getStroke(n1);
  const s2 = getStroke(n2);
  let result = "";

  if (s1 > s2) result = `${n1} 擊敗了 ${n2}！武器強度 ${s1} 對 ${s2}`;
  else if (s2 > s1) result = `${n2} 擊敗了 ${n1}！武器強度 ${s2} 對 ${s1}`;
  else result = `${n1} 與 ${n2} 平手！武器強度都是 ${s1}`;

  document.getElementById("arena").innerText = result;
}
