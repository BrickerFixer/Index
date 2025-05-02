from typing import List, Dict, Any
import httpx

class DDGClient:
    name = "ddg"
    display_name = "DuckDuckGo"

    async def search(self, query: str) -> List[Dict[str, Any]]:
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