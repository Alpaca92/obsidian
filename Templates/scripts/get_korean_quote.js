async function getKoreanQuote(maxLength = 30) {
  const randomQuote = await (
    await fetch(`https://api.quotable.io/quotes/random?maxLength=${maxLength}`)
  ).json();
  const [{ author, content }] = randomQuote;

  return `${content} - ${author}`;
}

module.exports = getKoreanQuote;
