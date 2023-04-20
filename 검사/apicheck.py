# url = "https://wmp-search-admin.wonders.work/javascripts/search.js?ver=20211022"

import requests
import hashlib
import time
import csv
from datetime import datetime

def write_hash_to_csv(hash_value, timestamp, file_name="hash_history.csv"):
    with open(file_name, "a", newline="", encoding="utf-8") as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow([timestamp, hash_value])

def is_within_time_range(start_hour, end_hour):
    current_hour = datetime.now().hour
    return start_hour <= current_hour < end_hour

def monitor_file_changes(url, check_interval=600, start_hour=7, end_hour=17):
    current_hash = None

    while True:
        if is_within_time_range(start_hour, end_hour):
            try:
                response = requests.get(url)
                new_hash = hashlib.md5(response.content).hexdigest()
                timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

                if current_hash is not None and new_hash != current_hash:
                    print("API已变动")
                    break

                current_hash = new_hash
                print(f"{timestamp}: {new_hash}")
                write_hash_to_csv(new_hash, timestamp)

            except Exception as e:
                print(f"发生错误: {e}")

        time.sleep(check_interval)

if __name__ == "__main__":
    url = "https://wmp-search-admin.wonders.work/javascripts/search.js?ver=20211022"
    monitor_file_changes(url)
