from typing import List, Dict, Any
import asyncio
from clients.dummy import DummyClient
from clients.ddg import DDGClient
from clients.wikipedia import WikipediaClient
from clients.ruwikipedia import RuWikipediaClient
from clients.qwant import QWantClient

class FusionClient:
    name = "fusion"
    display_name = "Fusion"
    icon = "resources/service-icons/mini.png"

    async def search(self, query: str) -> List[Dict[str, Any]]:
        # List of client instances to combine
        client_classes = [DDGClient, WikipediaClient, RuWikipediaClient, QWantClient]
        clients = [c() for c in client_classes]
        # Run all searches concurrently
        async def run_client(client):
            try:
                return await client.search(query)
            except Exception as e:
                return [{
                    "title": f"{getattr(client, 'display_name', getattr(client, 'name', 'Client'))} error",
                    "url": "#",
                    "snippet": str(e)
                }]
        results_lists = await asyncio.gather(*(run_client(c) for c in clients))
        # Flatten and tag results with their source
        results = []
        for client, reslist in zip(clients, results_lists):
            for r in reslist:
                r = dict(r)  # copy
                r["source"] = getattr(client, "display_name", getattr(client, "name", "client"))
                results.append(r)
        return results
