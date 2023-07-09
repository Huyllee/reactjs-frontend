import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUser, deleteUser, editUser } from '../../services/userService';
import ModalUser from './ModalUser';
import ModerEditUser from './ModerEditUser';
import { emitter } from '../../utils/emitter';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModel: false,
            isOpenModelEdit: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllListUser();
    }

    getAllListUser = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModel: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModel: !this.state.isOpenModel
        })
    }

    toggleUserEditModal = () => {
        this.setState({
            isOpenModelEdit: !this.state.isOpenModelEdit
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUser(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllListUser();
                this.setState({
                    isOpenModel: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (e) {
            console.log(e);
        }


    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUser(user.id);
            if (res && res.errCode === 0) {
                await this.getAllListUser();
            }
            else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = async (user) => {
        console.log(user);
        this.setState({
            isOpenModelEdit: true,
            userEdit: user
        })
    }

    editUser = async (user) => {

        try {
            let res = await editUser(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModelEdit: false
                })
                await this.getAllListUser();
            } else {
                alert(res.errMessage);
            }

        } catch (e) {
            console.log(e);
        }
        console.log('save user', user);
    }

    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <ModalUser
                    toggleFromParent={this.toggleUserModal}
                    isOpen={this.state.isOpenModel}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModelEdit &&
                    <ModerEditUser
                        toggleFromParent={this.toggleUserEditModal}
                        isOpen={this.state.isOpenModelEdit}
                        currentUser={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }

                <div className='title text-center'>Manage users</div>
                <div className='mx-1'>
                    <button onClick={() => this.handleAddNewUser()} className='btn btn-primary px-3'><i className='fas fa-plus'></i> Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Fisrt name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i class="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i class="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
