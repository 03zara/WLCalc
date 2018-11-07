var impBtn = document.querySelector("#impBtn");
var metBtn = document.querySelector("#metBtn");

var ageInput = document.querySelector("#ageInput");

var footInput = document.getElementById("footInput");
var inchInput = document.getElementById("inchInput");

var imperial = document.querySelectorAll(".imperial");
var metric = document.querySelectorAll(".metric");

var cmInput = document.getElementById("cmInput");

var weightInput = document.querySelector(".weightInput");
var weightInputKg = document.querySelector(".weightInputKg");

var exerciseInput = document.querySelector("#exerciseInput");

var goalWeightInput = document.querySelector(".goalWeightInput");
var goalWeightInputKg = document.querySelector(".goalWeightInputKg");
var goalDaysInput = document.getElementById("goalDaysInput");

var displayGoalCalories = document.getElementById("displayGoalCalories");
var displayMaintainCalories = document.getElementById("displayMaintainCalories");
var displayCurrentCalories = document.getElementById("displayCurrentCalories");

var button1 = document.querySelector(".button1");


// function created that checks to make sure user has filled in all the input boxes - one for imperial and one for metric

 function validateForm() {
        if (ageInput.value == "" || ageInput.value == null || inchInput.value == "" || inchInput.value == null || footInput.value == "" || footInput.value == null ||  weightInput.value == "" || weightInput.value == null || goalWeightInput.value == "" || goalWeightInput.value == null || goalDaysInput.value == "" || goalDaysInput.value == null) {
            alert("Please fill in all the required fields.");
            document.getElementById("results").style.display = "none";
        }
        
        else {
            document.getElementById("results").style.display = "block";
        }
 }    

    
 function validateFormMetric() {
     
        if (ageInput.value == "" || ageInput.value == null || cmInput.value == "" || cmInput.value == null || weightInputKg.value == "" || weightInputKg.value == null || goalWeightInputKg.value == "" || goalWeightInputKg.value == null || goalDaysInput.value == "" || goalDaysInput.value == null) {
            alert("Please fill in ALL the required fields.");
            document.getElementById("results").style.display = "none";
        }
        
        else {
            document.getElementById("results").style.display = "block";
            
        }
 } 


// if either imperial or metric buttons are clicked, change the button color as well as the input boxes with the correct units displayed for the height (Ft/CM) or weight (Lbs/Kg)

    impBtn.onclick = function () {
        
        metric[0].style.display = "none";
        metric[1].style.display = "none";
        imperial[0].style.display = "block";
        imperial[1].style.display = "block";
        metBtn.classList.remove("selected");
        impBtn.classList.remove("selected");
        this.classList.add("selected");
    }


    metBtn.onclick = function() {

        metric[0].style.display = "block";
        metric[1].style.display = "block";
        imperial[0].style.display = "none";
        imperial[1].style.display = "none";
        metBtn.classList.remove("selected");
        impBtn.classList.remove("selected");
        this.classList.add("selected");
    }
       

// functions to warn user if the calories calculated is off the max and min limit of consumption.
    function Warning() {
        var warn = "Warning: your goal requires you to consume less than the recommended minimum requirement of 1000 calories per day which implies a high risk for your health and is not recommended. Please enter a more realistic goal weight, increase the number of days entered or just exercise more.";
        return warn;    
    }
            
    function WarningMax() {
        var warn = "Warning: your goal requires you to consume more than the recommended maximum requirement of 3000 calories per day which implies a high risk for your health and is not recommended. Please enter a more realistic goal weight, increase the number of days entered or exercise less.";
        return warn;   
    }


    // this function calculates the Weight loss/gain

    function WeightLossCalculator() {

            // first check all fields are fielded in
            if (impBtn.classList.contains("selected")) {
                validateForm(); 
            }
            else {
                validateFormMetric();
            }
        
            // create function that converts foot to inches
            function calculation () {
                var convertFtToNum = parseInt(footInput.value || 0);
                var convertInchToNum = parseInt(inchInput.value || 0);

                var convertToInches = convertFtToNum * 12 + convertInchToNum;
                    return convertToInches;
            }
        
            //Converted input values to float to be used for calculations
            var age = parseFloat(ageInput.value || 0);
            var convertGoalDays = parseFloat(goalDaysInput.value || 0);
        
            if (impBtn.classList.contains("selected")) {
                var height = calculation() || 0;
                var weight = parseFloat(weightInput.value || 0);
                var gWeight = parseFloat(goalWeightInput.value || 0);
            }
            else {
                var height = parseFloat(cmInput.value || 0);
                var weight = parseFloat(weightInputKg.value || 0);
                var gWeight = parseFloat(goalWeightInputKg.value || 0);
            }
            
            // Calculates the AMOUNT of calories needed to lose per day
        function CalorieLose() {
           
                var differenceInWeight = weight - gWeight;

                    if (impBtn.classList.contains("selected")) {
                        var differenceInWeight = weight - gWeight;
                    }
                    else {
                        var differenceInWeight = (weight - gWeight) * 2.20462; // converts kg to pounds
                    }

                var caloriesNeededToReduce = differenceInWeight * 3500;
                var finalCalories = caloriesNeededToReduce/convertGoalDays;
                return Math.round(finalCalories);
        }
            
          
// BMR calculation only WITHOUT taking physical activity into account
                // female and male currentBMR calculation

            function fBMR() {
                
                if (impBtn.classList.contains("selected")) {
                var BMRcalc = 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
                }
                else {
                var BMRcalc = 655 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
                }
                
                return BMRcalc;
            }
            
            function mBMR() {
                
                if (impBtn.classList.contains("selected")) {
                    var BMRcalc = 66 + (6.23 * weight) + (12.7 * calculation()) - (6.8 * age);                }
                else {
                    var BMRcalc = 66 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
                }
                
                return BMRcalc;
                
            }
                // female and male new BMR needed to maintain the goal weight
            function newFemaleBMR(){
                
                if (impBtn.classList.contains("selected")) {
                    var newBMRcalc = 655 + (4.35 * gWeight) + (4.7 * height) - (4.7 * age);
                }
                else {
                    var newBMRcalc = 655 + (9.563 * gWeight) + (1.85 * height) - (4.676 * age);
                }
                
                return newBMRcalc;
            }

            
            function newMaleBMR() {
                
                if (impBtn.classList.contains("selected")) {
                    var newBMRcalc = 66 + (6.23 * gWeight) + (12.7 * calculation()) - (6.8 * age);
                }
                else {
                    var newBMRcalc = 66 + (13.75 * gWeight) + (5.003 * height) - (6.755 * age);
                }
                                    
                return newBMRcalc;
            }
            
                
                // This function will display the amount of calories needed to either gain or lose weight
            function goalGainOrLossDisplay() {   
                
                if ((gWeight > weight)) {
                    displayGoalCalories.textContent = "To reach your goal of " + gWeight + " lbs in " + convertGoalDays + " days, you should eat: " + goalCalories + " Calories/day, or exercise less to reduce your calorie burn rate.";
                }
                else {
                    displayGoalCalories.textContent = "To reach your goal of " + gWeight + " lbs in " + convertGoalDays + " days, you should eat: " + goalCalories + " Calories/day, or exercise more to boost your calorie burn rate by about " + CalorieLose() + " Calories/day.";    
                }
            }
            
                //Displays the full final text for either females and males
            function Outcome() {
                
                displayCurrentCalories.textContent = "In order to maintain your current weight, you should eat: " + currentCalories + " Calories/day.";
                
                goalGainOrLossDisplay();
                
                displayMaintainCalories.textContent = "To maintain your goal of " + gWeight + " lbs, you should eat: " + maintainCalories + " Calories/day.";
            }
        
            function displayCalorieResult() {

                // check to make sure goal calories is not too low or high
                if (goalCalories < 1000) {
                    displayGoalCalories.innerHTML = Warning();
                }
                else if (goalCalories > 3000) {
                    displayGoalCalories.innerHTML = WarningMax();
                }
                else {
                    Outcome();  
                }
            }

 // Bulk of the calculation is done here - females and males values are different therefore if else needed.
                if (female.checked) {
                    
                    if (exerciseInput.value === "") {
                          alert("Please choose your daily activity option.");
                    }
                    else if (exerciseInput.value === "No Activity") {
                        var currentCalories = Math.round(1.2 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.2 * newFemaleBMR());

                        displayCalorieResult();
                    }
                    else if ((exerciseInput.value === "Lightly Active")) {
                        var currentCalories = Math.round(1.375 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.375 * newFemaleBMR());
                        
                        displayCalorieResult();

                    }
                    else if ((exerciseInput.value === "Moderately Active")) {
                        var currentCalories = Math.round(1.55 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.55 * newFemaleBMR());
                        
                        displayCalorieResult();
                    }
                    else if ((exerciseInput.value === "Very Active")) {
                        var currentCalories = Math.round(1.725 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.725 * newFemaleBMR());
                        
                        displayCalorieResult();
                    }
                    else {
                        var currentCalories = Math.round(1.9 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.9 * newFemaleBMR());
                        
                        displayCalorieResult();
                    }
                    
                }
                else if (male.checked) {
                    if (exerciseInput.value === "") {
                          alert("Please choose your daily activity option.");
                    }
                    else if (exerciseInput.value === "No Activity") {
                        var currentCalories = Math.round(1.2 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.2 * newMaleBMR());
                        
                        displayCalorieResult();
                        
                    }
                    else if ((exerciseInput.value === "Lightly Active")) {
                        var currentCalories = Math.round(1.375 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.375 * newMaleBMR());
                        
                        displayCalorieResult();
                    }
                    else if ((exerciseInput.value === "Moderately Active")) {
                        var currentCalories = Math.round(1.55 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.55 * newMaleBMR());
                        
                        displayCalorieResult();
                    }

                    else if ((exerciseInput.value === "Very Active")) {
                        var currentCalories = Math.round(1.725 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.725 * newMaleBMR());
                        
                        displayCalorieResult();
                    }
                    else {
                        var currentCalories = Math.round(1.9 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.9 * newMaleBMR());
                                                                // check to make sure goal calories is not too low
                        displayCalorieResult();
                    }
                    
                }
                else {
                    alert("Please select your gender.");
                }       
        
    }


// When the Calculate button is clicked, run the weight loss/gain calculator
button1.addEventListener("click", function() {
        
    WeightLossCalculator();

    
});