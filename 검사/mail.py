import requests
import hashlib
import time
import smtplib
from email.mime.text import MIMEText

# 配置电子邮件发送
SMTP_SERVER = "smtp.gmail.com"  # 使用 Gmail 服务器
SMTP_PORT = 587
SMTP_USER = "your_email@gmail.com"  # 替换为您的 Gmail 邮箱地址
SMTP_PASSWORD = "your_email_password"  # 替换为您的 Gmail 邮箱密码

def send_email(api_url, recipient):
    msg = MIMEText(f"API at {api_url} has changed.")
    msg["Subject"] = "API Change Detected"
    msg["From"] = SMTP_USER
    msg["To"] = recipient

    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASSWORD)
    server.sendmail(SMTP_USER, recipient, msg.as_string())
    server.quit()

def monitor_api(api_url, recipient, check_interval=30*60):
    last_hash = None

    while True:
        response = requests.get(api_url)
        content = response.text
        new_hash = hashlib.md5(content.encode('utf-8')).hexdigest()

        if last_hash is not None and new_hash != last_hash:
            print("API has changed. Sending email...")
            send_email(api_url, recipient)

        last_hash = new_hash
        time.sleep(check_interval)

if __name__ == "__main__":
    api_url = "https://wmp-search-admin.wonders.work/1.js"
    recipient = "anxh@weimeipu.cn"
    monitor_api(api_url, recipient)
