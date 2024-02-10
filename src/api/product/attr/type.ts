// 分类相关数据的ts类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}

// 分类的ts类型
export interface categoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number
}

// 响应分类接口返回的数据类型
export interface categoryResponseData extends ResponseData {
    data: categoryObj[]
}

// 属性与属性值的ts类型
// 属性值对象的ts类型
export interface AttrValue {
    id?: number,
    valueName: string,
    attrId?: number,
    flag?: boolean
}

// 存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]

// 属性对象
export interface Attr {
    id?: number,
    attrName: string,
    categoryId: number | string,
    categoryLevel: number,
    attrValueList: AttrValueList
}

// 存储每个属性对象的数组ts类型
export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
    data: Attr[]
}