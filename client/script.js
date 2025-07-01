const checkboxInputs = [
  { check: 'chk-description', input: 'desc-input' },
  { check: 'chk-firstletter', input: 'firstletter-input' },
  { check: 'chk-example', input: 'example-input' },
  { check: 'chk-syllables', input: 'syllables-input' },
];

// Вмикання/вимикання додаткових полів
checkboxInputs.forEach(({ check, input }) => {
  const checkbox = document.getElementById(check);
  const inputField = document.getElementById(input);
  if (checkbox && inputField) {
    checkbox.addEventListener('change', () => {
      inputField.classList.toggle('hidden', !checkbox.checked);
    });
  }
});

// Обробка натискання кнопки "Знайти слово"
document.getElementById('search-btn').addEventListener('click', async () => {
  const description = document.getElementById('desc-input').value;
  const firstLetter = document.getElementById('firstletter-input').value;
  const example = document.getElementById('example-input').value;
  const syllables = document.getElementById('syllables-input').value;
  const input = document.getElementById('main-input').value;

  const prompt = `
Ти допомагаєш згадати українське слово. 
❗ Всі слова мають бути українською мовою, без перекладів, транскрипцій, вигаданих слів або англійських варіантів. 
Опис: "${description}"
Приклад речення: "${example}"
Початкова літера: "${firstLetter}"
Кількість складів: "${syllables}"
Загальний опис: "${input}"

Виведи рівно 8 **різних українських слів**, кожне на окремому рядку. Без номерів, без зайвих символів, без пояснень.
`;

  const response = await fetch("/api/wordrecall", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  console.log("🟢 Отримано відповідь від сервера:", data);

  const isUkrainian = word => /^[А-ЯІЇЄҐа-яіїєґ]+$/.test(word);

  let words = [];

  if (Array.isArray(data.words)) {
    words = data.words;
  } else if (typeof data.words === "string") {
    words = data.words
      .split(/\n|,|;/)
      .map(w => w.replace(/^[-*•\d. ]+/, '').trim());
  }

  words = words
    .filter(isUkrainian)
    .filter((w, i, arr) => arr.indexOf(w) === i)
    .slice(0, 8);

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  if (words.length < 1) {
    resultsContainer.textContent = "Не вдалося знайти слова. Спробуйте інший опис.";
    return;
  }

  words.forEach(word => {
    const btn = document.createElement("button");
    btn.className = "word-btn";
    btn.textContent = word;
    btn.onclick = () => alert(`Ось воно? ${word}`);
    resultsContainer.appendChild(btn);
  });
});

// Випадкове слово у заголовку
const changingWords = ["Кохання?", "Біль?", "Свобода?", "Мрія?", "Надія?", "Щастя?", "Спокій?"];
document.getElementById("changing-word").textContent =
  changingWords[Math.floor(Math.random() * changingWords.length)];
