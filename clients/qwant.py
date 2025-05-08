from typing import List, Dict, Any
import httpx
from datetime import datetime, timedelta

class QWantClient:
    name = "qwant"
    display_name = "QWant"
    icon = "https://www.qwant.com/favicon.ico"

    async def search(self, query: str) -> List[Dict[str, Any]]:
        url = "https://api.qwant.com/v3/search/web"
        params = {
            "q": query,
            "count": 10,
            "offset": 0,
            "locale": "en_US",
            "safesearch": 1,
            "device": "desktop",
            "uiv": 4,
            "tgp": 3,
            "llm": "false"
        }
        headers = {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            "Referer": "https://www.qwant.com/",
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "en-US,en;q=0.9"
        }
        results = []
        try:
            async with httpx.AsyncClient(timeout=8.0, headers=headers) as client:
                resp = await client.get(url, params=params)
                resp.raise_for_status()
                data = resp.json()
        except Exception as e:
            results.append({'title': "Internal API error", 'url': "#", 'snippet': str(e)})
            return results
        # Parse Qwant API response (adapted from searx)

        search_results = data
        data = search_results.get('data', {})
        if search_results.get('status') != 'success':
            results.append({'title': "Nothing found", 'url': "#", 'snippet': "Nothing was found, probably the QWant API banned us?"})
            return results
        mainline = data.get('result', {}).get('items', {}).get('mainline', [])
        if not mainline:
            results.append({'title': "Nothing found", 'url': "#", 'snippet': "Nothing was found, probably the QWant API banned us?"})
            return results
        for row in mainline:
            mainline_type = row.get('type', 'web')
            if mainline_type != 'web':
                continue
            if mainline_type == 'ads':
                continue
            mainline_items = row.get('items', [])
            for item in mainline_items:
                title = item.get('title', None)
                res_url = item.get('url', None)
                content = item.get('desc', '')
                results.append({
                    'title': title,
                    'url': res_url,
                    'snippet': content,
                })
        return results
