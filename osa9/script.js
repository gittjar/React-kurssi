// Purpose: Script for exercise calculator
document.getElementById('calculate').addEventListener('click', function() {
    const target = document.getElementById('target').value;
    const daily_exercises = document.getElementById('daily_exercises').value.split(',').map(Number);
    fetch('http://localhost:3002/exercises', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            daily_exercises,
            target
        })
    })
    .then(response => response.json())
    .then(data => {
        let resultText = `
            Period Length (total number of days): ${data.periodLength}
            Training Days (number of days with exercise): ${data.trainingDays}
            Success (did you reach your target): ${data.success}
            Rating (1-3, how well you did): ${data.rating}
            Rating Description: ${data.ratingDescription}
            Target (your target average daily hours of exercise): ${data.target}
            Average (your actual average daily hours of exercise): ${data.average}
        `;
        document.getElementById('result').innerText = resultText;
    })
    .catch(error => console.error('Error:', error));
});
