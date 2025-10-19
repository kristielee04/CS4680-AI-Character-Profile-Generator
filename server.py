from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os, json
import re


# === Setup ===
load_dotenv()
app = Flask(__name__)
CORS(app)
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def load_prompt(name):
    with open(f"prompts/{name}.txt", "r", encoding="utf-8") as f:
        return f.read().strip()

TEMPLATE_PROMPT = load_prompt("template")
SYSTEM_MESSAGE = load_prompt("system")
FEWSHOT = load_prompt("fewshot")

def safe_template_format(template: str, **kwargs) -> str:
    protected = re.sub(
        r"\{(genre|role|tone|age_range|gender|strengths|flaws|skills|visual_keywords|extra)\}",
        r"@@@\1@@@", 
        template,
    )
    escaped = protected.replace("{", "{{").replace("}", "}}")
    restored = re.sub(r"@@@(\w+)@@@", r"{\1}", escaped)
    return restored.format(**kwargs)


def safe_json_load(s: str):
    """Strict JSON loader with helpful debug output."""
    s = s.strip().replace("```json", "").replace("```", "").strip()
    if not s:
        raise ValueError("Empty response from model")
    if not s.startswith("{"):
        # if model returned partial, try wrapping
        s = "{" + s + "}"
    try:
        return json.loads(s)
    except Exception as e:
        print("JSON parsing failed. Raw output:")
        print(s)
        raise e

def call_openai_json(messages, model="gpt-4o-mini", temperature=0.7, max_tokens=600):
    response = client.chat.completions.create(
        model=model,
        response_format={"type": "json_object"},
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
    )
    content = response.choices[0].message.content
    print("Model output preview:", content[:200], "...")
    return safe_json_load(content)


# === Routes ===

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/generate-character", methods=["POST"])
def generate_character():
    data = request.get_json(force=True) or {}
    print("generate request:", json.dumps(data, indent=2))

    # Fill the single template with user inputs
    user_prompt = safe_template_format(
        TEMPLATE_PROMPT,
        genre=data.get("genre", ""),
        role=data.get("role", ""),
        tone=data.get("tone", ""),
        age_range=data.get("age_range", ""),
        gender=data.get("gender", ""),
        strengths=data.get("strengths", ""),
        flaws=data.get("flaws", ""),
        skills=data.get("skills", ""),
        visual_keywords=data.get("visual_keywords", ""),
        extra=data.get("extra", "")
    )

    try:
        character = call_openai_json(
            [
                {"role": "system", "content": SYSTEM_MESSAGE},
                {"role": "user", "content": "[Example]\n" + FEWSHOT.split("[OUTPUT]")[0].strip()},
                {"role": "assistant", "content": FEWSHOT.split("[OUTPUT]")[1].strip()},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.9
        )
        return jsonify({"success": True, "character": character}), 200
    except Exception as e:
        print("/generate-character error:", e)
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    print("Starting Character API on http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)