document.getElementById('submit-btn').addEventListener('click', function() {
    const phoneNumberInput = document.getElementById('phone-number').value;

    if (!phoneNumberInput) {
        alert("Please enter a phone number.");
        return;
    }

    // Show loading message when user clicks the submit button
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    setTimeout(() => {
        try {
            // Try parsing the phone number
            const phoneNumber = libphonenumber.parsePhoneNumberFromString(phoneNumberInput);

            if (phoneNumber && phoneNumber.isValid()) {
                // Country and provider detection
                const country = phoneNumber.country;
                const provider = getServiceProvider(country);

                // Display the result with smooth fade-in
                document.getElementById('country').textContent = `Country: ${country}`;
                document.getElementById('provider').textContent = `Provider: ${provider}`;
                document.getElementById('result').style.display = 'block';
                document.getElementById('result').classList.remove('hidden');
            } else {
                // Show error if the phone number is not valid
                document.getElementById('result').style.display = 'none';
                alert('Invalid phone number format.');
            }
        } catch (error) {
            // If an error occurs (invalid number format)
            document.getElementById('result').style.display = 'none';
            alert('Invalid phone number format.');
        } finally {
            // Hide loading spinner after a while
            document.getElementById('loading').style.display = 'none';
        }
    }, 500);  // Debounce effect to avoid immediate results
});

// Simulated provider lookup based on country (this is basic, could be expanded or use API)
function getServiceProvider(countryCode) {
    const providers = {
        'US': 'AT&T',
        'IN': 'Airtel',
        'IN': 'Jio',
        'GB': 'Vodafone',
        'CA': 'Rogers',
        'AU': 'Telstra',
        'DE': 'Deutsche Telekom',
        'FR': 'Orange'
    };

    return providers[countryCode] || 'Unknown Provider';
}






