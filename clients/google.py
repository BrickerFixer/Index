from typing import List, Dict, Any
import httpx

class GoogleClient:
    name = "google"
    display_name = "Google"
    icon = "https://www.google.com/favicon.ico"  # Use the correct icon path

    async def search(self, query: str) -> List[Dict[str, Any]]:
        # Example: Use a public Whoogle instance as a proxy for Google search
        # You can self-host Whoogle or use a public instance (beware of rate limits)
        url = "https://whoogle.4040940.xyz/search"
        params = {"q": query, "hl": "en"}
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, params=params)
            resp.raise_for_status()
            # Whoogle returns HTML, so you need to parse it
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(resp.text, "html.parser")
            results = []
            for result in soup.select('.result'):  # Whoogle uses .result for each entry
                title_tag = result.select_one('a.result__title')
                snippet_tag = result.select_one('.result__snippet')
                if title_tag and snippet_tag:
                    results.append({
                        "title": title_tag.get_text(strip=True),
                        "url": title_tag['href'],
                        "snippet": snippet_tag.get_text(strip=True),
                    })
            return results
