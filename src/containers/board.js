import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';

import AccessCard from '../components/accessCard';
import UserForm from '../components/userForm';
import UserGrid from '../components/userGrid';

import store from './../context'

const BoardContainer = (props) => {
    const router = useRouter();
    const { token, users } = props;
    const context = useContext(store);
    const tabOptions = [
        { id: 1, displayName: 'Select User', component: UserGrid },
        { id: 2, displayName: 'Add New User', component: UserForm },
    ];
    const defaultTab = !users || users.length === 0 ? tabOptions[1] : tabOptions[0]
    const [tab, setActiveTab] = useState(defaultTab)

    const handleJoinReto = ({ values, setErrors }) => {
        if (tab.id === 2) {
            context.postUsers({ ...values, retrosId: props.retros.id });
        } else {
            context.joinRetoBoard(user);
        }
    }

    return (
        <div className='min-w-max min-h-max w-screen h-screen'>
            <div className='flex flex-column items-center justify-center h-full'>
                {
                    tab && (
                        <Formik
                            initialValues={{
                                firstName: '',
                                lastName: '',
                                email: '',
                                color: '',
                                users: props.users
                            }}
                            validate={(values) => {
                                const errors = {};
                                if (tab.id === 2) {
                                    if (values && !values.firstName) {
                                        errors.firstName = 'Required'
                                    }
                                    if (values && !values.lastName) {
                                        errors.lastName = 'Required'
                                    }
                                    if (values && !values.email) {
                                        errors.email = 'Required'
                                    }
                                    if (values && !values.color) {
                                        errors.color = 'Required'
                                    }
                                }
                                return errors;
                            }}
                            onSubmit={(...params) => {
                                const [values, handlers] = params;
                                handleJoinReto({ values, setErrors: handlers.setErrors })
                            }}
                        >
                            {(props) => {
                                const { dirty, errors, values, handleSubmit } = props;
                                return (
                                    <>
                                        <AccessCard>
                                            <div className="tabs">
                                                {
                                                    tabOptions.map((rec) => {
                                                        return (
                                                            <>
                                                                <button
                                                                    className={`tab tab-bordered ${tab.id === rec.id ? 'tab-active' : ''}`}
                                                                    onClick={() => setActiveTab(rec)}
                                                                >
                                                                    {rec.displayName}
                                                                </button>
                                                            </>
                                                        )
                                                    })

                                                }
                                            </div>
                                            {tab && (<tab.component onJoinRetro={handleJoinReto} />)}
                                        </AccessCard>

                                    </>
                                )
                            }}
                        </Formik>
                    )
                }

            </div>
        </div>
    )
}

export default BoardContainer;