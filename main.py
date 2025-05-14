from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from typing import List, Dict, Any
import httpx
import os
from urllib.parse import urlparse
from collections import defaultdict
from clients.fusion import FusionClient
from clients.ddg import DDGClient
from clients.wikipedia import WikipediaClient
from clients.ruwikipedia import RuWikipediaClient
from clients.qwant import QWantClient


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

clients = {
    FusionClient.name: FusionClient(),
    DDGClient.name: DDGClient(),
    WikipediaClient.name: WikipediaClient(),
    RuWikipediaClient.name: RuWikipediaClient(),
    QWantClient.name: QWantClient(),
    # ...add more as you split them out
}

# --- API endpoints ---

@app.get("/api/clients")
async def get_clients():
    return [
        {
            "id": c.name,
            "name": c.display_name,
            "icon": getattr(c, "icon", "resources/service-icons/mini.png")
        }
        for c in clients.values()
    ]

@app.get("/api/search")
async def search(
    q: str = Query(..., description="Search query"),
    client: str = Query("dummy", description="Search client ID"),
):
    if client not in clients:
        return {"error": "Unknown client"}
    results = await clients[client].search(q)
    # Group results by domain
    web_results = defaultdict(list)
    for r in results:
        domain = urlparse(r["url"]).netloc or "example.com"
        web_results[domain].append(r)
    return {
        "specialBlocks": [],
        "webResults": web_results
    }

# --- Run with: uvicorn main:app --reload ---

app.mount("/", StaticFiles(directory=".", html=True), name="root")