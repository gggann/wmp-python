import fs from 'fs'
import axios from 'axios'
import request from 'request'
import path from 'path'
import https from 'https'


function toimg(url) {
    https.get(url, function (res) {
        var chunks = [];
        var size = 0;
        res.on('data', function (chunk) {
            chunks.push(chunk);
            size += chunk.length; //累加缓冲数据的长度
        });
        res.on('end', function (err) {
            var data = Buffer.concat(chunks, size);
            var base64Img = data.toString('base64');
            console.log(`data:image/png;base64,${base64Img}`);
        });
    });
}

axios.interceptors.response.use(
    function (response) {
        // 对响应数据进行操作

        if (response.status != 404) {
            //  console.log('有图片资源', response.config.url)
            return response
        }
        //  else {
        //      return response.config.url
        // }

    },
    function (error) {
        // 对响应错误进行操作
        // return Promise.reject(error);
        console.log('没有图片资源')
        return 404
    }
);
async function save_img(a) {
    let adate = (a.largeImgUrl) ? {
        method: 'get',
        url: a.originImgUrl,
        //url: a.mediumImgUrl,
        responseType: 'stream'
    } : {
        method: 'get',
        url: a.mediumImgUrl,
        responseType: 'stream'
    }
    //console.log(adate)
    return await axios(adate)
        .then(function (res) {
            if (res.status !== 200) {
                //  console.log('res.status',res.status)
                return
            } //.searchInfo.searchKeyword
            res.data.pipe(fs.createWriteStream(`D://nginx-1.20.2/dist/wmpjs/images/${a.link.value}.jpg`))
            //return '/wmpjs/images/' + a.link.value + '.jpg'
        })
}
// //save_img('https://view01.wemep.co.kr/wmp-product/9/669/2299906699/2299906699_large.jpg?1666768261','11')
// let img_x =  'https://view01.wemep.co.kr/wmp-product/6/912/2293289126/2293289126_large.jpg?1666927163'
// let img_g = 'https://view01.wemep.co.kr/wmp-product/9/669/2299906699/2299906699_large.jpg?1666768261'



export {
    save_img
}