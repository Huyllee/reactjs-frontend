import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import { Modal } from 'reactstrap';
import './ProfileDoctor.scss';
import { getExtraProfileDoctorByIdService } from '../../../services/userService'
import { NumericFormat } from 'react-number-format';
import _ from 'lodash';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            detailDoctor: data
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        // if (this.props.doctorId !== prevProps.doctorId) {
        //     this.getInforDoctor(this.props.doctorId);
        // }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getExtraProfileDoctorByIdService(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result;
    }

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ?
                dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return (
                <>
                    <div>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.sub-title' /></div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { language, isShowDesctiptionDoctor, dataScheduleTimeModal, isShowLinkDetail, isShowPrice, doctorId } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`
        }
        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div className='content-left' style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShowDesctiptionDoctor === true ?
                                <>
                                    {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                        <span>
                                            {detailDoctor.Markdown.description}
                                        </span>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataScheduleTimeModal)}
                                </>

                            }


                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }
                {
                    isShowPrice === true &&
                    <div className='price'>
                        <FormattedMessage id='patient.booking-modal.price' />
                        {detailDoctor && detailDoctor.Doctor_Infor && detailDoctor.Doctor_Infor.priceData && language === LANGUAGES.VI ?
                            <NumericFormat
                                value={detailDoctor.Doctor_Infor.priceData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'} />
                            : ''
                        }
                        {detailDoctor && detailDoctor.Doctor_Infor && detailDoctor.Doctor_Infor.priceData && language === LANGUAGES.EN ?
                            <NumericFormat
                                value={detailDoctor.Doctor_Infor.priceData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'} />
                            : ''
                        }
                    </div>
                }
            </div >

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
