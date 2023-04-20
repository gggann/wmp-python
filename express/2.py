import requests
from bs4 import BeautifulSoup
import re
import json

url = 'https://front.wemakeprice.com/deal/628742464'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
scripts = soup.find_all('script')

for script in scripts:
    if 'GV.set' in script.text:
        pattern = r'GV\.set\(\'initialData\', (.+?)\);'
        match = re.search(pattern, script.text)
        if match:
            json_str = match.group(1).replace("'", "\"")
            data = json.loads(json_str)
            print(data)