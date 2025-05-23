from typing import List, Dict, Any
import httpx
from datetime import datetime, timedelta
from types import SimpleNamespace

class QWantClient:
    name = "qwant"
    display_name = "QWant"
    icon = "https://www.qwant.com/favicon.ico"
    supports_pagination = True

    def get_pagination(self, offset: int, count: int, total: int = None) -> dict:
        # Qwant does not return total, so we can only infer if there MIGHT be a next page
        prev = offset > 0
        # If we got a full page, there might be a next page
        next_ = True  # Always show next if count results returned (handled in frontend)
        return {
            'prev': prev,
            'next': next_,
            'offset': offset,
            'count': count
        }

    async def search(self, query: str, page: int = 1, count: int = 10) -> Any:
        offset = (page - 1) * count
        url = "https://api.qwant.com/v3/search/web"
        params = {
            "q": query,
            "count": count,
            "offset": offset,
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
            return SimpleNamespace(results=results, pagination=self.get_pagination(offset, count))
        # Parse Qwant API response (adapted from searx)

        search_results = data
        data = search_results.get('data', {})
        if search_results.get('status') != 'success':
            results.append({'title': "Nothing found", 'url': "#", 'snippet': "Nothing was found, probably the QWant API banned us?"})
            return SimpleNamespace(results=results, pagination=self.get_pagination(offset, count))
        mainline = data.get('result', {}).get('items', {}).get('mainline', [])
        if not mainline:
            results.append({'title': "Nothing found", 'url': "#", 'snippet': "Nothing was found, probably the QWant API banned us?"})
            return SimpleNamespace(results=results, pagination=self.get_pagination(offset, count))
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
        # At the end, attach pagination info as an attribute
        pagination = self.get_pagination(offset, count)
        return SimpleNamespace(results=results, pagination=pagination)
