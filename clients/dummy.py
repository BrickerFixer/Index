from typing import List, Dict, Any

class DummyClient:
    name = "dummy"
    display_name = "Dummy"

    async def search(self, query: str) -> List[Dict[str, Any]]:
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