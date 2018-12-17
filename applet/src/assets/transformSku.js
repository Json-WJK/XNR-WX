
export default class TransformSku {
    constructor(data){
        this.transform(data)
    }
    transform(data){
        let sku = {}
        let transformSku = {}
        let renderSku = []
        let len = 0
        
        if (data.isMultiSpec == 1) {    // 判断是否支持多规格
            data.props.forEach(element => {    // 处理sku为规格名为key的Object
                
                if (element.items){
                    sku[element.name] = {
                        names: element.items,
                        id: element.id
                    }
                }
            })
            
            for(let i in sku) {    // 遍历sku
                
                sku[i].names.forEach(element => {
                    
                    if (!transformSku[i]) transformSku[i] = {}
                    
                    transformSku[i][element] = []
                    
                    data.sku.forEach(eles => {
                        
                        eles.value.forEach(ele => {
                            
                            if (ele.prop_id == sku[i].id && ele.value == element) {
                                
                                let key
                                
                                if(data.props.length >= 2){    // 规格为 2 种
                                    key = eles.value.filter(item => {
                                        return item.prop_id != sku[i].id
                                    })[0].value
                                } else { // 规格为 1 种
                                    key = eles.value.filter(item => {
                                        return item.prop_id == sku[i].id
                                    })[0].value
                                }
                                
                                transformSku[i][element][key] = {
                                    name: key,
                                    market_price: eles.market_price,
                                    price: eles.price,
                                    stock: eles.stock,
                                    skucode: eles.skucode,
                                    icon: eles.img && eles.img[0]
                                }
                                
                            }

                        })

                    })
                })
            }
            
            for (let i in transformSku) {
                let obj = {
                    name: i,
                    item: []
                }
                for (let key in transformSku[i]) {
                    obj.item.push({
                        name: key,
                        status: true,
                        selected: false
                    })
                }
                len++
                renderSku.push(obj)
            }
            this.$renderSku = renderSku
            this.$transformSku = transformSku
            this.length = len
            return this
        }else {
            this.message = '不支持多规格'
            return this
        }
    }

    contrast(firstname, lastname){
        this.$renderSku.forEach(element => {
            if (element.name !== firstname) {
                for (let i in this.$transformSku[firstname][lastname]) {
                    let curx = this.$transformSku[firstname][lastname][i]
                    element.item.forEach(item => {
                        if (item.name == i) {
                            item.status = curx.stock > 0 ? true : false
                        }
                    })
                }
            }
        })
        return this.$renderSku
    }

    getSkuCode(val1, val2){
        if(val1 && val2){
            for(let i in this.$transformSku){
                if (this.$transformSku[i][val1]){
                    return this.$transformSku[i][val1][val2].skucode
                } else if (this.$transformSku[i][val2]){
                    return this.$transformSku[i][val2][val1].skucode
                }
            }
            return ''
        }else if(val1){
            for (let i in this.$transformSku) {
                if (this.$transformSku[i][val1][val1]) {
                    return this.$transformSku[i][val1][val1].skucode
                }
            }
            return ''
        }
        return ''
    }

    getPrice(val1, val2){
        if (val1 && val2) {
            for (let i in this.$transformSku) {
                if (this.$transformSku[i][val1]) {
                    return this.$transformSku[i][val1][val2].price
                } else if (this.$transformSku[i][val2]) {
                    return this.$transformSku[i][val2][val1].price
                }
            }
            return 0
        }else if(val1){
            for (let i in this.$transformSku) {
                if (this.$transformSku[i][val1][val1]) {
                    return this.$transformSku[i][val1][val1].price
                }
            }
            return 0
        }
        return 0
    }

    getStock(val1, val2){
        if (val1 && val2) {
            for (let i in this.$transformSku) {
                if (this.$transformSku[i][val1]) {
                    return this.$transformSku[i][val1][val2].stock
                } else if (this.$transformSku[i][val2]) {
                    return this.$transformSku[i][val2][val1].stock
                }
            }
            return 0
        }else if(val1){
            for (let i in this.$transformSku) {
                if (this.$transformSku[i][val1][val1]) {
                    return this.$transformSku[i][val1][val1].stock
                }
            }
            return 0
        }
        return 0
    }

    getIcon(val1, val2){
        if (val1 && val2) {
            for (let i in this.$transformSku) {
                if (this.$transformSku[i][val1]) {
                    return this.$transformSku[i][val1][val2].icon
                } else if (this.$transformSku[i][val2]) {
                    return this.$transformSku[i][val2][val1].icon
                }
            }
            return ''
        }else if(val1){
            for (let i in this.$transformSku) {
                if (this.$transformSku[i][val1][val1]) {
                    return this.$transformSku[i][val1][val1].icon
                }
            }
            return ''
        }
        return ''
    }

}
