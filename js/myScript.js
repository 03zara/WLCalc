var impBtn = document.querySelector("#impBtn");
var metBtn = document.querySelector("#metBtn");

var ageInput = document.querySelector("#ageInput");

var gender = document.getElementById("gender");
var male = document.getElementById("radioMale");
var female = document.getElementById("radioFemale");

var footInput = document.getElementById("footInput");
var inchInput = document.getElementById("inchInput");

var imperial = document.querySelectorAll(".imperial");
var metric = document.querySelectorAll(".metric");

var cmInput = document.getElementById("cmInput");

var weightInput = document.querySelector(".weightInput");
var weightInputKg = document.querySelector(".weightInputKg");

var exerciseInput = document.querySelector("#exerciseInput");

var button1 = document.querySelector(".button1");

var displayCurrentCalories = document.getElementById("displayCurrentCalories");

var goalWeightInput = document.querySelector(".goalWeightInput");
var goalWeightInputKg = document.querySelector(".goalWeightInputKg");
var goalDaysInput = document.getElementById("goalDaysInput");
var displayGoalCalories = document.getElementById("displayGoalCalories");
var displayMaintainCalories = document.getElementById("displayMaintainCalories");



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


// if either imperial or metric buttons are clicked, change the button color as well as the input tags displayed for the height (Ft/CM) or weight (Lbs/Kg)

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


    // this function calculates the Weight loss in Imperial measurements
    function WeightLossCalculator(){
            // first check all inputs filled
            validateForm();
        
            // create function that converts foot to inches
            function calculation () {
                var convertFtToNum = parseInt(footInput.value || 0);
                var convertInchToNum = parseInt(inchInput.value || 0);

                var convertToInches = convertFtToNum * 12 + convertInchToNum;
                    return convertToInches;
            }
        
            //Converted input values to float to be used for calculations
            var age = parseFloat(ageInput.value);
            var weight = parseFloat(weightInput.value);
            var gWeight = parseFloat(goalWeightInput.value);
            var convertGoalDays = parseFloat(goalDaysInput.value);
            
            // Calculates the AMOUNT of calories needed to lose per day
            function CalorieLose() {
                var differenceInWeight = weight - gWeight;
                var caloriesNeededToReduce = differenceInWeight * 3500; 
                var finalCalories = caloriesNeededToReduce/convertGoalDays;
                return Math.round(finalCalories);
            }
            
          
            // BMR calculation only WITHOUT taking physical activity into account
                // female and male currentBMR calculation
            function fBMR() {
                var BMRcalc = 655 + (4.35 * weight) + (4.7 * calculation()) - (4.7 * age);
                return BMRcalc;
            }
            
            function mBMR() {
                var BMRcalc = 66 + (6.23 * weight) + (12.7 * calculation()) - (6.8 * age);
                return BMRcalc;
            }
                // female and male new BMR needed to maintain the goal weight
            function newFemaleBMR(){
                 var newBMRcalc = 655 + (4.35 * gWeight) + (4.7 * calculation()) - (4.7 * age);
                return newBMRcalc;
            }
            
            function newMaleBMR() {
                var newBMRcalc = 66 + (6.23 * gWeight) + (12.7 * calculation()) - (6.8 * age);
                return newBMRcalc;
            }
            
        // This function will display the amount of calories needed to either gain or losr weight
            function goalGainOrLossDisplay() {
                
                if ((goalWeightInput.value > weightInput.value)) {
                    displayGoalCalories.textContent = "To reach your goal of " + goalWeightInput.value + " lbs in " + convertGoalDays + " days, you should eat: " + goalCalories + " Calories/day, or exercise less to reduce your calorie burn rate.";
                }
                else {
                    displayGoalCalories.textContent = "To reach your goal of " + goalWeightInput.value + " lbs in " + convertGoalDays + " days, you should eat: " + goalCalories + " Calories/day, or exercise more to boost your calorie burn rate by about " + CalorieLose() + " Calories/day.";    
                }
            }
            
            //Displays the full text for either females and males
            function FemaleOutcome() {
                
                displayCurrentCalories.textContent = "In order to maintain your current weight, you should eat: " + currentCalories + " Calories/day.";
                
                goalGainOrLossDisplay();
                
                displayMaintainCalories.textContent = "To maintain your goal of " + goalWeightInput.value + " lbs, you should eat: " + maintainCalories + " Calories/day.";
                }
                                                  
            function MaleOutcome() {
                
                displayCurrentCalories.textContent = "In order to maintain your current weight, you should eat: " + currentCalories + " Calories/day.";
                
                goalGainOrLossDisplay()
                
                var maintainCalories = Math.round(1.2 * newMaleBMR());
                displayMaintainCalories.textContent = "To maintain your goal of " + goalWeightInput.value + " lbs, you should eat: " + maintainCalories + " Calories/day.";
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
                        // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleOutcome();  
                        }
                    }
                    else if ((exerciseInput.value === "Lightly Active")) {
                        var currentCalories = Math.round(1.375 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.375 * newFemaleBMR());
                        
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleOutcome();
                                }
                    }
                    else if ((exerciseInput.value === "Moderately Active")) {
                        var currentCalories = Math.round(1.55 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.55 * newFemaleBMR());
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleOutcome();
                            }   
                    }
                    else if ((exerciseInput.value === "Very Active")) {
                        var currentCalories = Math.round(1.725 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.725 * newFemaleBMR());
                        
                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleOutcome();
                            }
                    }
                    else {
                        var currentCalories = Math.round(1.9 * fBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.9 * newFemaleBMR());
                        
                                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleOutcome();
                                }     
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
                        // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleOutcome();
                            }
                    }
                    else if ((exerciseInput.value === "Lightly Active")) {
                        var currentCalories = Math.round(1.375 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.375 * newMaleBMR());
                        
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleOutcome();
                            }
                    }
                    else if ((exerciseInput.value === "Moderately Active")) {
                        var currentCalories = Math.round(1.55 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.55 * newMaleBMR());
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleOutcome();
                            }
                    }

                    else if ((exerciseInput.value === "Very Active")) {
                        var currentCalories = Math.round(1.725 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.725 * newMaleBMR());
                        
                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleOutcome();
                            }
                    }
                    else {
                        var currentCalories = Math.round(1.9 * mBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.9 * newMaleBMR());
                                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleOutcome();
                            }   
                    }
                    
                }
                else {
                    alert("Please select your gender.");
                }

      
        }



// this function calculates the Weight loss in Metric - only call this function if metBtn = selected.
 
function MetricWeightLossCalculator() {
        
            validateFormMetric();
            
            //Converted values to float to be used for calculations
            var age = parseFloat(ageInput.value || 0);
            var height = parseFloat(cmInput.value || 0);
            var weight = parseFloat(weightInputKg.value || 0);
            var gWeight = parseFloat(goalWeightInputKg.value || 0);
            var convertGoalDays = parseFloat(goalDaysInput.value || 0);
            
            // Calculates the AMOUNT of calories needed to lose per day
            function CalorieLose() {
                var differenceInWeight = (weight - gWeight) * 2.20462; // converts kg to pounds
                var caloriesNeededToReduce = differenceInWeight * 3500; 
                var finalCalories = caloriesNeededToReduce/convertGoalDays;
                return Math.round(finalCalories);
            }
            
          
            // BMR calculation only WITHOUT taking physical activity into account
                // female and male currentBMR calculation

            function fMetricBMR() {
                var BMRcalc = 655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age);
                return BMRcalc;
            }
            
            function mMetricBMR() {
                var BMRcalc = 66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age);
                return BMRcalc;
            }
            
            function fMetricNewBMR() {
                var BMRcalc = 655.1 + (9.563 * gWeight) + (1.85 * height) - (4.676 * age);
                return BMRcalc;
            }
            
            function mMetricNewBMR() {
                var BMRcalc = 66.47 + (13.75 * gWeight) + (5.003 * height) - (6.755 * age);
                return BMRcalc;
            }
    
            
            function goalGainOrLossDisplayKg() {
                if ((goalWeightInputKg.value > weightInputKg.value)) {
                    displayGoalCalories.textContent = "To reach your goal of " + goalWeightInputKg.value + " kg in " + convertGoalDays + " days, you should eat: " + goalCalories + " Calories/day, or exercise less to reduce your calorie burn rate.";
                }
                else {
                    displayGoalCalories.textContent = "To reach your goal of " + goalWeightInputKg.value + " kg in " + convertGoalDays + " days, you should eat: " + goalCalories + " Calories/day, or exercise more to boost your calorie burn rate by about " + CalorieLose() + " Calories/day.";   
                }
            }
            

            function FemaleMetricOutcome() {
                
                displayCurrentCalories.textContent = "In order to maintain your current weight, you should eat: " + currentCalories + " Calories/day.";
                
                goalGainOrLossDisplayKg();

                displayMaintainCalories.textContent = "To maintain your goal of " + goalWeightInputKg.value + " kg, you should eat: " + maintainCalories + " Calories/day.";
                }
                                                  
            function MaleMetricOutcome() {
                
                displayCurrentCalories.textContent = "In order to maintain your current weight, you should eat: " + currentCalories + " Calories/day.";
               
                goalGainOrLossDisplayKg();

                displayMaintainCalories.textContent = "To maintain your goal of " + goalWeightInputKg.value + " kg, you should eat: " + maintainCalories + " Calories/day.";
                }

            
         
                if (female.checked) {
                    if (exerciseInput.value === "") {
                          alert("Please choose your daily activity option.");
                    }              
                    else if (exerciseInput.value === "No Activity") {
                        var currentCalories = Math.round(1.2 * fMetricBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.2 * fMetricNewBMR());
                            
                        // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }    
                            else {
                                FemaleMetricOutcome();
                            }
                                
                    }
                    else if ((exerciseInput.value === "Lightly Active")) {
                        var currentCalories = Math.round(1.375 * fMetricBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.375 * fMetricNewBMR());
                        
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleMetricOutcome();
                                }
                    }
                    else if ((exerciseInput.value === "Moderately Active")) {
                        var currentCalories = Math.round(1.55 * fMetricNewBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.55 * fMetricNewBMR());
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleMetricOutcome();
                            }   
                    }
                    else if ((exerciseInput.value === "Very Active")) {
                        var currentCalories = Math.round(1.725 * fMetricNewBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.725 * fMetricNewBMR());
                        
                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleMetricOutcome();
                            }
                    }
                    else {
                        var currentCalories = Math.round(1.9 * fMetricNewBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.9 * fMetricNewBMR());
                        
                                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                FemaleMetricOutcome();
                            }  
                        
                    }
                    
                }
                else if (male.checked) {
                    if (exerciseInput.value === "") {
                          alert("Please choose your daily activity option.");
                    }
                    else if (exerciseInput.value === "No Activity") {
                        var currentCalories = Math.round(1.2 * mMetricBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.2 * mMetricNewBMR());
                        // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleMetricOutcome();
                            }
                    }
                    else if ((exerciseInput.value === "Lightly Active")) {
                        var currentCalories = Math.round(1.375 * mMetricBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.375 * mMetricNewBMR());
                        
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleMetricOutcome();
                            }
                    }
                    else if ((exerciseInput.value === "Moderately Active")) {
                        var currentCalories = Math.round(1.55 * mMetricBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.55 * mMetricNewBMR());
                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleMetricOutcome();
                            }
                    }

                    else if ((exerciseInput.value === "Very Active")) {
                        var currentCalories = Math.round(1.725 * mMetricBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.725 * mMetricNewBMR());
                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleMetricOutcome();
                            }
                    }
                    else {
                        var currentCalories = Math.round(1.9 * mMetricBMR());
                        var goalCalories = Math.round(currentCalories - CalorieLose());
                        var maintainCalories = Math.round(1.9 * mMetricNewBMR());
                                                                // check to make sure goal calories is not too low
                            if (goalCalories < 1000) {
                                displayGoalCalories.innerHTML = Warning();
                            }
                            else if (goalCalories > 3000) {
                                displayGoalCalories.innerHTML = WarningMax();
                            }
                            else {
                                MaleMetricOutcome();
                            }  
                        
                    }
                    
                }
                else {
                    alert("Please select your gender.");
                }
}


// When the Calculate button is clicked, if the imperial button contains the selected class, run the normal weight loss calculated but if the metric button contains the selected class, run the metric WLCalc.
button1.addEventListener("click", function() {
    
    if (impBtn.classList.contains("selected")) {
        WeightLossCalculator();
    }
    else {
        MetricWeightLossCalculator();
    }  
    
});