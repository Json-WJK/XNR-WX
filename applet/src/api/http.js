
import Fly from 'flyio'
import Ext from './ext'

const getExtJson = () => new Ext()
const REQ = new Fly()

// 配置超时时间
REQ.config.timeout = 5000;

// 配置请求的基地址
REQ.config.baseURL = getExtJson().api_host
  
// 配置请求头
REQ.config.headers = {
    'content-type': 'application/json'
}

export default REQ
