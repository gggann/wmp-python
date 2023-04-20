

var 외부cids = []
var 외부pids = []

function Command(v) {
    let oInput = document.createElement('textarea');
    oInput.innerHTML = v;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.style.display = 'none'
    document.body.removeChild(oInput);
}

var GET = $('<div id="GET" class="btn btn-outline-primary">当前页</div>');

var page3 = $('<div id="get_page3" class="btn btn-outline-primary">클릭</div>');
//var get_prod_id = $('<div id="get_prod_id" class="btn btn-outline-primary">pid복사</div>');
// var get_ctlgID = $('<div id="get_ctlgID" class="btn btn-outline-primary">cid복사</div>');
var get_cid3 = $('<div id="get_cid3" class="btn btn-outline-primary">cid 90개복사</div>');
var get_prod_id_page3 = $('<div id="get_prod_id_page3" class="btn btn-outline-primary">pid 90개복사</div>');

var page_start = $(`<input id="page_start" type="text" placeholder="시작" style="height:15px;width:22px;">`);
var page_end = $(`<input id="page_end" type="text" placeholder="끝" style="height:15px;width:22px;">`);
var page_count = $(`<input id="page_count" type="text" value="90" style="height:15px;width:33px;">`);

// var 상세보기 = $('<div id="상세보기" class="btn btn-outline-primary">상세보기</div>');
// var 기능1 = $('<div id="기능1" class="btn btn-outline-primary">기능1</div>');  

var 상세보기 = $('<div class="form-check form-switch"><input id="상세보기" class="form-check-input" type="checkbox" role="switch" value="cnn_local"><label class="form-check-label" for="상세보기">상세보기</label></div>');
var 기능1 = $('<div class="form-check form-switch"><input id="기능1" class="form-check-input" type="checkbox" role="switch" value="기능1"><label class="form-check-label" for="기능1">기능1</label></div>');  
var 기능2 = $('<div class="form-check form-switch"><input id="기능2" class="form-check-input" type="checkbox" role="switch" value="기능2"><label class="form-check-label" for="기능2">기능2</label></div>');  
var 메뉴 = $(`<div id="메뉴" class="dropdown">
<button class="btn dropdown-toggle btn-outline-primary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  메뉴
</button>
<ul class="dropdown-menu">
  <li><div class="form-check form-switch"><input id="상세보기" class="form-check-input" type="checkbox" role="switch" value="cnn_local"><label class="form-check-label" for="상세보기">상세정보 감추기</label></div></li>
  <li><div class="form-check form-switch"><input id="기능1" class="form-check-input" type="checkbox" role="switch" value="기능1"><label class="form-check-label" for="기능1">PROD 연두색표기</label></div></li>
  <li><div class="form-check form-switch"><input id="기능2" class="form-check-input" type="checkbox" role="switch" value="기능2"><label class="form-check-label" for="기능2">PROD 만    보기</label></div></li>
  <!--<li><div class="form-switch">위의 설정 저장됨, 딜명 클릭하면 ID복사, 카테고리 클릭하면 카테고리 복사 가능</div></li>-->
</ul>
</div>`)

$("body").append(GET);
$("body").append(page3);
//$("body").append(get_prod_id); //$("body").append(cateresult);
//$("body").append(get_ctlgID);
$("body").append(get_cid3);
$("body").append(get_prod_id_page3);

// $("body").append(page_start);
// $("body").append(page_end);
$("body").append(page_count);


// var vuecontent = $('<div id="vvv">vvvvv</div>');
// let vuebody = document.querySelector("#pattern > ul > search_result > div")
// $(vuebody).append(vuecontent)

// $("body").append(상세보기);
// $("body").append(기능1);
// $("body").append(기능2);
$("body").append(메뉴);

var copy_prod = $('<div id="pid_title">deal__<span id="pid_length"></span></div><div id="copy_prod" class="thispage border" style="color:rgb(83, 158, 173)"></div>');
//var copy_cid1 = $('<div id="cid_title">cid__<span id="cid_length"></span></div><div id="copy_cid" class="thispage border" style="color:rgb(83, 158, 173)"></div>');
var copy_prod3 = $('<div id="pid3_title">pid 90개__<span id="pid3_length"></span></div><div id="copy_prod3" style="color:rgb(83, 158, 173)"></div>');
var copy_cid3 = $('<div id="cid3_title">cid 90개__<span id="cid3_length"></span></div><div id="copy_cid3" style="color:rgb(83, 158, 173)"></div>');

$("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.has-border").append(copy_prod);
//$("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.has-border").append(copy_cid1);
$("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.has-border").append(copy_prod3);
$("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.has-border").append(copy_cid3);

function PROD만보기(){
    $('li[ng-repeat="deal in ctrl.result.data.deals track by $index"]').each(function (t) {
        t = $(this)
        let ctlg = $(this).find('td[ng-switch-when="CTLG"]')[0]
        let deals = $(this).find('.value.ng-binding.ng-scope')[0]
        document.querySelector("#기능2").checked ? 1:2
            if(deals?.textContent== "PROD" && ctlg==null){}
            else{
                document.querySelector("#기능2").checked ?$(t).hide():$(t).show()
            }
          })
}
function cateinfo() {
    $('li[ng-repeat="deal in ctrl.result.data.deals track by $index"]').each(function () {
        let t = $(this)
        let 상세정보 = t.find('.description')[0]
        let 히드 = t.find('.li-head.ng-binding')
       
        let 딜번호 = t.find('td[ng-switch="deal.administrator.product.isCatalogOnlyEp"]')[0].textContent.split('\n')[3].trim()
        let removep = t.find('.header.li-sub')
        let mcate = t.find($('span[ng-bind-html="deal.administrator.product.physicsCategoryIds.lcateNm | safeHtml"]'))[0]
        let cates = mcate.parentElement.textContent.split('\n')[0]
        let catediv = $('<span class="list_info_cate">' + cates + ' </span')
        removep.before(catediv)
        $(히드).html($(히드).html() + `<span style="color:red">${ 딜번호}</span>`)
    })
}
$(document).on("click", ".li-head.ng-binding", function () {
    let a = $(this)[0]
    let b = a.parentElement.parentElement.parentElement
    let c = $(b).find('td[ng-switch="deal.administrator.product.isCatalogOnlyEp"]')[0].textContent.split('\n')[3].trim()
    Command(c)
    return !1;
});
$(document).on("click", ".list_info_cate", function () { 
    let a = $(this)[0]
    Command($(a).text())
    return !1;
});
function PROD색칠하기() {
    $('li[ng-repeat="deal in ctrl.result.data.deals track by $index"]').each(function () {
        let t = $(this)
        let 타이틀 = t.find('.li-text')[0]
        let 딜타입 = t.find('.value.ng-binding.ng-scope')[0]

        // let 타이틀sub = t.find('.header.li-sub')[0]
        // $(타이틀sub).hide()

        if(딜타입 ?.textContent== "PROD"){
            $(타이틀).css('background-color')=='rgb(249, 249, 249)'? $(타이틀).css("background-color","#cbf3cd"):$(타이틀).css("background-color","rgb(249, 249, 249)")
        }
    })
}
// function gget_prod_id() {
//     document.querySelector("#copy_prod").innerHTML = ''
//     let check_deal_type = $('td[ng-switch-default]')
//     let aa = []
//     for (i of check_deal_type) {
//         if ($(i).text() == 'PROD') {
//             let Prod_id = $(i.parentElement.parentElement).find('.ng-binding.ng-scope')[1]
//             aa.push($(Prod_id).text().trim())
//         }
//     }
//     let d = aa.join('\n')

//     document.querySelector("#copy_prod").innerHTML = d
//     $("#pid_length").text(aa.length)

//     Command(d)
// }

function getCtlgID() {
    document.querySelector("#copy_cid").innerHTML = ''
    let ctlgall = document.getElementsByClassName('ui button small dark-blue ng-binding')
    let aa = []
    for (i of ctlgall) {
        aa.push(i.innerText.trim())
    }
    let d = aa.join('\n')
    document.querySelector("#copy_cid").innerHTML = d
    $("#cid_length").text(aa.length)

    d === "" ? 1 : Command(d)

}

function getCID3() {
    let aa = 외부cids
    let d = aa.join('\n')
    Command(d)
}

function getprod3() {
    let aa = 외부pids
    let d = aa.join('\n')
    Command(d)
}
function get_Attrs(){
    let r_value = ""
        $('span[ng-repeat="value in catalogAttrs.value"]').each(function (t) {
            let c = $(this).find('input')[0]
            if(c.checked == true){
              let arrts = $(this).text().trim()
              let arrts_value = filter_value[arrts]
              r_value += arrts_value + ','
            }
          })
        return r_value.slice(0, r_value.length - 1)
}
function get_brand() {
    let r = ""
    $('span[ng-repeat="brand in ctrl.resultFilter.brandFilter.value"]').each(function (t) {
        let c = $(this).find('input')[0]
        if(c.checked == true){
          let brand = $(this).text().trim()
          r += brand + ','
        }
      })
    return r.slice(0, r.length - 1)
}
var filter_value = {}
async function axios_filter(){
        let v = document.querySelector("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.sub > div.gsearch.ui.wrap-table.horizontal.mg-t-10 > search_option > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input").value
       // let t = /filter?abTestKey=84&abTestType=&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22modelNameShingles%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22,%22searchInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isTodayShip=N&isUseKeywordInfo=true&keyword=",
          let t ="/filter?abTestKey=84&abTestType=&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22modelNameShingles%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22,%22searchInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isTodayShip=N&isUseKeywordInfo=true&keyword="
       a = "&period=monthly&price=&review=&searchDest=TAB_MAIN&selectTab=main&sort=weight&testScript=&testTarget=&ueKeywordInfo=";
        await axios.get(t + encodeURIComponent(v) + "&os=android&page=1" + a).then((res)=>{
            //let a = res.data.data.catalogAttrsFilter
            for(let i of res.data.data.catalogAttrsFilter){
                for(let ii of i.value){
                filter_value[ii.name] = ii.type
              }
             }
        })
    
}
async function axios_prod() {
    document.querySelector("#copy_prod3").innerHTML = document.querySelector("#copy_cid3").innerHTML = '...loading'
    let 상품수 = document.querySelector("#page_count").value
    document.querySelector("#pid3_title").innerHTML = `상품수${상품수}개   pid 총__<span id="pid3_length"></span>` 
    document.querySelector("#cid3_title").innerHTML = `상품수${상품수}개   cid 총__<span id="cid3_length"></span>`
    $('#pid_title').text(`총상품 in 딜개수__`)
    let prods = []
    let cids = []
    let cids_아이디 = []
    let deals = []
    let alldeals = []
    
    let check_brand = get_brand()
    let check_Attrs = get_Attrs()
    let 카탈로그체크 = $('input[ng-model="ctrl.param.isCatalog"]')[0].checked

    let pagestart = 1
    let count = document.querySelector("#page_count").value
    let pageend = Math.ceil(count/30)+1
    // let pagevaluestart = pagevalue.split('-')[0]
    // let pagevalueend = pagevalue.split('-')[1]

    const e = document.querySelector("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.sub > div.gsearch.ui.wrap-table.horizontal.mg-t-10 > search_option > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input").value
    let t = "/search?abTestKey=84&abTestType=&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22modelNameShingles%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22,%22searchInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=" + check_brand + "&catalogAttrs="+ check_Attrs +"&departmentStore=&isCatalog="+ 카탈로그체크 +"&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isTodayShip=N&isUseKeywordInfo=true&keyword=",
    a="&perPage=30&period=monthly&price=&review=&searchDest=TAB_MAIN&selectTab=main&sort=weight&testScript=&testTarget=&ueKeywordInfo=Y"
   
        
    if (document.querySelector("#page_count").value == 90) {
        function i(v) {
            return axios.get(t + encodeURIComponent(v) + "&os=android&page=1" + a)
        }

        function o(v) {
            return axios.get(t + encodeURIComponent(v) + "&os=android&page=2" + a)
        }

        function n(v) {
            return axios.get(t + encodeURIComponent(v) + "&os=android&page=3" + a)
        }

        await axios.all([i(e), o(e), n(e)]).then(axios.spread((function (t, a, i) {
          alldeals = [...t.data.data.deals, ...a.data.data.deals, ...i.data.data.deals]
          console.log(alldeals)
        })));
    } else {
        // let pagestart = 1
        // let count = document.querySelector("#page_count").value
        // let pageend = Math.ceil(count/30)+1
        //let pageend = Number(document.querySelector("#page_end").value)+1
        for (let page = pagestart; page < pageend; page++) {
            await axios
                .get(t + encodeURIComponent(e) + "&os=android&page=" + page + a)
                .then(res => {
                  alldeals = [...alldeals, ...res.data.data.deals]
                })
        }
    }
        //console.log(alldeals)
        if(count >= alldeals.length) {count = alldeals.length}
        for (let i = 0; i < count;i++) {
            if(alldeals[i].link.type == 'DEAL'){
                  deals.push(alldeals[i].link.value)
            }
            else if (alldeals[i].link.type == 'PROD' && alldeals[i].administrator.product.catalogNo == null) {
                prods.push(alldeals[i].link.value)
            } else if (alldeals[i].administrator.product.catalogNo) {
                cids.push(alldeals[i].administrator.product.catalogNo)
                cids_아이디.push(alldeals[i].link.value)
            } 
        }
        let d = prods.join('\n')
        let dd = cids.join('\n')
        let dd2 = cids_아이디.join('\n')
        //console.log(cids)

        Command(prods)
        카탈로그체크?외부cids = cids:외부cids = cids_아이디
        외부pids = prods;
        $('#pid3_length').text(prods.length)
        $('#cid3_length').text(cids.length)
        $('#pid_title').text(`총상품${count} in 딜개수__`)
        $('#pid_title').text($('#pid_title').text()+deals.length)
        
        document.querySelector("#copy_prod3").innerHTML = d
        카탈로그체크?document.querySelector("#copy_cid3").innerHTML = dd:document.querySelector("#copy_cid3").innerHTML = dd2
}



function hotkey() {
    var a = window.event.keyCode;
}
document.onkeydown = hotkey;
//判断全局变量

$(document).ready(function () {

});



var 타임변수1
var 타임변수2

function watch3() {
    let t = document.querySelector("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.sub > div.gsearch.ui.wrap-table.horizontal.mg-t-10 > search_option > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > input").value
    if (!document.querySelector("body > div.modal.fade.in > div > div > div.modal-header > h3") && t !== '') {
        document.querySelector("#GET").click()
    }
}



var count = 0

function 타임() {

    function f1() {
        let a = document.querySelector("body > div.modal.fade") ?.style.display
        if (a == 'block' || a == undefined) {
            count = 1
            console.log('block', count)
        }
    }

    function f2() {
        let a = document.querySelector("body > div.modal.fade") ?.style.display
        if (a == 'none' && count == 1) {
            count = 0
            document.querySelector("#GET").click()
            clearInterval(t3)
            cateinfo()
            setTimeout(() => {
                if(document.querySelector("#기능1").checked){PROD색칠하기()}
                if(document.querySelector("#기능2").checked){PROD만보기()}
            }, 1000);
          
        }
    }
    t3 = setInterval(function () {
        f1(), f2()
    }, 100)
}

function 페이지3비우기() {
    $("#pid3_length").text('');
    $("#cid3_length").text('')
    document.querySelector("#copy_prod3").innerHTML = document.querySelector("#copy_cid3").innerHTML = ''
}

function hotkey() {
    var a = window.event.keyCode;
    if ((a == 13)) {
        타임()
        페이지3비우기()
        axios_filter()
    }
}

document.onkeydown = hotkey;

///
window.onload = function () {
    document.querySelector("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.has-border > h2").remove()
    document.querySelector("#top").remove()

    // document.querySelector("#GET").onclick = function () {
    //     document.querySelector("#get_prod_id").click()
    //     document.querySelector("#get_ctlgID").click()
    // }
    document.querySelector("#get_page3").onclick = async function () {
        await axios_prod()
    }
    setTimeout(() => {
        document.getElementsByClassName('ui button large orange')[0].onclick=function (){
            타임()
        }
    }, 2000);

    document.querySelector("#page_count").addEventListener('change',function() {
        let 상품수= document.querySelector("#page_count").value
        document.querySelector("#get_prod_id_page3").innerHTML = `pid ~ ${상품수}복사`
        document.querySelector("#get_cid3").innerHTML = `cid ~ ${상품수}복사`
    })

    // document.querySelector("#get_ctlgID").onclick = function () {
    //     getCtlgID()
    // }
    document.querySelector("#get_cid3").onclick = function () {
        getCID3()
    }
    // document.querySelector("#get_prod_id").onclick = function () {
    //     gget_prod_id() //get_prod_id_page3
    // }
    document.querySelector("#get_prod_id_page3").onclick = async function () {
        getprod3()
    }
    document.querySelector(".pagination").onclick = async function () {
        타임();
        $(".thispage")[0].innerHTML = $(".thispage")[1].innerHTML = ''
        $("#pid_length").text('');
        $("#cid_length").text('');
       
    }
    setTimeout(() => {
        document.querySelector("body > div.ng-scope > div.com.wrap-title > div.com.wrap-title.sub > div.gsearch.ui.wrap-table.horizontal.mg-t-10 > search_option > table > tbody > tr:nth-child(2) > td:nth-child(3)").onclick = function () {
            페이지3비우기()
            console.log('serach')
            타임();
            axios_filter()
        }
    }, 2000);
    //////// 버튼저장소
    localStorage.getItem('상세보기')?(document.querySelector("#상세보기").click(),document.body.style.setProperty('--detail', 'none')):console.log('상세보기 is false')
    localStorage.getItem('기능1')?document.querySelector("#기능1").click():console.log('기능1 is false')
    localStorage.getItem('기능2')?document.querySelector("#기능2").click():console.log('기능2 is false')

    document.querySelector("#상세보기").addEventListener('click', function () {
        document.querySelector("#상세보기").checked ? (localStorage.setItem('상세보기', 'true'),document.body.style.setProperty('--detail', 'none')): (localStorage.removeItem('상세보기'),document.body.style.setProperty('--detail', 'block'))
    })
    document.querySelector("#기능1").addEventListener('click', function () {
        document.querySelector("#기능1").checked ? (localStorage.setItem('기능1', 'true'),PROD색칠하기()) : (localStorage.removeItem('기능1'),PROD색칠하기())
    })
    document.querySelector("#기능2").addEventListener('click', function () {
        document.querySelector("#기능2").checked ? (localStorage.setItem('기능2', 'true'),PROD만보기()) : (localStorage.removeItem('기능2'),PROD만보기())
    })
    //////
}