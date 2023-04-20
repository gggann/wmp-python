import fs from 'fs'
import axios from 'axios'
import cheerio from 'cheerio'
import superagent from 'superagent'
import request from 'request'
import { save_img } from './img.js'
function getSubstring(a, b, c, d) {
    var e, f, g;
    return void 0 == a || null == a || "" == a ? "" : (e = a.indexOf(b), e >= 0 ? (f = a.indexOf(c, e + b.length), g = a.substring(e + b.length, f), d && (g = g.replace(/<[^<>]+>/g, "")), g.trim()) : "")
}



async function all_list_추천(kwd_arry) {
    for (let i = 0; i < kwd_arry.length; i++) {

       await axios.all([추천list(kwd_arry[i], 1), await 추천list(kwd_arry[i], 2),await 추천list(kwd_arry[i], 3)])
       console.log(kwd_arry[i])
    }
}


async function 추천list(키워드, page) {
    let t = "https://wmp-search-admin.wonders.work/search?abTestKey=&abTestType=&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22modelNameShingles%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22,%22searchInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D,%7B%22section%22:%22officialPartner%22,%22sectionName%22:%22%EA%B3%B5%EC%8B%9D%ED%8C%8C%ED%8A%B8%EB%84%88%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isTodayShip=N&isUseKeywordInfo=true&keyword="
    let a = "&perPage=30&period=monthly&price=&review=&searchDest=TAB_MAIN&selectTab=main&sort=weight&testScript=&testTarget=&ueKeywordInfo=Y";    
    await axios.get(t + encodeURIComponent(키워드) + "&os=android&page=" + page + a)
        .then(async(res) => {
         
            if(res.data?.data?.deals){
                for (let i of res.data.data.deals) {
                   // i.mediumImgUrl=await save_img(i)  //这个太慢了
                    save_img(i)

                   // console.log(i.link.value)
                    if (i.link.type == 'DEAL') {
                        await deallist(i)
                    }
                }
        }

            fs.writeFileSync("D://nginx-1.20.2/dist/wmpjs/savejson/" + 키워드.replace(/ /g, '') + "_m" + page + ".json", JSON.stringify(res.data), function (err) {
                if (err) {
                    return console.log(err);
                }
               // console.log(키워드,"File saved successfully!");
            });
        })
}





async function deallist(vv) {

    await axios
        .get('https://front.wemakeprice.com/deal/' + vv.link.value)
        .then(res => {
            let abb = `GV.set('initialData', `
            let abc = `GV.set('assistData'`
            let checkdealtype = eval(getSubstring(res.data, abb, abc).replace(`'));`, `')`))

            if (checkdealtype.prodSimpleList) {
                vv.list = checkdealtype.prodSimpleList
                // console.log(checkdealtype.prodSimpleList)
            } else if (checkdealtype.dealProdGroups.groups) {
                vv.list = checkdealtype.dealProdGroups.groups
                //console.log(checkdealtype.dealProdGroups.groups)
            }
        })
        .catch(function (error) { // 请求失败处理
            //console.log(error);
        });

}





export {
    getSubstring, //딜리스트에 필요한 함수
    deallist, //딜리스트
    특가, //superagent
    가격, //superagent
    a특가, //axios
    a가격, //axios
    all, //批量get
    all_list1,
    all_list2,
    all_list_추천,
}