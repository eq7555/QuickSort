// script.js

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

function formatTime(timeInMs) {
    if (timeInMs >= 60000) {
        let timeInMin = timeInMs / 60000;
        return `${timeInMin.toFixed(2)} min`;
    } else {
        let timeInSec = timeInMs / 1000;
        return `${timeInSec.toFixed(2)} s`;
    }
}

function generateRandomArray(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(Math.floor(Math.random() * 1000000) + 1);
    }
    return arr;
}

let chart; // Variable global para el gráfico

// Iniciar pruebas con botón
document.getElementById('startBtn').addEventListener('click', () => {
    let numTests = 10;
    let minVal = 100000;
    let maxVal = 1000000;
    let increment = Math.floor((maxVal - minVal) / (numTests - 1));

    let testSizes = [];
    let times = [];
    let resultTable = document.getElementById('resultTable');
    resultTable.innerHTML = '';

    for (let i = 1; i <= numTests; i++) {
        let arraySize;

        if (i === numTests) {
            arraySize = 1000000;
        } else {
            arraySize = minVal + (i - 1) * increment;
        }

        let arr = generateRandomArray(arraySize);

        let startTime = performance.now();
        quickSort(arr);  // Aquí se usa el método QuickSort
        let endTime = performance.now();
        let timeTaken = endTime - startTime;
        let formattedTime = formatTime(timeTaken);

        let row = `<tr>
                    <td>${i}</td>
                    <td>${arraySize}</td>
                    <td>${formattedTime}</td> 
                  </tr>`;
        resultTable.innerHTML += row;

        testSizes.push(i);
        times.push(timeTaken);
    }

    renderChart(testSizes, times);
});

// Limpiar resultados con botón
document.getElementById('cleanBtn').addEventListener('click', () => {
    document.getElementById('resultTable').innerHTML = '';
    if (chart) {
        chart.destroy(); // Destruir el gráfico existente
    }
});

function renderChart(labels, data) {
    const ctx = document.getElementById('timeChart').getContext('2d');
    if (chart) {
        chart.destroy(); // Destruir el gráfico existente antes de crear uno nuevo
    }
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Tiempo de ejecución (ms)',
                data: data,
                borderColor: 'rgba(255, 0, 0, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Número de Prueba'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Tiempo (ms)'
                    }
                }
            }
        }
    });
}
