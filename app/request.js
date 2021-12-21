let mainChart;
let selectedHeroInformation;

const heroes = fetch('https://api.opendota.com/api/heroes')
    .then(response => response.json())

const firstHeroe = fetch( `https://api.opendota.com/api/benchmarks?hero_id=${1}`)
    .then(response => response.json())

async function ObtenerDatos(){
    let parsedResponse = await heroes
    let select = document.getElementById('campos')
    for(var i = 0;i < parsedResponse.length;i++){
        var opt = document.createElement('option');
        opt.value = parsedResponse[i].id;
        opt.innerHTML = parsedResponse[i].localized_name;
        select.appendChild(opt);
    }
}

async function CargarPrimerHeroe(){
    let parsedResponse = await firstHeroe
    selectedHeroInformation = parsedResponse.result
    let percentile = []
    let gold_per_min = [] 
    let exp_per_min = [] 
    let hero_damage_per_min = [] 
    parsedResponse.result.gold_per_min.forEach(element => {
        percentile.push(element.percentile)
        gold_per_min.push(element.value)
    });
    parsedResponse.result.xp_per_min.forEach(element => {
        exp_per_min.push(element.value)
    });
    parsedResponse.result.hero_damage_per_min.forEach(element => {
        hero_damage_per_min.push(element.value)
    });
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (mainChart) {
        mainChart.destroy();
    }
    mainChart = new Chart(ctx, {
        data: {
            labels: percentile,
            datasets: [{
                type: 'bar',
                label: 'Gold per min',
                data: gold_per_min,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                type: 'line',
                label: 'Exp per Min',
                data: exp_per_min,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                type: 'line',
                label: 'Damage per Min',
                data: hero_damage_per_min,
                fill: false,
                borderColor: 'red',
                tension: 0.1
            },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

$('#campos').change(async function(){
    let heroId = $(this)[0].value
    let benchmark = fetch( `https://api.opendota.com/api/benchmarks?hero_id=${heroId}`)
    .then(response => response.json())
    let parsedResponse = await benchmark
    // console.log(parsedResponse)
    selectedHeroInformation = parsedResponse.result
    let percentile = []
    let gold_per_min = [] 
    let exp_per_min = [] 
    let hero_damage_per_min = [] 
    parsedResponse.result.gold_per_min.forEach(element => {
        percentile.push(element.percentile)
        gold_per_min.push(element.value)
    });
    parsedResponse.result.xp_per_min.forEach(element => {
        exp_per_min.push(element.value)
    });
    parsedResponse.result.hero_damage_per_min.forEach(element => {
        hero_damage_per_min.push(element.value)
    });
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (mainChart) {
        mainChart.destroy();
    }
    mainChart = new Chart(ctx, {
        data: {
            labels: percentile,
            datasets: [{
                type: 'bar',
                label: 'Gold per min',
                data: gold_per_min,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                type: 'line',
                label: 'Exp per Min',
                data: exp_per_min,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            },
            {
                type: 'line',
                label: 'Damage per Min',
                data: hero_damage_per_min,
                fill: false,
                borderColor: 'red',
                tension: 0.1
            },
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
})

ObtenerDatos()
CargarPrimerHeroe()

