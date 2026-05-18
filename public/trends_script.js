let chart;

async function loadChart() {
    const base = document.getElementById('base').value;
    const target = document.getElementById('target').value;
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;

    const response = await fetch(
        `/api/history?base=${base}&target=${target}&from=${from}&to=${to}`
    );
    const data = await response.json();
    const labels = data.map(entry => entry.date);
    const values = data.map(entry => entry.rate);

    const ctx = document.getElementById('chart');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: `${base} → ${target}`,
                data: values,
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { x: { ticks: { maxTicksLimit: 10 } } }
        }
    });
}