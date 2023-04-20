import tkinter as tk
from tkinter import ttk
import requests
import json
import csv
import os
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
from f import fetch_url, 데이터정제

file_name = 'data.csv'

# 检查文件是否存在
file_exists = os.path.isfile(file_name)

# 如果文件不存在，则创建并写入表头
fieldnames = [
    '키워드',
    '딜',
    'pid',
    'cidpid',
    'cid',
    '딜개수',
    'pid개수',
    'cid개수',
]

if not file_exists:
    with open(file_name, mode='a', encoding='utf-8', newline='') as f:
        csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
        csv_writer.writeheader()
        
def on_confirm_click():
    content = text_area.get("1.0", tk.END)
    lines = content.splitlines()
    print("确认按钮被点击，文本区域内容按行分割后的数组：")
    print(lines)
    completed_tasks = 0
    progress_var.set(0)
    # 更新UI（确保进度条显示最新的进度）
    root.update_idletasks()
    with ThreadPoolExecutor(max_workers=3) as executor:
        for kwd in lines:
            url1 = 'https://wmp-search-admin.wonders.work/search?abTestKey=&abTestType=&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22modelNameShingles%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22,%22searchInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D,%7B%22section%22:%22officialPartner%22,%22sectionName%22:%22%EA%B3%B5%EC%8B%9D%ED%8C%8C%ED%8A%B8%EB%84%88%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&cmpAbTestKey=162&cmpAbTestType=A&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isTodayShip=N&isUseKeywordInfo=true&keyword='
            url2 = '&perPage=30&period=monthly&price=&review=&searchDest=TAB_MAIN&selectTab=main&sort=weight&testScript=&testTarget=&ueKeywordInfo=Y'
            wurl1 = url1 + kwd + '&os=android&page=1'+url2
            wurl2 = url1 + kwd + '&os=android&page=2'+url2
            wurl3 = url1 + kwd + '&os=android&page=3'+url2
            kwd_name = kwd
            kwd =  {
                '키워드':'',
                '딜': [],
                'pid':[],
                'cidpid':[],
                'cid':[],
                '딜개수':[],
                'pid개수':[],
                'cid개수':[],
                }
            futures = [executor.submit(fetch_url, url) for url in [wurl1, wurl2, wurl3]]
        
            rdata0 = json.loads(futures[0].result())
            rdata1 = json.loads(futures[1].result())
            rdata2 = json.loads(futures[2].result())

            rdata2 = rdata0['data']['deals'] + rdata1['data']['deals'] + rdata2['data']['deals']
            rdata = rdata2[:get_input_value()]
            
            딜,pid,cidpid,cid= 데이터정제(rdata)
            kwd['키워드'] = kwd_name
            kwd['딜'] = ' '.join(딜)
            kwd['pid'] = ' '.join(pid)
            kwd['cidpid'] = ' '.join(cidpid)
            kwd['cid'] = ' '.join(cid)
            kwd['딜개수'] = len(딜)
            kwd['pid개수'] = len(pid)
            kwd['cid개수'] = len(cidpid)

            with open(file_name, mode='a', encoding='utf-8', newline='') as f:
                csv_writer = csv.DictWriter(f, fieldnames=fieldnames)
                csv_writer.writerow(kwd)
            
            completed_tasks += 1
            # 计算任务完成百分比
            completed_percentage = (completed_tasks / len(lines)) * 100
            # 更新进度条
            progress_var.set(completed_percentage)
            # 更新UI（确保进度条显示最新的进度）
            root.update_idletasks()
                # 获取并发请求的结果
        

def on_download_click():
   print('')

# 创建主窗口
root = tk.Tk()
root.title("getid")

# 创建一个带滚动条的文本区域（textarea）
text_area = tk.Text(root, wrap=tk.WORD, width=40, height=10)
scrollbar = ttk.Scrollbar(root, command=text_area.yview)
text_area.config(yscrollcommand=scrollbar.set)

text_area.grid(row=0, column=0, padx=10, pady=10, sticky=tk.W+tk.E+tk.N+tk.S)
scrollbar.grid(row=0, column=1, padx=0, pady=10, sticky=tk.W+tk.E+tk.N+tk.S)

# 创建“确认”按钮
confirm_button = ttk.Button(root, text="确认", command=on_confirm_click)
confirm_button.grid(row=1, column=0, padx=10, pady=10, sticky=tk.W)

# 创建输入框说明文字
input_label = tk.Label(root, text="총상품수")
input_label.grid(row=1, column=0, padx=(0, 100), pady=10, sticky=tk.E)

input_var = tk.StringVar()
input_var.set('50')
input_entry = ttk.Entry(root, width=10, textvariable=input_var)  # 设置宽度为10，可根据需要调整
input_entry.grid(row=1, column=0, padx=10, pady=10, sticky=tk.E)

# 创建进度条和标签
progress_label = ttk.Label(root, text="下载进度:")
progress_label.grid(row=2, column=0, padx=10, pady=10, sticky=tk.W)

progress_var = tk.DoubleVar()
progress_bar = ttk.Progressbar(root, length=220, mode='determinate', variable=progress_var, maximum=100)
progress_bar.grid(row=2, column=0, padx=10, pady=10, sticky=tk.E)

# 在需要获取输入框值的地方
def get_input_value():
    get_length = int(input_var.get())
    print(get_length)
    return get_length


root.mainloop()