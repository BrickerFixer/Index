from typing import List, Dict, Any
import httpx

class RuWikipediaClient:
    name = "wikipedia-ru"
    display_name = "Wikipedia RU"
    icon = "https://ru.wikipedia.org/static/favicon/wikipedia.ico"
    supports_pagination = False

    # Supported filter parameters for frontend
    supported_parameters = []

    async def search(self, query: str) -> List[Dict[str, Any]]:
        url = "https://ru.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "list": "search",
            "srsearch": query,
            "format": "json",
            "utf8": 1,
            "srlimit": 100
        }
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
            results = []
            for item in data.get("query", {}).get("search", []):
                title = item.get("title", "")
                snippet = item.get("snippet", "").replace('<span class="searchmatch">', '').replace('</span>', '')
                page_url = f"https://ru.wikipedia.org/wiki/{title.replace(' ', '_')}"
                results.append({
                    "title": title,
                    "url": page_url,
                    "snippet": snippet
                })
            return results
