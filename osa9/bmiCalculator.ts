function calculateBmi(height: number, weight: number): string {
    let heightInMeters: number = height / 100;
    let bmi: number = weight / (heightInMeters ** 2);

    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
    } else {
        return "Obesity";
    }
}

let pituus: number = 180;
let paino: number = 74;

// Call the function with hard-coded parameters
let bmiResult: string = calculateBmi(pituus, paino);
console.log(bmiResult + ' pituus: ' + pituus + 'cm' + ' paino: ' + paino + 'kg');