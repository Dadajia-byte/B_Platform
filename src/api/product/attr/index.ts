// 属性相关API文件
import request from '@/utils/request';
import type { Attr, categoryResponseData } from './type';
import { AnyColumn } from 'element-plus/es/components/table-v2/src/common.mjs';
enum API {
    C1_URL = "/admin/product/getCategory1",
    C2_URL = "/admin/product/getCategory2/",
    C3_URL = "/admin/product/getCategory3/",

    // 获取已有分类下的属性值与属性
    ATTR_URL = "/admin/product/attrInfoList/",

    // 添加或修改已有属性
    ADDORUPDATEATTR_URL = "/admin/product/saveAttrInfo",

    // 删除某一个属性
    DELETEATTR_URL = "/admin/product/deleteAttr/"
}

export const reqC1 = () => request.get<any, categoryResponseData>(API.C1_URL)
export const reqC2 = (category1: number | string) => request.get<any, categoryResponseData>(API.C2_URL + category1)
export const reqC3 = (category2: number | string) => request.get<any, categoryResponseData>(API.C3_URL + '/' + category2)

// 获取已有分类下的属性与属性值接口
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, any>(API.ATTR_URL + category1Id + '/' + category2Id + '/' + category3Id)

// 新增或者修改已有属性值
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)

// 删除某一个已有属性
export const reqDeleteAttr = (attrId: number | string) => request.delete<any, any>(API.DELETEATTR_URL + attrId)