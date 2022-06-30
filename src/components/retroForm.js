import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const RetroForm = () => {
    const { values, errors, handleChange, handleBlur } = useFormikContext();
    return (
        <>
            <div className="form-control">
                <label className="w-fit label cursor-pointer">
                    <input type="checkbox" name="newTeamRegister"
                        onChange={handleChange}
                        checked={values.newTeamRegister} className="checkbox" />
                    <span className="label-text text-md pl-2">New Team Registration</span>
                </label>
                {
                    values.newTeamRegister && (
                        <div className='flex flex-col'>
                            <label className='m-2'>Team Name</label>
                            <input
                                type="text"
                                placeholder="Team Name"
                                className="input input-bordered w-full m-2"
                                name={`teamName`}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.teamName}
                                autoFocus
                            />
                            {
                                errors && errors.teamName && (

                                    <div className="ml-2 p-4 text-red-700 border-l-4 border-red-700 bg-red-50" role="alert">
                                        <h3 className="text-sm font-medium">{errors.teamName}</h3>
                                    </div>
                                )
                            }
                        </div>
                    )
                }

                <div className='flex flex-col'>
                    <label className='m-2'>Passcode</label>
                    <input
                        type="password"
                        placeholder="Unique Code"
                        className="input input-bordered w-full m-2"
                        name="passCode"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passCode}
                    />
                    {
                        errors && errors.passCode && (

                            <div className="ml-2 p-4 text-red-700 border-l-4 border-red-700 bg-red-50" role="alert">
                                <h3 className="text-sm font-medium">{errors.passCode}</h3>
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default RetroForm;
