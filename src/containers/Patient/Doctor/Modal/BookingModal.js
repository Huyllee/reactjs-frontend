import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils';
import { Modal } from 'reactstrap';
import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { postPatientBookAppointmentService } from '../../../../services/userService'
import { toast } from "react-toastify";
import moment from 'moment';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phonenumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.fetchGenders();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
            if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
                let doctorId = this.props.dataScheduleTimeModal.doctorId;
                this.setState({
                    doctorId: doctorId,
                    timeType: this.props.dataScheduleTimeModal.timeType
                })
            }
        }
    }

    buildDataGender = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object);
            })

        }
        return result;
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let copyState = { ...this.state };
        copyState[id] = valueInput;
        this.setState({
            ...copyState
        })
    }

    handleOnChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    buildTimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = language === LANGUAGES.VI ?
                dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }

    buildDoctorName = (dataScheduleTimeModal) => {
        let { language } = this.props;
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let name = language === LANGUAGES.VI ?
                `${dataScheduleTimeModal.doctorData.lastName} &{dataScheduleTimeModal.doctorData.firstName}`
                :
                `${dataScheduleTimeModal.doctorData.firstName} &{dataScheduleTimeModal.doctorData.lastName}`
            return name
        }
        return ''
    }

    handleConfirmBooking = async () => {
        let date = new Date(this.state.birthday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
        let doctorName = this.buildTimeBooking(this.props.dataScheduleTimeModal);
        let res = await postPatientBookAppointmentService({
            fullName: this.state.fullName,
            phonenumber: this.state.phonenumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })
        if (res && res.errCode === 0) {
            toast.success("Booking a new appointment success!", {
                position: "top-right",
                autoClose: 2000,
            });
            this.props.closeBookingModal();
        } else {
            toast.error("Booking a new appointment error!", {
                position: "top-right",
                autoClose: 2000,
            });
        }
    }

    render() {
        let { isOpenModalBooking, closeBookingModal, dataScheduleTimeModal } = this.props;
        // let doctorId = '';
        // if (dataTime && !_.isEmpty(dataTime)) {
        //     doctorId = dataTime.doctorId;
        // }

        let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : '';
        return (
            <Modal
                isOpen={isOpenModalBooking}
                className={'booking-modal-container'}
                size='lg'
                centered >
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                        <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescription={false}
                                dataScheduleTimeModal={dataScheduleTimeModal} />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.fullname' /></label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phonenumber' /></label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.phonenumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phonenumber')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input
                                    className='form-control'
                                    type='text'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                <DatePicker
                                    className='form-control'
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.birthday}
                                // minDate={yesterday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handleOnChangeSelect}
                                    options={this.state.genders} />
                            </div>
                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button onClick={() => this.handleConfirmBooking()} className='btn-booking-confirm'>
                            <FormattedMessage id='patient.booking-modal.submit' />
                        </button>
                        <button onClick={closeBookingModal} className='btn-booking-cancel'>
                            <FormattedMessage id='patient.booking-modal.cancel' />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
        genders: state.admin.genders,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
