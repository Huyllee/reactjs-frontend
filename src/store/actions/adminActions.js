import actionTypes from './actionTypes';
import { getAllCodeService, createNewUser, getAllUsers, deleteUser, editUser, getTopDoctorService, getAllDoctorsService, saveDoctorInforService, getAllSpecialtyService } from '../../services/userService';
import { toast } from "react-toastify"

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_DENDER_START
// })

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_DENDER_START
            })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailded());
            }
        } catch (e) {
            dispatch(fetchGenderFailded());
            console.log('fetchGenderStart error: ', e);
        }
    }

}

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailded());
            }
        } catch (e) {
            dispatch(fetchRoleFailded());
            console.log('fetchRoleStart error: ', e);
        }
    }

}


export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailded());
            }
        } catch (e) {
            dispatch(fetchPositionFailded());
            console.log('fetchPositionStart error: ', e);
        }
    }

}

export const createNewUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                toast.success("Create a new user success!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(fetchAllUsersRedux());
            } else {
                dispatch(saveUserFailded());
            }
        } catch (e) {
            dispatch(saveUserFailded());
            console.log('saveUserFailded error: ', e);
        }
    }
}

export const editUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUser(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                toast.success("Update a user success!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(fetchAllUsersRedux());
            } else {
                dispatch(editUserFailded());
            }
        } catch (e) {
            dispatch(editUserFailded());
            console.log('editUserFailded error: ', e);
        }
    }
}

export const deleteUserRedux = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                toast.success("Delete a new user success!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                dispatch(fetchAllUsersRedux());
            } else {
                dispatch(deleteUserFailded());
                toast.error("Delete a new user error!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (e) {
            dispatch(deleteUserFailded());
            toast.error("Delete a new user error!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
}


export const fetchAllUsersRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailded());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailded());
            console.log('fetchAllUsersFailded error: ', e);
        }
    }
}

export const fetchTopDoctorsRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorService('');
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data));
            } else {
                dispatch(fetchTopDoctorsFailded());
            }
        } catch (e) {
            dispatch(fetchTopDoctorsFailded());
            console.log('fetchTopDoctorsFailded error: ', e);
        }
    }
}

export const fetchAllDoctorsRedux = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorsService();
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorsSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorsFailded());
            }
        } catch (e) {
            dispatch(fetchAllDoctorsFailded());
            console.log('fetchAllDoctorsFailded error: ', e);
        }
    }
}

export const saveDoctorInforRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDoctorInforService(data);
            if (res && res.errCode === 0) {
                dispatch(saveDoctorInforSuccess());
                toast.success("Create a doctor infor success!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                dispatch(saveDoctorInforFailded());
                toast.error("Create a doctor infor error!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (e) {
            dispatch(saveDoctorInforFailded());
            console.log('saveDoctorInforFailded error: ', e);
        }
    }
}

export const fetchAllcodeScheduleTimeRedux = (type) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch(fetchAllcodeScheduleTimeSuccess(res.data));
            } else {
                dispatch(fetchAllcodeScheduleTimeFailded());
            }
        } catch (e) {
            dispatch(fetchAllcodeScheduleTimeFailded());
            console.log('fetchAllcodeScheduleTimeFailded error: ', e);
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpecialtyService();

            if (resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 &&
                resSpecialty && resSpecialty.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailded());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailded());
            console.log('fetchRequiredDoctorInforFailded error: ', e);
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_DENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailded = () => ({
    type: actionTypes.FETCH_DENDER_FAILDED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailded = () => ({
    type: actionTypes.FETCH_POSITION_SUCCESS
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailded = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
})

export const saveUserFailded = () => ({
    type: actionTypes.CREATE_USER_FAILDED
})

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const deleteUserFailded = () => ({
    type: actionTypes.DELETE_USER_FAILDED
})

export const editUserFailded = () => ({
    type: actionTypes.EDIT_USER_FAILDED
})

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const fetchAllUsersFailded = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDED
})

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchTopDoctorsFailded = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILDED
})

export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctors: data
})

export const fetchAllDoctorsFailded = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAILDED
})

export const fetchAllDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    dataAllDoctors: data
})

export const saveDoctorInforFailded = () => ({
    type: actionTypes.CREATE_DOCTOR_INFOR_FAILDED
})

export const saveDoctorInforSuccess = () => ({
    type: actionTypes.CREATE_DOCTOR_INFOR_SUCCESS
})

export const fetchAllcodeScheduleTimeFailded = () => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED
})

export const fetchAllcodeScheduleTimeSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
    dataAllcodeSchedule: data
})

export const fetchRequiredDoctorInforFailded = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILDED
})

export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    dataDoctorInfor: data
})