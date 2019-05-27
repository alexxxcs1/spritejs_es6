import qs from 'qs';
const demoPost = (ajaxinstance) => {
    const customer = {}
    customer.getShare = (url) => {
        return ajaxinstance.post('weixinauth/index.php/index/weixin/getshare',qs.stringify({
            url
        }));
      }
    customer.postShare = () => {
        return ajaxinstance.post('h5/index.php/index/Aslkqixi/share');
      }
      
    return customer
  }
  
  export default demoPost