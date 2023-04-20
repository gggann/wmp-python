# 创建一个新的XLSX工作簿
workbook = Workbook(FileFormatType.XLSX)
worksheet = workbook.getWorksheets().get(0)
# 将字符串值插入单元格
worksheet.getCells().get("C2").setValue("Image")
# 设置第四行高度
worksheet.getCells().setRowHeight(3, 150)
# 设置C列的宽度
worksheet.getCells().setColumnWidth(3,50)
# 向D4单元格添加图片
index = worksheet.getPictures().add(3, 3, "aspose-cells-for-python.png")
# 获取图片对象
pic = worksheet.getPictures().get(index)
# 保存Excel文件
workbook.save("workbook_with_image.xlsx")