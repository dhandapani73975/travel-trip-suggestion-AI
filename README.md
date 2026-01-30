# Travel Itinerary Generator

A web application that generates personalized travel itineraries using AI.

## Setup Instructions

### Frontend
1. The frontend files are located in this directory (`index.html`, `style.css`, `script.js`).
2. You can host these on **GitHub Pages**:
   - Push this code to a GitHub repository.
   - Go to Settings -> Pages.
   - Select the `main` branch as the source.

### Automation (n8n)
1. Import `workflow.json` into your n8n instance.
2. **Configure Credentials**:
   - Open the **OpenAI Node** and add your API Key.
   - Open the **Gmail Node** (or replace with your preferred Email node) and add your credentials.
3. **Activate Webhook**:
   - In the **Webhook Node**, check the "Production URL".
   - Copy this URL.
4. **Update Frontend**:
   - Open `script.js`.
   - Replace `const WEBHOOK_URL = '...'` with your actual n8n Production URL.

## AI Usage Documentation

### Frontend Development (Cursor AI)
- **Role**: Co-pilot.
- **Usage**:
    - Assisted in generating the CSS for the glassmorphism effect.
    - Helped structure the semantic HTML5 form.
    - Wrote the initial `fetch` logic in `script.js` to handle the POST request.

### Automation Logic (LLM in n8n)
- **Node**: OpenAI Chat Model (GPT-4)
- **System Prompt**: Acts as an expert travel agent.
- **Input Processing**: Takes structured JSON from the frontend (destination, budget, etc.) and composes a comprehensive prompt.
- **Output**: Generates an HTML-formatted itinerary which is passed directly to the Email node.

## Design Decisions
- **No Backend**: To strictly follow the project constraints, all logic is handled client-side or via the n8n webhook.
- **Privacy**: User data is sent only to the n8n workflow and not stored persistently in any browser storage.
