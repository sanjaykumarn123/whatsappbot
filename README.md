# whatsappbot

### Prerequisites
1. Clone the repository:

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file to store your environment variables:
    ```bash
    OPENAI_API_KEY=<your-openai-api-key>
    ```

4. Make sure your **WhatsApp account** is ready and you can scan the QR code.

### Running the Project
1. Start the WebSocket server (this could be a separate service):
    ```bash
    npx ts-node-dev src/wsserver.ts
    ```

2. Run the bot:
    ```bash
    npx ts-node-dev src/whatsappbot.ts
    ```
