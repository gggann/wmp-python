import tkinter as tk
from tkinter import filedialog, messagebox
import pandas as pd
import requests

root = tk.Tk()
root.title("下载和保存")

# 创建滚动条
scrollbar = tk.Scrollbar(root)
scrollbar.pack(side=tk.RIGHT, fill=tk.Y)

# 创建文本框
text = tk.Text(root, height=2, yscrollcommand=scrollbar.set)
text.pack(side=tk.TOP, fill=tk.BOTH)
scrollbar.config(command=text.yview)

# 创建对话框
def open_dialog():
    file_path = filedialog.askopenfilename()
    text.delete("1.0", tk.END) # 清空文本框
    text.insert(tk.END, file_path) # 将文件路径插入文本框

dialog_button = tk.Button(root, text="选择文件", command=open_dialog)
dialog_button.pack()

# 创建下载按钮
def download():
    url = "www.aaa.com/your-file.json"
    response = requests.get(url)
    if response.status_code == 200:
        with open("output.json", "wb") as f:
            f.write(response.content)
        messagebox.showinfo("下载成功", "文件已成功下载至 output.json")
    else:
        messagebox.showerror("下载失败", "文件下载失败")

download_button = tk.Button(root, text="下载", command=download)
download_button.pack()

# 创建保存按钮
def save():
    try:
        json_data = pd.read_json("output.json")
        excel_path = filedialog.asksaveasfilename(defaultextension=".xlsx")
        json_data.to_excel(excel_path, index=False)
        messagebox.showinfo("保存成功", "文件已成功保存至 {}".format(excel_path))
    except Exception as e:
        messagebox.showerror("保存失败", str(e))

save_button = tk.Button(root, text="保存", command=save)
save_button.pack()

root.mainloop()