# 创建一个新的XLSX工作簿
wb = Workbook(FileFormatType.XLSX)
# 在单元格中插入值
wb.getWorksheets().get(0).getCells().get("A1").putValue("Hello World!")
# 将工作簿另存为.xlsx文件
wb.save("workbook.xlsx")