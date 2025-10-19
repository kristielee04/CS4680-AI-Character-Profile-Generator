# AI Character Profile Generator

A web application that uses OpenAI's GPT-4 to generate detailed character profiles for games, stories, and creative projects. Users can specify certain character traits or leave fields blank for AI creativity.

## Features

- **Flexible Input**: Fill in any character parameters you want to specify, leave others blank
- **Comprehensive Output**: Generates detailed character profiles including:
  - Basic information (name, genre, role, tone, age)
  - Psychology (personality, motivations, fears, strengths, flaws)
  - Background (origin, life events, current status)
  - Skills and abilities
  - Visual design (appearance, clothing, distinctive features)
  - Narrative hooks (goals, conflicts, relationships)
  - Extra notes and themes
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real-time Generation**: Fast AI-powered character creation

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- OpenAI API key

### Installation

1. **Clone or download this project**

2. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your OpenAI API key:**

   - Create a `.env` file in the project root
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_actual_api_key_here
     ```
   - You can get an API key from [OpenAI's website](https://platform.openai.com/api-keys)

4. **Run the application:**

   ```bash
   python server.py
   ```

5. **Open your browser:**
   - Navigate to `http://localhost:5000`
   - Start creating characters!

## Usage

1. **Fill in character parameters** (all fields are optional):

   - **Genre**: What genre should this character belong to? (e.g., fantasy, sci-fi, modern)
   - **Role**: What role does this character play? (e.g., hero, villain, mentor)
   - **Tone**: What tone should the character embody? (e.g., dark, comedic, mysterious)
   - **Age Range**: What age range should this character be?
   - **Strengths**: What are this character's main strengths?
   - **Flaws**: What are this character's main flaws or weaknesses?
   - **Skills**: What skills or abilities does this character have?
   - **Visual Keywords**: How should this character look visually?
   - **Additional Context**: Any other details you'd like to include?

2. **Click "Generate Character"** to create your character profile

3. **View the results** in a beautifully formatted display

4. **Clear the form** to start over or **close results** to hide them

## Project Structure

```
AI Assistant Project/
├── prompts/
│   ├── system.txt          # System prompt for OpenAI
│   └── template.txt        # Template for character generation
├── templates/
│   └── index.html          # Main HTML template
├── static/
│   ├── style.css           # CSS styling
│   └── script.js           # JavaScript functionality
├── server.py               # Flask backend server
├── requirements.txt        # Python dependencies
├── .env.example           # Example environment file
└── README.md              # This file
```

## Customization

### Modifying Prompts

You can customize the AI's behavior by editing the prompt files:

- **`prompts/system.txt`**: Contains the system instructions for the AI
- **`prompts/template.txt`**: Contains the template for character generation

### Styling

The application uses modern CSS with:

- Responsive design for mobile and desktop
- Beautiful gradients and animations
- Font Awesome icons
- Google Fonts (Inter)

You can modify `static/style.css` to change the appearance.

## API Endpoints

- `GET /`: Serves the main application page
- `POST /generate-character`: Generates a character profile

### Example API Request

```json
{
  "genre": "fantasy",
  "role": "hero",
  "tone": "heroic",
  "age_range": "young adult",
  "strengths": "brave, determined",
  "flaws": "impulsive, prideful",
  "skills": "sword fighting, magic",
  "visual_keywords": "tall, blonde hair, blue eyes",
  "extra": "comes from a noble family"
}
```

## Troubleshooting

### Common Issues

1. **"Failed to load prompts" error:**

   - Make sure the `prompts/` folder exists with `system.txt` and `template.txt`

2. **OpenAI API errors:**

   - Check that your API key is correctly set in the `.env` file
   - Ensure you have sufficient API credits
   - Verify your OpenAI account has access to GPT-4

3. **Port already in use:**

   - Change the port in `server.py` (line 96) from 5000 to another port

4. **Dependencies not found:**
   - Run `pip install -r requirements.txt` to install all required packages
