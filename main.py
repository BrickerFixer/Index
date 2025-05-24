from fastapi import FastAPI, Query, Request
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
    supports_pagination: bool = False

    async def search(self, query: str, offset: int = 0, count: int = 10) -> List[Dict[str, Any]]:
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
            "icon": getattr(c, "icon", "resources/service-icons/mini.png"),
            "supports_pagination": getattr(c, "supports_pagination", False),
            "supported_parameters": getattr(c, 'supported_parameters', [])
        }
        for c in clients.values()
    ]

@app.get("/api/search")
async def search(
    request: Request,
    q: str = Query(..., description="Search query"),
    client: str = Query("dummy", description="Search client ID"),
    page: int = Query(1, description="Page number", ge=1),
    count: int = Query(10, description="Results per page", ge=1, le=50),
):
    if client not in clients:
        return {"error": "Unknown client"}
    c = clients[client]
    # Collect all query params for client-specific routing
    extra_params = {}
    for k, v in request.query_params.items():
        if k not in ["q", "client", "page", "count"]:
            # Always get the raw value (not parsed as int)
            extra_params[k] = v
    print(f"[main.py] Forwarding extra_params to client: {extra_params}")
    print(f"[main.py] All query_params: {dict(request.query_params)}")
    # Only use pagination if supported
    if getattr(c, "supports_pagination", False):
        result_obj = await c.search(q, page=page, count=count, **extra_params)
        results = result_obj.results
        pagination = getattr(result_obj, 'pagination', None)
    else:
        results = await c.search(q, **extra_params)
        pagination = None
    # Group results by domain
    web_results = defaultdict(list)
    for r in results:
        domain = urlparse(r["url"]).netloc or "example.com"
        web_results[domain].append(r)
    return {
        "specialBlocks": [],
        "webResults": web_results,
        "page": page,
        "count": count,
        "supports_pagination": getattr(c, "supports_pagination", False),
        "pagination": pagination
    }

# --- Run with: uvicorn main:app --reload ---

app.mount("/", StaticFiles(directory=".", html=True), name="root")