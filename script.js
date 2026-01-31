document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itineraryForm');
    const generateBtn = document.getElementById('generateBtn');
    const btnText = generateBtn.querySelector('.btn-text');
    const loader = generateBtn.querySelector('.loader');
    const statusMessage = document.getElementById('statusMessage');

    // ✅ REAL n8n webhook URL
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

            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || 'Webhook failed');
            }

            showStatus(
                '✅ Success! Your itinerary is being generated and will be sent to your email.',
                'success'
            );

            form.reset();

        } catch (error) {
            console.error('Webhook Error:', error);
            showStatus(
                '❌ Failed to generate itinerary. Please try again later.',
                'error'
            );
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
