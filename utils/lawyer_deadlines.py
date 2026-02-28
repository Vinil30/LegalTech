import os
import json
import re
from google import genai
from dotenv import load_dotenv

load_dotenv()
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

class GenerateMilestones:
    def __init__(self, query, strategy="", api_key=GEMINI_API_KEY):
        self.query = query
        self.strategy = strategy
        self.api_key = api_key
        self.system_prompt = """
You are an expert legal assistant that generates realistic deadlines for lawyers based on the user's legal case query **and the lawyer's proposed strategy**.

Your job:
- Use the lawyer's **case strategy** as a guide for sequencing tasks.
- Adapt deadlines to match the chosen approach (e.g., faster if strategy is aggressive, slower if strategy is cautious).
- Always produce **7 to 10 clear, realistic deadlines**.

Output format (strict JSON only):
{
  "deadlines": [
    {"task": "File initial petition", "due_date": "2025-09-15", "completed": false},
    {"task": "Discovery deadline", "due_date": "2025-10-20", "completed": false},
    {"task": "Mediation session", "due_date": "2025-11-10", "completed": false},
    ....
  ]
}

Rules:
- Only JSON output, no text outside JSON
- Use YYYY-MM-DD format
- All dates should be after 2025-09-01
- Each task should be directly relevant to both the **query** and the **strategy**
- Always set "completed": false
"""

    def call_api(self):
        try:
            print("=== GenerateDeadlines API Call ===")
            print(f"Query: {self.query}")
            print(f"Strategy: {self.strategy}")

            client = genai.Client(api_key=self.api_key)
            full_prompt = f"{self.system_prompt}\n\nLegal Query: {self.query}\nLawyer Strategy: {self.strategy}\n\nGenerate deadlines:"

            resp = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=[full_prompt],
                config={
                    "temperature": 0.3,
                    "max_output_tokens": 1440,
                }
            )

            raw_response = resp.text.strip()
            print(f"Raw AI Response: {raw_response}")

            json_data = self._extract_json(raw_response)   

            if json_data and "deadlines" in json_data:
                return {"deadlines": json_data["deadlines"]}
            else:
                return {"deadlines": [], "error": "Invalid JSON structure"}

        except Exception as e:
            print(f"Exception in GenerateDeadlines: {str(e)}")
            return {"deadlines": [], "error": str(e)}
    def _extract_json(self, text):
        """Try multiple methods to extract JSON from AI response"""
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