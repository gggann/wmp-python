import schedule
import time
import requests
import hashlib

def get_file_hash(url):
    response = requests.get(url)
    file_content = response.content
    file_hash = hashlib.sha256(file_content).hexdigest()
    return file_hash

def check_api_changes():
    url = "https://wmp-search-admin.wonders.work/javascripts/search.js?ver=20211022"
    current_hash = get_file_hash(url)
    
    # 将哈希值存储到一个文件中，以便在下次运行时进行比较
    try:
        with open("previous_hash.txt", "r") as file:
            previous_hash = file.read().strip()
    except FileNotFoundError:
        previous_hash = None

    if previous_hash == current_hash:
        print("API没有变动")
    else:
        print("API发生了变动")
        with open("previous_hash.txt", "w") as file:
            file.write(current_hash)

# 每天7点半执行 check_api_changes 函数
#schedule.every().day.at("07:30").do(check_api_changes)
schedule.every(1).minutes.do(check_api_changes)

while True:
    schedule.run_pending()
    time.sleep(60)  # 每分钟检查一次
