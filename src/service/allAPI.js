import serverURL from "./serverURL";
import commonAPI from "./commonAPI";

//registerAPI called by Auth
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/register`,reqBody)
}

//loginAPI called by Auth
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/login`,reqBody)
}

//addPetAPI called by add by the admin
export const addPetAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/add-pet`,reqBody,reqHeader)
}

//getHomePetAPI called by add by home page when reloads
export const getHomePetAPI = async()=>{
    return await commonAPI("GET",`${serverURL}/home-pet`,{})
}

//getDashboardPetAPI called by add by dashboard page when reloads
export const getDashboardPetAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/dashboard-pet?search=${searchKey}`,{},reqHeader)
}

//removePetAPI called by delete button by dashboard page 
export const removePetAPI = async(id,reqHeader)=>{
    console.log("Calling delete API for ID:", id);
    return await commonAPI("DELETE",`${serverURL}/projects/${id}/remove`,{},reqHeader)
}

//requestPetAPI called 
export const requestPetAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${serverURL}/projects/${reqBody.petId}/request`,reqBody,reqHeader)
}

//editPetAPI called by edit by the admin
export const editPetAPI = async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${serverURL}/projects/${id}/edit`,reqBody,reqHeader)
}

// export const editPetAPI = async(id,reqBody,reqHeader)=>{
//     return await commonAPI("PUT",`${serverURL}/projects/${id}/edit`,reqBody,reqHeader)
// }

//getRequestPetAPI called by add by dashboard page when reloads
export const getRequestPetAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/request-pet?search=${searchKey}`,{},reqHeader)
}

//getProfilePetAPI when profile page when reloads
export const getProfilePetAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/profile-pet?search=${searchKey}`,{},reqHeader)
}

//removePetAPI called by delete button by dashboard page 
export const removeProfilePetAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${serverURL}/request-pet/${id}/remove`,{},reqHeader)
}

//editStatusAPI called by approve or reject button
export const editStatusAPI = async(id,reqBody)=>{
    return await commonAPI("PUT",`${serverURL}/request-pet/${id}/edit`,reqBody)
}


//addMessageAPI called by submit by the any user
export const addMessageAPI = async(reqBody)=>{
    return await commonAPI("POST",`${serverURL}/add-message`,reqBody)
}

//getMessageAPI called by adminmessage page when reloads
export const getMessageAPI = async(searchKey)=>{
    return await commonAPI("GET",`${serverURL}/get-message?search=${searchKey}`,{})
}

//editStatusMessageAPI called by approve or reject button in message page
export const editStatusMessageAPI = async(id,reqBody)=>{
    return await commonAPI("PUT",`${serverURL}/add-message/${id}/edit`,reqBody)
}

//getUserMessageAPI called by review page when reloads
export const getUserMessageAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${serverURL}/review`,{},reqHeader)
}



//approvePetRemoveAPI called when admin approves a pet
export const approvePetRemoveAPI = async(petName)=>{
    return await commonAPI("DELETE",`${serverURL}/projects-pet/remove?name=${petName}`,{})
}
