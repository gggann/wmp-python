import requests


def fetch_url(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        return f"请求失败，状态码：{response.status_code}"
    

def changstr(aaa):
    str_aaa = [str(x) for x in aaa]
    print(str_aaa)
    #result = ' '.join(str_aaa)
    if(str_aaa == []):
        return 'N'
    else:
      return str_aaa


def 데이터정제(all_response):
    deals = []
    prods = []
    cidpid = []
    cid = []
            #   else if (alldeals[i].link.type == 'PROD' && alldeals[i].administrator.product.catalogNo == null) {
            #     prods.push(alldeals[i].link.value)
            # } else if (alldeals[i].administrator.product.catalogNo) {
            #     cids.push(alldeals[i].administrator.product.catalogNo)
            #     cids_아이디.push(alldeals[i].link.value)
    for deal in all_response:
        if deal['link']['type'] == 'DEAL':
            deals.append(deal['link']['value'])
        elif deal['link']['type'] == 'PROD' and deal['administrator']['product']['catalogNo'] is None:
            prods.append(deal['link']['value'])
        elif deal['administrator']['product']['catalogNo']:
            cidpid.append(deal['link']['value'])
            cid.append(deal['administrator']['product']['catalogNo'])
   # print(deals,len(deals))
   
    return changstr(deals),changstr(prods),changstr(cidpid),changstr(cid)
   # return deals,prods,cidpid,cid

   