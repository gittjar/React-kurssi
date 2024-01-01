export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  export function calculateExercises(dailyHours: number[], target: number): Result {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hour => hour > 0).length;
    const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength;
    const success = average >= target;
    let rating;
    let ratingDescription;
  
    if (average < target / 2) {
      rating = 1;
      ratingDescription = 'You need to work harder!';
    } else if (average < target) {
      rating = 2;
      ratingDescription = 'Not too bad but could be better';
    } else {
      rating = 3;
      ratingDescription = 'Great job! Keep it up!';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  }