
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
export default {request};
