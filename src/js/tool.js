import {api} from '../common/app';
import sharicon from "../img/sharicon.png";

const tool = {
    audioAutoPlay(id,vplay=1){
        if (vplay) {     //播放
            var audio = document.getElementById(id);
            audio.play();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.currentTime = 0.0;
                audio.play();
                console.log('play'+id);
            }, false);
            document.addEventListener('YixinJSBridgeReady', function() {
                audio.currentTime = 0.0;;
                audio.play();
                console.log('play'+id);
            }, false);
        }else {     //注册声音
            var audio = document.getElementById(id);
            audio.play();
            audio.pause();
            document.addEventListener("WeixinJSBridgeReady", function () {
                audio.play();
                audio.pause();
                console.log('play'+id);
            }, false);
            document.addEventListener('YixinJSBridgeReady', function() {
                audio.play();
                audio.pause();
                console.log('play'+id);
            }, false);
        }
    
    },
    getShare(url){
        let share_url = location.href;
        let share_img = 'http://client.rup-china.com/aslkqixi20180808/static/img/' + sharicon.split('/')[2];

        let share_title = '这个七夕和你谈一场走心走胃的恋爱';
        let share_content = '爱“胃”七夕';
        api.getShare(url).then((response) => {
            console.log(response)
            if (response.code==200) {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: response.data.appid, // 必填，公众号的唯一标识
                    timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: response.data.noncestr, // 必填，生成签名的随机串
                    signature: response.data.signature, // 必填，签名，见附录1
                    jsApiList: ['chooseImage', 'onMenuShareTimeline',
                        'onMenuShareAppMessage', 'previewImage', 'uploadImage',
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'hideMenuItems',
                        'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice',
                        'pauseVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice'
                    ]
                });
                wx.ready(function(){
                wx.onMenuShareAppMessage({
                            title: share_title, // 分享标题
                            desc: share_content, // 分享描述
                            link: share_url, // 分享链接
                            imgUrl: share_img, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                api.postShare().then((response) => {
                                    console.log(response);
                                },(err) => {
                                    console.log(err)
                                });
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
        
                    wx.onMenuShareTimeline({
                            title: share_title, // 分享标题
                            desc: share_content, // 分享描述
                            link: share_url, // 分享链接
                            imgUrl: share_img, // 分享图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success: function () {
                                // 用户确认分享后执行的回调函数
                                api.postShare().then((response) => {
                                    console.log(response);
                                },(err) => {
                                    console.log(err)
                                });
                            },
                            cancel: function () {
                                // 用户取消分享后执行的回调函数
                            }
                        });
                });
                wx.error(function(res){
                });
            }
          }, (err) => {
            console.log(err)
          })
        
    }
}

export default tool;