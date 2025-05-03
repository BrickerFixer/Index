from typing import List, Dict, Any
import httpx

class QwantClient:
    name = "qwant"
    display_name = "Qwant"
    icon = "https://www.qwant.com/favicon.ico"

    async def search(self, query: str) -> List[Dict[str, Any]]:
        url = "https://api.qwant.com/v3/search/web"
        params = {
            "q": query,
            "count": 10,
            "offset": 0,
            "device": "desktop",
            "safesearch": 1,
            "locale": "en_US",
            "uiv": 4
        }
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            data = resp.json()
            results = []
            for item in data.get("data", {}).get("result", {}).get("items", []):
                results.append({
                    "title": item.get("title", ""),
                    "url": item.get("url", ""),
                    "snippet": item.get("desc", "")
                })
            return results
