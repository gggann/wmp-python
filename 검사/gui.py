url1 = '=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22modelNameShingles%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22,%22searchInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D,%7B%22section%22:%22officialPartner%22,%22sectionName%22:%22%EA%B3%B5%EC%8B%9D%ED%8C%8C%ED%8A%B8%EB%84%88%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isTodayShip=N&isUseKeywordInfo=true&keyword='
url2 = '&os=android&page=1&perPage=30&period=monthly&price=&review=&searchDest=TAB_MAIN&selectTab=main&sort=weight&testScript=&testTarget=&ueKeywordInfo=Y'
import sys
import requests
from PyQt5.QtWidgets import QApplication, QWidget, QLineEdit, QPushButton, QLabel, QVBoxLayout
from get import get_an

class MainWindow(QWidget):

    def __init__(self):
        super().__init__()
        self.setWindowTitle('Concurrent Request Example')

        # 创建 GUI 元素
        self.keyword_input = QLineEdit()
        self.request_button = QPushButton('Request')
        self.result_label = QLabel('')

        # 布局 GUI 元素
        layout = QVBoxLayout()
        layout.addWidget(self.keyword_input)
        layout.addWidget(self.request_button)
        layout.addWidget(self.result_label)
        self.setLayout(layout)

        # 连接信号和槽
        self.request_button.clicked.connect(self.send_request)

    # def send_request(self):
    #     # 获取关键词并发送请求
    #     keyword = self.keyword_input.text()
    #     #urls = [f'https://api.example.com/search?q={keyword}&page={i}' for i in range(5)]
    #     urls = url1 + keyword + url2
    #     #responses = [requests.get(url) for url in urls]
    #     responses = [requests.get(urls)]
    #     print(response)
    #     # 解析响应数据
    #     data = []
    #     for response in responses:
    #         if response.status_code == 200:
    #             data.extend(response.json().get('data', []))
    def send_request(self):
        keyword = self.keyword_input.text()
        bb = get_an(keyword)
        print(bb)
        data = []
        for a in bb:
            data.extend(a)
       


if __name__ == '__main__':
    # 创建应用程序并显示窗口
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()

    # 运行应用程序的事件循环
    sys.exit(app.exec_())
