from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

class Chatbot:
    def __init__(self, api_key=None, user_message="", query=""):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        self.messages = []
        self.query = query
        self.user_message = user_message

    def chat(self):
        self.messages.append({
            "role": "system",
            "content": f"You are a legal AI assistant helping in solving a legal query. The query is: {self.query}"
        })

        self.messages.append({
            "role": "user",
            "content": self.user_message
        })
        client = genai.Client(api_key=self.api_key)
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=self.messages
        )

        assistant_reply = response.text
        self.messages.append({
            "role": "assistant",
            "content": assistant_reply
        })

        return assistant_reply

