// 封装本地存储数据与读取数据的方
export const SET_TOKEN = (token: string) => {
    localStorage.setItem('token', token)
}

export const GET_TOKEN = () => {
    return localStorage.getItem('token')
}