document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itineraryForm');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');
    const statusMessage = document.getElementById('statusMessage');

    // N8N Webhook URL - User will need to import this later or we define it in config
    // For now I'll use a placeholder variable that we can easily update or document
    const WEBHOOK_URL = 'https://dhandapani.app.n8n.cloud/webhook/d8ea3846-ff9e-467c-b2db-98db63de4217';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        statusMessage.classList.add('hidden');
        statusMessage.className = 'hidden'; // reset classes

        const formData = {
            destination: document.getElementById('destination').value,
            days: document.getElementById('days').value,
            travelers: document.getElementById('travelers').value,
            budget: document.getElementById('budget').value,
            transport: document.getElementById('transport').value,
            email: document.getElementById('email').value,
            preferences: document.getElementById('preferences').value
        };

        try {
            // NOTE: This fetch might fail if the Webhook URL isn't set up yet.
            // We will allow the user to see the success state for demo purposes if needed,
            // or we handle the error gracefully.

            // For now, let's simulate a success if the URL is the placeholder
            if (WEBHOOK_URL.includes('YOUR_N8N_INSTANCE_URL')) {
                await new Promise(r => setTimeout(r, 2000)); // Simulate delay
                showStatus('Simulated Success: Connect your n8n webhook to make this real!', 'success');
                console.log('Form payload:', formData);
            } else {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showStatus('Success! Your itinerary is being generated and will be sent to your email.', 'success');
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            showStatus('Something went wrong. Please try again later.', 'error');
        } finally {
            setLoading(false);
        }
    });

    function validateForm() {
        // Basic HTML5 validation is triggered by the browser before this event.
        // We can add custom validation here if needed.
        return true;
    }

    function setLoading(isLoading) {
        generateBtn.disabled = isLoading;
        if (isLoading) {
            btnText.classList.add('hidden');
            loader.classList.remove('hidden');
        } else {
            btnText.classList.remove('hidden');
            loader.classList.add('hidden');
        }
    }

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = type; // 'success' or 'error'
        statusMessage.classList.remove('hidden');
    }
});
