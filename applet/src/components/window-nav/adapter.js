
const boundingClientRect = (selector) => {
    if(window){

    }else {
        return new Promise((resolve, reject) => {
            const query = wx.createSelectorQuery()
            query.select(selector).boundingClientRect(res => {
                resolve(res)
            }).exec()
        })
    }
}

export {
    boundingClientRect
}