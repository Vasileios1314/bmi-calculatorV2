

function calculateBMI(weight, height) {
    return Math.round(weight / (height * height))
  }

  function calculateBMR(weight, height, ageOfUser, genderOfUser){
      const heightInCm = height * 100

      return BMR = genderOfUser === "m"
      ? 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50
      : 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150
  }

  function calculateDailyCalories(BMR, exercise){
      return Math.round(dailyCalories = exercise === "yes"
      ? BMR * 1.6
      : BMR * 1.4
      )}

  function calculateIdealWeight (height){
    return Math.round(22.5 * height * height)
  }

  function calculateDietWeeks (weightToLose){
    return Math.abs(weightToLose / 0.5)
  }

  function calculateDietCalories(weightToLose, dailyCalories){
    return Math.round(weightToLose > 0
      ? dailyCalories - 500
      : dailyCalories + 500)
  }

  function validateNumberOfInputs(argv) {
    
    if (argv.length !== 7) {
      console.log(`
        You gave ${argv.length - 2} argument(s) to the program
    
        Please provide 5 arguments for
        
        weight (kg), 
        height (m), 
        age (years), 
        wether you exercise daily (yes or no)
        and your gender (m or f)
        
        Example:
    
        $ node index.js 82 1.79 32 yes m
      `);
  
      process.exit();
    }
  }
  function validateWeightHeightAndAge(weight, height, age){
    if(isNaN(weight) || isNaN(height) || isNaN(age)){
      console.log(`
      weight, height, age should be numbers.
      
      example:
      $ node index.js 82 1.79 32 yes m
      `)
      process.exit()
    }
    if(age <= 20){
      console.log(`
      This app is desinged for people 20 years old or more.
      `)
      process.exit()
    }
    if(weight <= 30 || weight >= 300){
      console.log(`
      If your body weight is below 30kg or above 300kg,
      i kindly advice you to visit a specialist.
      `)
      process.exit()
    }
}

function validateDailyExercise(dailyExercise){
    if(dailyExercise !== "yes" && dailyExercise !== "no"){
      console.log(`
      Please declare your daily exercise with "yes" or "no"
      `)
      process.exit()
    }
}

function validateGender(gender){
  if(gender !== "m" && gender !== "f"){
    console.log(`
    Please declare the gender with "m" for male
    or "f" for female.
    `)
    process.exit()
  }
}

  function formatOutput(userObject) {
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.heightInM} m
    weight: ${userObject.weightInKg} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeightKg} kg
    With a normal lifestyle you burn ${userObject.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeightKg} kg:

    Eat ${userObject.dietCalories} calories a day
    For ${userObject.dietWeeks} weeks
    `
  }

function bmiCalculator() {

  validateNumberOfInputs(process.argv)

    const weightInKg = parseInt(process.argv[2]);
    const heightInM = parseFloat(process.argv[3]);
    const age = parseInt(process.argv[4]);
    const dailyExercise = process.argv[5];
    const gender = process.argv[6];

    validateWeightHeightAndAge(weightInKg, heightInM, age)
    validateDailyExercise(dailyExercise)
    validateGender(gender)

    const BMI = calculateBMI(weightInKg, heightInM)
    const BMR = calculateBMR(weightInKg, heightInM, age, gender)
    const dailyCalories = calculateDailyCalories(BMR, dailyExercise)
    const idealWeightKg = calculateIdealWeight(heightInM)
    const weightToLose = weightInKg - idealWeightKg
    const dietWeeks = calculateDietWeeks(weightToLose)
    const dietCalories = calculateDietCalories(weightToLose, dailyCalories) 
    
    const user = {
      weightInKg: weightInKg,
      heightInM: heightInM,
      age: age,
      dailyExercise: dailyExercise,
      gender: gender,
      BMI: BMI,
      idealWeightKg: idealWeightKg,
      dailyCalories: dailyCalories,
      weightToLose: weightToLose,
      dietWeeks: dietWeeks,
      dietCalories: dietCalories,
    }
    const output = formatOutput(user);
    console.log(output);
    
  }
  
  bmiCalculator();