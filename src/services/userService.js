import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUser = (data) => {
    return axios.post('/api/create-user', data)
}

const deleteUser = (userId) => {
    // return axios.delete('/api/delete-user', { id: userId })
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}

const editUser = (inputData) => {
    return axios.put('/api/edit-user', inputData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/get-allcodes?type=${inputType}`)
}

const getTopDoctorService = (limit) => {
    return axios.get(`/api/get-top-doctor?limit=${limit}`);
}

const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDoctorInforService = (data) => {
    return axios.post(`/api/post-infor-doctor`, data);
}

const getDetailInforDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
}

const saveBulkCreateScheduleService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}

const getScheduleDoctorByDateService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getExtraProfileDoctorByIdService = (doctorId) => {
    return axios.get(`/api/get-extra-profile-doctor-by-id?doctorId=${doctorId}`);
}

const postPatientBookAppointmentService = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}

const postVerifyBookAppointmentService = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
}

const createNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}

const getAllSpecialtyService = () => {
    return axios.get(`/api/get-specialty`);
}

const getDetailSpecialtyDoctorByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createNewClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}

const getAllClinicService = () => {
    return axios.get(`/api/get-clinic`);
}

const getDetailClinicDoctorByIdService = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}

const getAllPatientForDoctorService = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`);
}

const sendRemedyService = (data) => {
    return axios.post(`/api/send-remedy`, data);
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUser,
    deleteUser,
    editUser,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorsService,
    saveDoctorInforService,
    getDetailInforDoctorService,
    saveBulkCreateScheduleService,
    getScheduleDoctorByDateService,
    getExtraInforDoctorByIdService,
    getExtraProfileDoctorByIdService,
    postPatientBookAppointmentService,
    postVerifyBookAppointmentService,
    createNewSpecialtyService,
    getAllSpecialtyService,
    getDetailSpecialtyDoctorByIdService,
    createNewClinicService,
    getAllClinicService,
    getDetailClinicDoctorByIdService,
    getAllPatientForDoctorService,
    sendRemedyService
}