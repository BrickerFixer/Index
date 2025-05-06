import os
import json

bg_dir = "resources/backgrounds/"
result = []

for root, dirs, files in os.walk(bg_dir):
    if "metadata.json" in files:
        meta_path = os.path.join(root, "metadata.json")
        try:
            with open(meta_path, encoding="utf-8") as f:
                data = json.load(f)
            kplugin = data.get("KPlugin", {})
            bg_name = kplugin.get("Name", "Unknown Background")
            authors = kplugin.get("Authors", [])
            author_names = [a.get("Name", "Unknown Author") for a in authors]
            author_str = ", ".join(author_names) if author_names else "Unknown Author"
            result.append(f'<li><strong>{bg_name}</strong> &mdash; {author_str}</li>')
        except Exception as e:
            print(f"Error reading {meta_path}: {e}")

print("<ul>")
for line in result:
    print(line)
print("</ul>")