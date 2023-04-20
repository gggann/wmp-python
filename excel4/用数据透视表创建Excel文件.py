# 创建一个新的XLSX工作簿
workbook = Workbook(FileFormatType.XLSX)
# 获取新添加的工作表的参考
sheetIndex = workbook.getWorksheets().add()
sheet = workbook.getWorksheets().get(sheetIndex)
cells = sheet.getCells()

# 将值设置为单元格
cell = cells.get("A1")
cell.setValue("Sport")
cell = cells.get("B1")
cell.setValue("Quarter")
cell = cells.get("C1")
cell.setValue("Sales")

cell = cells.get("A2")
cell.setValue("Golf")
cell = cells.get("A3")
cell.setValue("Golf")
cell = cells.get("A4")
cell.setValue("Tennis")
cell = cells.get("A5")
cell.setValue("Tennis")
cell = cells.get("A6")
cell.setValue("Tennis")
cell = cells.get("A7")
cell.setValue("Tennis")
cell = cells.get("A8")
cell.setValue("Golf")

cell = cells.get("B2")
cell.setValue("Qtr3")
cell = cells.get("B3")
cell.setValue("Qtr4")
cell = cells.get("B4")
cell.setValue("Qtr3")
cell = cells.get("B5")
cell.setValue("Qtr4")
cell = cells.get("B6")
cell.setValue("Qtr3")
cell = cells.get("B7")
cell.setValue("Qtr4")
cell = cells.get("B8")
cell.setValue("Qtr3")

cell = cells.get("C2")
cell.setValue(1500)
cell = cells.get("C3")
cell.setValue(2000)
cell = cells.get("C4")
cell.setValue(600)
cell = cells.get("C5")
cell.setValue(1500)
cell = cells.get("C6")
cell.setValue(4070)
cell = cells.get("C7")
cell.setValue(5000)
cell = cells.get("C8")
cell.setValue(6430)

pivotTables = sheet.getPivotTables()
# 将数据透视表添加到工作表
index = pivotTables.add("=A1:C8", "E3", "PivotTable2")
# 访问新添加的数据透视表的实例
pivotTable = pivotTables.get(index)
# 未显示行的总计。
pivotTable.setRowGrand(False)
# 将第一个字段拖到行区域。
pivotTable.addFieldToArea(PivotFieldType.ROW, 0)
# 将第二个字段拖到列区域。
pivotTable.addFieldToArea(PivotFieldType.COLUMN, 1)
# 将第三个字段拖到数据区域。
pivotTable.addFieldToArea(PivotFieldType.DATA, 2)

# 写入Excel文件
workbook.save("workbook_with_pivot_table.xlsx")