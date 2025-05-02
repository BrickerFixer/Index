from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from typing import List, Dict, Any
import httpx
import os

app = FastAPI()

# Allow frontend JS to access API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files (for serving JS, CSS, images, etc.)
app.mount("/client", StaticFiles(directory="client"), name="client")
app.mount("/css", StaticFiles(directory="css"), name="css")
app.mount("/resources", StaticFiles(directory="resources"), name="resources")
app.mount("/branding", StaticFiles(directory="resources/branding"), name="branding")
app.mount("/images", StaticFiles(directory="resources/images"), name="images")

# Serve index.html at root
@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(os.path.dirname(__file__), "index.html"))

# Serve indsearch.html at /indsearch
@app.get("/indsearch")
async def serve_indsearch():
    return FileResponse(os.path.join(os.path.dirname(__file__), "indsearch.html"))

# --- Search client registry ---

class SearchClient:
    name: str
    display_name: str

    async def search(self, query: str) -> List[Dict[str, Any]]:
        raise NotImplementedError

class DummyClient(SearchClient):
    name = "dummy"
    display_name = "Dummy"

    async def search(self, query: str):
        # Return a few example results for demonstration
        return [
            {
                "title": f"Dummy result for '{query}' - Example 1",
                "url": "https://example.com/1",
                "snippet": f"This is the first dummy result for '{query}'."
            },
            {
                "title": f"Dummy result for '{query}' - Example 2",
                "url": "https://example.com/2",
                "snippet": f"This is the second dummy result for '{query}'."
            },
            {
                "title": f"Dummy result for '{query}' - Example 3",
                "url": "https://example.com/3",
                "snippet": f"This is the third dummy result for '{query}'."
            }
        ]

clients = {
    DummyClient.name: DummyClient(),
    # Add more clients here (GoogleClient, BingClient, etc.)
}

# --- API endpoints ---

@app.get("/api/clients")
async def get_clients():
    return [{"id": c.name, "name": c.display_name} for c in clients.values()]

@app.get("/api/search")
async def search(
    q: str = Query(..., description="Search query"),
    client: str = Query("dummy", description="Search client ID"),
):
    if client not in clients:
        return {"error": "Unknown client"}
    results = await clients[client].search(q)
    # Always return specialBlocks and webResults for frontend compatibility
    return {
        "specialBlocks": [],
        "webResults": {"example.com": results}
    }

# --- Example: Add a real client (DuckDuckGo) ---

class DDGClient(SearchClient):
    name = "ddg"
    display_name = "DuckDuckGo"

    async def search(self, query: str):
        async with httpx.AsyncClient() as client:
            resp = await client.get(
                "https://api.duckduckgo.com/",
                params={"q": query, "format": "json", "no_redirect": 1, "no_html": 1},
            )
            data = resp.json()
            results = []
            for topic in data.get("RelatedTopics", []):
                if "Text" in topic and "FirstURL" in topic:
                    results.append({
                        "title": topic["Text"],
                        "url": topic["FirstURL"],
                        "snippet": topic["Text"],
                    })
            return results

clients[DDGClient.name] = DDGClient()

# --- Run with: uvicorn main:app --reload ---

app.mount("/", StaticFiles(directory=".", html=True), name="root")