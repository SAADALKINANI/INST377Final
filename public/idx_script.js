
/*async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const base = document.getElementById('base').value;
  const target = document.getElementById('target').value;

  const response = await fetch(
    `/api/convert?base=${base}&target=${target}&amount=${amount}`
  );

  const data = await response.json();

  document.getElementById('result').innerHTML = `
    ${amount} ${base} = ${data.converted} ${target}
    <br>
    Exchange Rate: ${data.rate}
  `;
}*/

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const base = document.getElementById('base').value;
  const target = document.getElementById('target').value;

  const response = await fetch(`/api/convert?base=${base}&target=${target}&amount=${amount}`);
  const data = await response.json();

  console.log('API response:', data); // <-- add this

  document.getElementById('result').innerHTML = `
    ${amount} ${base} = ${data.converted} ${target}
    <br>Exchange Rate: ${data.rate}
  `;
}

async function saveFavorite() {
  const base_currency = document.getElementById('base').value;
  const target_currency = document.getElementById('target').value;

  await fetch('/api/favorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      base_currency,
      target_currency
    })
  });

  alert('Favorite saved!');
}