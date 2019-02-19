
async function request(url, method, formData) {
    console.log('request: ' + url);
    try {
        let params = {
            method
        }
        if(formData) {
            params.body = formData;
        }
        let res = await fetch(url, params)
        try {
            let resData = await res.json();
            console.log(resData);
            return resData;
        }
        catch(error){
            console.log(error)
            global.toast.show('哎呀，服务器好像出错了');
        }

    } catch (error) {
        console.log(error)
        global.toast.show('哎呀，网络出错了');
    }
}
async function getSpreadLink(formData) {
    console.log('request buy');
    try {
        let res = await fetch('http://www.blyl1888.com/index.php/Api/Index/getUrl', {
            method: 'POST',
            body: formData,
        })
        let resData = await res.json();
        return resData;
    } catch (error) {
        console.error(error);
    }
}

export default {request};
