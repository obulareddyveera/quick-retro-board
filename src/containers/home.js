import React, { useContext } from 'react';
import { Formik } from 'formik';

import RetroForm from '../components/retroForm';
import store from './../context'
import AccessCard from '../components/accessCard';

const HomeContainer = () => {
    const context = useContext(store)

    const handleStartReto = async ({ values, setErrors }) => {
        let data;
        const { passCode } = values;
        if (values.newTeamRegister) {
            data = await context.doCodeCheck(passCode);
            if (data && data.status === 409) {
                setErrors({ passCode: data.message })
                return;
            }
            await context.postRetro({
                teamName: values.teamName,
                passCode: values.passCode
            });
        } else {
            data = await context.putRetro({
                passCode: values.passCode
            });
            if (data && data.status === 404) {
                setErrors({ passCode: data.message })
                return;
            }
        }
    }

    return (
        <div className='flex flex-column items-center justify-center h-full'>
            <Formik
                initialValues={{
                    teamName: 'Quick Retro Board',
                    passCode: '',
                    newTeamRegister: false,
                }}
                validate={(values) => {
                    const errors = {};
                    if (values && !values.teamName) {
                        errors.teamName = 'Required'
                    }
                    if (values && !values.passCode) {
                        errors.passCode = 'Required'
                    }
                    return errors;
                }}
                onSubmit={(...params) => {
                    const [values, handlers] = params;
                    handleStartReto({ values, setErrors: handlers.setErrors })
                }}
            >
                {(props) => {
                    const { dirty, errors, values, handleSubmit } = props;
                    return (
                        <>
                            <AccessCard>
                                <RetroForm />
                                <div className="card-actions justify-end mt-4 w-full">
                                    <button
                                        className="btn btn-primary btn-sm w-fit"
                                        disabled={Object.keys(errors).length > 0 || !dirty}
                                        onClick={handleSubmit}
                                    >
                                        Start Retro
                                    </button>
                                </div>
                            </AccessCard>

                        </>
                    )
                }}
            </Formik>
        </div >
    )
}

export default HomeContainer;
