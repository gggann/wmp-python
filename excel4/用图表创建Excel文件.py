# 创建一个新的XLSX工作簿
workbook = Workbook(FileFormatType.XLSX)
# 获取第一个工作表的参考
worksheets = workbook.getWorksheets()
sheet = worksheets.get(0)
# 将一些样本值添加到单元格
cells = sheet.getCells()
cell = cells.get("A1")
cell.setValue(50)
cell = cells.get("A2")
cell.setValue(100)
cell = cells.get("A3")
cell.setValue(150)
cell = cells.get("B1")
cell.setValue(4)
cell = cells.get("B2")
cell.setValue(20)
cell = cells.get("B3")
cell.setValue(50)
# 在工作表中获取图表
charts = sheet.getCharts()
# 将图表添加到工作表
chartIndex = charts.add(ChartType.PYRAMID, 5, 0, 15, 5)
chart = charts.get(chartIndex)
# 将NSeries（图表数据源）添加到图表中，范围从“ A1”单元格到“ B3”
serieses = chart.getNSeries()
serieses.add("A1:B3", True)
# 写入Excel文件 
workbook.save("workbook_with_chart.xlsx")