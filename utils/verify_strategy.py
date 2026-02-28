import json
import re
import os
import google.generativeai as genai


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def run_gemini_verification(case_title, strategy, milestones):
    """
    Send strategy + milestones to Gemini for verification and suggestions.
    Always returns a safe JSON structure.
    """
    milestones_text = "\n".join(
        [
            f"- {m['milestone_name']} (Due: {m['due_date'].strftime('%d %b %Y')}, Status: {m['status']})"
            for m in milestones if m.get("due_date")
        ]
    )

    prompt = f"""
You are a legal AI assistant. 
A lawyer created the following case strategy:

Case Title: {case_title}

Strategy:
{strategy}

Deadlines/Milestones:
{milestones_text if milestones else "No milestones yet."}

✅ Task: 
1. Verify if the strategy logically fits the case and milestones. 
2. Point out strengths & weaknesses. 
3. Suggest improvements or missing steps. 
4. Suggest next deadlines if needed.

⚠️ IMPORTANT: Return your response strictly in valid JSON with this structure:

{{
  "analysis": "overall analysis text",
  "strengths": ["point 1", "point 2", ...],
  "weaknesses": ["point 1", "point 2", ...],
  "improvements": ["point 1", "point 2", ...],
  "suggested_deadlines": [
    {{"task": "string", "due_date": "DD MMM YYYY"}}
  ]
}}

Do not include Markdown formatting, explanations, or extra text. Only return valid JSON.
"""

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    raw_text = response.text if response else ""

    json_data = _extract_json(raw_text)

    
    default_response = {
        "analysis": "",
        "strengths": [],
        "weaknesses": [],
        "improvements": [],
        "suggested_deadlines": []
    }

    if json_data:
        
        return {**default_response, **json_data}
    else:
        return {**default_response, "analysis": "Invalid JSON returned from AI"}


def _extract_json(text):
    """Try multiple methods to extract JSON from AI response"""
    if not text:
        return None

    
    start = text.find("{")
    end = text.rfind("}") + 1
    if start != -1 and end > start:
        try:
            return json.loads(text[start:end])
        except json.JSONDecodeError:
            pass

    
    code_block_pattern = r'```(?:json)?\s*(\{.*?\})\s*```'
    matches = re.findall(code_block_pattern, text, re.DOTALL | re.IGNORECASE)
    for match in matches:
        try:
            return json.loads(match)
        except json.JSONDecodeError:
            continue

    
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return None
