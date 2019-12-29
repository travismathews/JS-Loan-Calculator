// Listen for submit

document.querySelector('#loan-form').addEventListener('submit', function(e){
    
    // Hide Results
    document.querySelector('#results').style.display = 'none';
    
    // Show Loader

    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 1000);
    
    e.preventDefault();
});

// Calculate results

function calculateResults() {

    
    // UI Input Vars
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest');
    const years = document.querySelector('#years');

    // UI Output Vars
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    // Formula Conversions

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12; 

    // Compute Monthly Payments

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show results
        document.querySelector('#results').style.display = 'block';

        // Hide loading gif
        document.querySelector('#loading').style.display = 'none';
    } else{
        showError('Please check your numbers');
    }
}

// Show Error

function showError(error){

    // Hide results
    document.querySelector('#results').style.display = 'none';

    // Hide loading gif
    document.querySelector('#loading').style.display = 'none';

    // Create Div
    const errorDiv = document.createElement('div');

    // Get elements

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    
    // Add class
    errorDiv.className = 'alert alert-danger';

    //Create Text Node and Append to div

    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading

    card.insertBefore(errorDiv, heading);

    // Clear Error after timeout 
    setTimeout(clearError, 3000);
}

// Clear Error

function clearError(){
    document.querySelector('.alert').remove();
}





