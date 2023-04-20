# 创建一个新的XLSX工作簿
wb = Workbook("workbook.xlsx")
# 在单元格中插入值
wb.getWorksheets().get(0).getCells().get("A1").putValue("Location")
wb.getWorksheets().get(0).getCells().get("B1").putValue("Person")
wb.getWorksheets().get(0).getCells().get("A2").putValue("Home")
wb.getWorksheets().get(0).getCells().get("B2").putValue("abc")
wb.getWorksheets().get(0).getCells().get("A3").putValue("Office")
wb.getWorksheets().get(0).getCells().get("B3").putValue("xyz")
# 将工作簿另存为.xlsx文件
wb.save("workbook-updated.xlsx")