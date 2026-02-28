# Agro Mitra 🌱

Agro Mitra is an AI-powered, multilingual agricultural assistant designed to empower farmers with real-time insights, climate risk analysis, and personalized crop advisory. Built with React, Tailwind CSS, and powered by the Gemini API.

## Features ✨

*   **Multimodal AI Chatbot**: Ask questions via text, voice, or image upload. The bot can analyze crop health, soil types, and provide actionable advice.
*   **Real-time Weather & Location**: Automatically fetches local weather data and provides context-aware recommendations.
*   **Climate Risk Analysis**: Identifies potential risks (like pests or extreme weather) based on your location and crop, offering mitigation strategies.
*   **Local Industry Insights**: Uses Google Maps grounding to find nearby agricultural shops, cold storages, and equipment rentals.
*   **Multilingual Support**: Fully translated into English, Hindi, Marathi, Telugu, Tamil, Kannada, Bengali, and Gujarati.
*   **Offline Fallbacks**: Built-in offline data ensures the app remains useful even when API rate limits are hit or network connectivity is poor.
*   **Downloadable Reports**: Generate and download detailed PDF reports of your land analysis and crop advisory.

## Tech Stack 🛠️

*   **Frontend**: React 18, Vite, TypeScript
*   **Styling**: Tailwind CSS, Framer Motion (for animations)
*   **AI Integration**: `@google/genai` (Gemini 3.1 Pro, Gemini 2.5 Flash)
*   **Internationalization**: `react-i18next`
*   **PDF Generation**: `jspdf`, `jspdf-autotable`, `html2canvas`
*   **Icons**: Google Material Symbols

## Setup Instructions 🚀

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/agro-mitra.git
    cd agro-mitra
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

5.  **Build for production**:
    ```bash
    npm run build
    ```

## Offline Mode 📶

Agro Mitra is designed with resilience in mind. If the Gemini API hits rate limits (`429 RESOURCE_EXHAUSTED`) or fails to connect, the app gracefully falls back to pre-defined offline data for:
*   General pest and water management risks.
*   Basic local industry services.
*   Keyword-based chat responses for common queries (weather, pests, fertilizers, crops).

## Contributing 🤝

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## License 📝

This project is licensed under the MIT License.
