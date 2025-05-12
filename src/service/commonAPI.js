import axios from "axios";

const commonAPI = async(httpMethod,url,reqBody,reqheader)=>{
    
    const reqConfig ={
        method:httpMethod
        ,url,
        data:reqBody,
        headers:reqheader?reqheader:{"Content-Type":"application/json"}
    }
    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}

export default commonAPI

