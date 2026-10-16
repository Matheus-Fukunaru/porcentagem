const form = document.getElementById('love-form');
const percentage = document.getElementById('percentage');
const result = document.getElementById('result');
const progressFill = document.getElementById('progress-fill');
const names = document.getElementById('names');

function compatibilidade(nome1, nome2) {
  const nomes = (nome1 + nome2).toLowerCase();
  let numeros = [...new Set([...nomes].filter(letra => /\p{L}/u.test(letra)))].map(
    letra => [...nomes].filter(c => c === letra).length
  );
  while (numeros.length > 2) {
    const novos = [];
    for (let i = 0; i < Math.floor(numeros.length / 2); i++) {
      novos.push((numeros[i] + numeros[numeros.length - 1 - i]) % 10);
    }
    if (numeros.length % 2) novos.push(numeros[Math.floor(numeros.length / 2)]);
    numeros = novos;
  }
  return Number(numeros.join('')); // Remove zeros à esquerda: 06 vira 6
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const nome1 = document.getElementById('name1').value.trim();
  const nome2 = document.getElementById('name2').value.trim();
  if (!nome1 || !nome2) return;
  const valor = compatibilidade(nome1, nome2);
  percentage.textContent = `${valor}%`;
  names.textContent = `${nome1} ♥ ${nome2}`;
  result.hidden = false;
  progressFill.style.width = '0%';
  requestAnimationFrame(() => { progressFill.style.width = `${Math.min(valor, 100)}%`; });
});
