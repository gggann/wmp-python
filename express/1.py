import requests
import json
import os
import aiohttp
import asyncio
import re
from bs4 import BeautifulSoup

tt = "https://wmp-search-admin.wonders.work/search?abTestKey=&abTestType=&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22modelNameShingles%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22,%22searchInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D,%7B%22section%22:%22officialPartner%22,%22sectionName%22:%22%EA%B3%B5%EC%8B%9D%ED%8C%8C%ED%8A%B8%EB%84%88%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isTodayShip=N&isUseKeywordInfo=true&keyword="
aa = "&perPage=30&period=monthly&price=&review=&searchDest=TAB_MAIN&selectTab=main&sort=weight&testScript=&testTarget=&ueKeywordInfo=Y";    
cc ='D:/nginx-1.20.2/dist/wmpjs/savejson/'
a1 = "GV.set('initialData', JSON.parse('"

# async def deallist(vv):
#     async with aiohttp.ClientSession() as session:
#         async with session.get('https://front.wemakeprice.com/deal/' + str(vv["link"]["value"])) as res:
#             text = await res.text()
#             pattern = re.compile(r"GV\.set\('initialData',(.*?)GV\.set\('assistData'", re.DOTALL)
#             match = pattern.search(text)
#             if match:
#                 data = match.group(1).strip().replace("'));", "')").replace("')","").replace("JSON.parse('","")
#                 #data = match.group(1).strip().replace("'));", "')")
#                 data1 = json.loads(data)
#                 print(data1,type(data1))
                
# async def deallist2():
#     async with aiohttp.ClientSession() as session:
#         async with session.get('https://front.wemakeprice.com/deal/' + '628742464') as res:
#             text = await res.text()
#             pattern = re.compile(r"GV\.set\('initialData',(.*?)GV\.set\('assistData'", re.DOTALL)
#             match = pattern.search(text)
#             if match:
#                 data = match.group(1).strip().replace("'));", "')").replace("')","").replace("JSON.parse('","")
#                 #data = match.group(1).strip().replace("'));", "')")
#                 data = json.loads(data)
#                 print(data)


async def deallist(vv):
    async with aiohttp.ClientSession() as session:
        async with session.get('https://front.wemakeprice.com/deal/' + str(vv["link"]["value"])) as res:
            text = await res.text()
            soup = BeautifulSoup(text , 'html.parser')
            script_tag = soup.find('script', string=re.compile("GV.set\('initialData"))
            json_string = re.search(r"GV.set\('initialData', JSON.parse\('({.*?})'\)", script_tag.string).group(1)
            # 将JSON字符串解析为Python字典
            initial_data = json.loads(json_string)
            #print(initial_data)

# 输出initial_data的值

                
def getSubstring(a, b, c, d=False):
    if not a or a == "":
        return ""
    e = a.find(b)
    if e >= 0:
        f = a.find(c, e + len(b))
        g = a[e + len(b):f].strip()
        if d:
            g = re.sub(r'<[^<>]+>', '', g)
        return g
    return ""


async def 추천list(키워드, page):
    t = tt
    a = aa
    
    async with aiohttp.ClientSession() as session:
        async with session.get(t + 키워드 + "&os=android&page=" + str(page) + a) as response:
            if response.status == 200:
                res_data = await response.json()
                if 'data' in res_data and 'deals' in res_data['data']:
                    for i in res_data['data']['deals']:
                        if i['link']['type'] == 'DEAL' and i['link']['value'] == 628807062:
                            await deallist(i)

                with open(f"{cc}{키워드.replace(' ', '')}_m{page}.json", "w", encoding="utf-8") as file:
                    json.dump(res_data, file, ensure_ascii=False)

# Example usage
dealnumber = int(628742464)
async def main():
    #await deallist2()
    for i in range(1, 4):
        await 추천list("nike", i)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())