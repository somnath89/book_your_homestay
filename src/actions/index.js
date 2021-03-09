export function setUserListings(payload)
{
    return {
    type:'USER_LISTINGS',
    payload:payload.Items
    }
}
export function showLoading(isloading)
{
    return {
    type:'SHOW_LOADING',
    payload:isloading
    }
}
export function search(payload)
{
    return {
    type:'SEARCH_RESULTS',
    payload:payload.Items
    }
}
export function addStudent(student)
{
    return {
    type:'ADD_STUDENT',
    payload:student
    }
}

export function deleteStudent(Id)
{
    return {
    type:'DELETE_STUDENT',
    payload:Id
    }
}

export function updateStudent(student)
{
    return {
        type:'UPDATE_STUDENT',
        payload:student
        }

}