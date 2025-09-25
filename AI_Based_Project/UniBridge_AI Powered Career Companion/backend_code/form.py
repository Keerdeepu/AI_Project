from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import json
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for request
class ProjectRequest(BaseModel):
    domain: str
    skillLevel: str
    timeframe: str
    constraints: str = ""

# Load fallback JSON
with open("ideas.json", "r") as f:
    fallback_ideas = json.load(f)

@app.post("/generate-projects")
async def generate_projects(request: ProjectRequest):
    try:
        # Create prompt for GPT-3.5
        prompt = f"""
        Generate 3 project ideas for the domain: {request.domain}
        Skill level: {request.skillLevel}
        Timeframe: {request.timeframe}
        Constraints: {request.constraints}
        Provide output in JSON format:
        {{
          "titles": ["title1", "title2", "title3"],
          "summaries": ["summary1", "summary2", "summary3"],
          "tools": ["tool1", "tool2", "tool3"]
        }}
        """

        # Call OpenAI GPT-3.5
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7
        )

        # Extract content
        gpt_output = response.choices[0].message.content

        # Convert GPT output to JSON safely
        try:
            data = json.loads(gpt_output)
        except json.JSONDecodeError:
            # fallback if GPT output is malformed
            data = {
                "titles": [f"{request.domain} Project 1", f"{request.domain} Project 2", f"{request.domain} Project 3"],
                "summaries": [
                    f"A beginner-friendly project about {request.domain} using {request.constraints}.",
                    f"An intermediate project that explores {request.domain} concepts.",
                    f"An advanced project leveraging {request.domain} for real-world applications."
                ],
                "tools": ["Python", "React", "Flask"]
            }

        return data

    except openai.error.OpenAIError as e:
        # Quota exceeded or other API error
        return {
            "titles": [f"{request.domain} Project 1", f"{request.domain} Project 2", f"{request.domain} Project 3"],
            "summaries": [
                f"A beginner-friendly project about {request.domain}.",
                f"An intermediate project exploring {request.domain}.",
                f"An advanced project leveraging {request.domain} for practical use."
            ],
            "tools": ["Python", "React", "Flask"]
        }
