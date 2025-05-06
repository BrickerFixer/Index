from typing import List, Dict, Any
import httpx

class WikipediaClient:
    name = "wikipedia"
    display_name = "Wikipedia"
    icon = "https://en.wikipedia.org/static/favicon/wikipedia.ico"

    async def search(self, query: str) -> List[Dict[str, Any]]:
        url = "https://en.wikipedia.org/w/api.php"
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
                page_url = f"https://en.wikipedia.org/wiki/{title.replace(' ', '_')}"
                results.append({
                    "title": title,
                    "url": page_url,
                    "snippet": snippet
                })
            return results
