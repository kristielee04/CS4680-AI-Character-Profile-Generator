# AI Character Profile Generator

A web application that uses OpenAI's GPT-40-mini to generate detailed character profiles for games, stories, and creative projects. Users can specify certain character traits or leave fields blank for AI creativity.

## Features

- **Flexible Input**: Fill in any character parameters you want to specify, leave others blank
- **Comprehensive Output**: Generates detailed character profiles including:
  - Basic information (name, genre, role, tone, age, gender)
  - Psychology (personality, motivations, fears, strengths, flaws)
  - Background (origin, life events, current status)
  - Skills and abilities
  - Visual design (appearance, clothing, distinctive features)
  - Narrative hooks (goals, conflicts, relationships)
  - Extra notes and themes
- **Real-time Generation**: Fast AI-powered character creation

## Setup Instructions

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
   - **Gender**: What gender should this character be?
   - **Strengths**: What are this character's main strengths?
   - **Flaws**: What are this character's main flaws or weaknesses?
   - **Skills**: What skills or abilities does this character have?
   - **Visual Keywords**: How should this character look visually?
   - **Additional Context**: Any other details you'd like to include?

2. **Click "Generate Character"** to create your character profile

3. **View the results** in a formatted display

4. **Clear the form** to start over

## Project Structure

```
AI Assistant Project/
├── prompts/
│   ├── system.txt          # System prompt for OpenAI
│   └── template.txt        # Template for character generation
│   └── fewshot.txt         # Input-ouput charcter generation example
├── templates/
│   └── index.html          # Main HTML template
├── static/
│   ├── style.css           # CSS styling
│   └── script.js           # JavaScript functionality
├── server.py               # Flask backend server
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Customization

### Modifying Prompts

You can customize the AI's behavior by editing the prompt files:

- **`prompts/system.txt`**: Contains the system instructions for the AI
- **`prompts/template.txt`**: Contains the template for character generation
- **`prompts/fewshot.txt`**: Contains the example input-output pair for character generation

## API Endpoints

- `GET /`: Serves the main application page
- `POST /generate-character`: Generates a character profile
