document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itineraryForm');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');
    const statusMessage = document.getElementById('statusMessage');

    /**
     * ✅ UPDATED WEBHOOK URL
     * 1. Ensure you use the PRODUCTION URL from n8n.
     * 2. The path must match "travel-itinerary" as defined in your workflow.json.
     */
    const WEBHOOK_URL = 'https://dhandapani.app.n8n.cloud/webhook/travel-itinerary';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        setLoading(true);
        statusMessage.className = 'hidden';

        const formData = {
            destination: document.getElementById('destination').value,
            days: Number(document.getElementById('days').value),
            travelers: Number(document.getElementById('travelers').value),
            budget: document.getElementById('budget').value,
            transport: document.getElementById('transport').value,
            email: document.getElementById('email').value,
            preferences: document.getElementById('preferences').value
        };

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // If you get a 404 here, the workflow is likely not "Active" in n8n.
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error ${response.status}: Webhook not found or inactive.`);
            }

            showStatus(
                '✅ Success! Your itinerary is being generated and will be sent to your email.',
                'success'
            );

            form.reset();

        } catch (error) {
            console.error('Connection Error:', error);
            
            // Provide a more helpful message for the 404/Not Registered error
            const errorMessage = error.message.includes('not registered') 
                ? '❌ Error: Webhook not active. Please toggle the "Active" switch in n8n.'
                : '❌ Failed to connect to the automation server. Check your console for details.';
            
            showStatus(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    });

    function setLoading(isLoading) {
        generateBtn.disabled = isLoading;
        btnText.classList.toggle('hidden', isLoading);
        loader.classList.toggle('hidden', !isLoading);
    }

    function showStatus(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = type;
        statusMessage.classList.remove('hidden');
    }
});
