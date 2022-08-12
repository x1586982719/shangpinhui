export const getToken=()=>{ 
    return localStorage.getItem('TOKEN')
}
export const clearToken=()=>{
    return localStorage.removeItem('TOKEN')
}
export const setToken=(token)=>{
    return localStorage.setItem('TOKEN',token)
}