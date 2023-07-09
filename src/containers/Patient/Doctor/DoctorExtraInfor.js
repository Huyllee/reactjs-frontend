import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { NumericFormat } from 'react-number-format';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';
import { getExtraInforDoctorByIdService } from '../../../services/userService';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: []
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorByIdService(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }

        }
    }

    showHideDetailInfor = () => {
        this.setState({
            isShowDetailInfor: !this.state.isShowDetailInfor
        })
    }

    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>
                        <FormattedMessage id='patient.extra-infor-doctor.text-address' />
                    </div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false ?
                        <div className='short-infor'>
                            <span className='examination-price'>
                                <FormattedMessage id='patient.extra-infor-doctor.price-title' />
                            </span>
                            {extraInfor && extraInfor.priceData && language === LANGUAGES.VI &&
                                <NumericFormat
                                    value={extraInfor.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'} />
                            }
                            {extraInfor && extraInfor.priceData && language === LANGUAGES.EN &&
                                <NumericFormat
                                    value={extraInfor.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'} />
                            }.

                            <span className='more-infor' onClick={() => this.showHideDetailInfor()}>
                                <FormattedMessage id='patient.extra-infor-doctor.more-infor' />
                            </span>
                        </div>
                        :
                        <>
                            <div className='title-price'>
                                <FormattedMessage id='patient.extra-infor-doctor.price' />
                            </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>
                                        <FormattedMessage id='patient.extra-infor-doctor.price' />
                                    </span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceData && language === LANGUAGES.VI ?
                                            <NumericFormat
                                                value={extraInfor.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'} />
                                            :
                                            <NumericFormat
                                                value={extraInfor.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'} />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>

                            <div className='payment'>
                                <FormattedMessage id='patient.extra-infor-doctor.payment' />
                                {extraInfor && extraInfor.paymentData && language === LANGUAGES.VI ?
                                    extraInfor.paymentData.valueVi : extraInfor.paymentData.valueEn}
                            </div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor()}>
                                    <FormattedMessage id='patient.extra-infor-doctor.hide-price' />
                                </span>
                            </div>
                        </>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
