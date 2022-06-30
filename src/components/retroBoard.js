import React, { useEffect, useContext, useState } from 'react';
import { faAdd, faCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FieldArray, Formik } from 'formik';
import store from './../context'

const RetroBoard = ({ retrosId, initialValues, onBoardRecord }) => {
    const [formikValues, setFormikValues] = useState();
    useEffect(() => {
        if (initialValues) {
            setFormikValues(initialValues)
        }
    }, [initialValues])
    const context = useContext(store);
    return (
        <>
            {
                formikValues && (
                    <Formik
                        initialValues={formikValues}
                        enableReinitialize={true}
                        render={
                            ({ values, handleChange, handleBlur }) => {
                                return (
                                    <div className='grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 gap-2'>
                                        <FieldArray
                                            name={values.boards}
                                            render={
                                                () => {
                                                    return (
                                                        <>
                                                            {
                                                                values && values.boards && values.boards.map((rec, index) => {
                                                                    const bgClass = ['bg-success', 'bg-warning', 'bg-secondary'][index];
                                                                    const textClass = ['text-success', 'text-warning', 'text-secondary'][index];
                                                                    const textareaClass = ['textarea-success', 'textarea-warning', 'textarea-secondary'][index];

                                                                    return (
                                                                        <>
                                                                            <div key={rec.id} className={`w-full min-h-16 text-white text-md`}>
                                                                                <FieldArray
                                                                                    name={`boards[${index}].records`}
                                                                                    render={(arrayHelpers) => {
                                                                                        return (
                                                                                            <>
                                                                                                <div className={`flex justify-between w-full p-4 ${bgClass}`}>
                                                                                                    <div className='text-xl font-bold'>{rec.name}</div>
                                                                                                    <div>
                                                                                                        <button
                                                                                                            className='btn btn-circle btn-sm'
                                                                                                            onClick={() => arrayHelpers.insert(
                                                                                                                    rec.records.length + 1, 
                                                                                                                    { text: '', ups: [], downs: [], isDirty: true }
                                                                                                                )
                                                                                                            }
                                                                                                        >
                                                                                                            <FontAwesomeIcon icon={faAdd} className={`w-4 h-4 ${textClass}`} />
                                                                                                        </button>
                                                                                                    </div>
                                                                                                </div>
                                                                                                {
                                                                                                    rec.records.map((entity, idx) => {
                                                                                                        return (
                                                                                                            <div key={idx} className={`min-w-max min-h-[6rem] flex flex-col justify-between w-full mt-1 ${bgClass}`}>
                                                                                                                <div className='w-full flex justify-end mt-2 mr-4'>
                                                                                                                    <div className="flex items-center -space-x-4 hover:space-x-1">
                                                                                                                        <button
                                                                                                                            className={`
                                                                                                                                z-10 block p-2 
                                                                                                                                text-red-700 
                                                                                                                                transition-all 
                                                                                                                                bg-red-100 border-2 
                                                                                                                                border-white 
                                                                                                                                rounded-full 
                                                                                                                                active:bg-green-50 
                                                                                                                                hover:scale-110 
                                                                                                                                focus:outline-none 
                                                                                                                                focus:ring
                                                                                                                            `}
                                                                                                                            type="button"
                                                                                                                            onClick={() => arrayHelpers.remove(idx)}
                                                                                                                        >
                                                                                                                            <FontAwesomeIcon className='w-4 h-4' icon={faTrashCan} />
                                                                                                                        </button>

                                                                                                                        <button
                                                                                                                            className={`
                                                                                                                                z-30 
                                                                                                                                block 
                                                                                                                                p-2 
                                                                                                                                text-green-700 
                                                                                                                                transition-all 
                                                                                                                                bg-green-100 
                                                                                                                                border-2 
                                                                                                                                border-white 
                                                                                                                                rounded-full 
                                                                                                                                hover:scale-110 
                                                                                                                                focus:outline-none 
                                                                                                                                focus:ring 
                                                                                                                                active:bg-red-50
                                                                                                                            `}
                                                                                                                            type="button"
                                                                                                                            onClick={() => onBoardRecord(rec, entity)}
                                                                                                                        >
                                                                                                                            <FontAwesomeIcon className='w-4 h-4' icon={faCheck} />
                                                                                                                        </button>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <textarea
                                                                                                                    className={`textarea ${textareaClass} m-2 text-black`}
                                                                                                                    name={`boards[${index}].records[${idx}].commentText`}
                                                                                                                    onChange={handleChange}
                                                                                                                    onBlur={handleBlur}
                                                                                                                    placeholder="Bio"
                                                                                                                    value={entity.commentText}
                                                                                                                />
                                                                                                            </div>
                                                                                                        )
                                                                                                    })
                                                                                                }
                                                                                            </>
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    )
                                                }
                                            }
                                        />
                                    </div>
                                )
                            }
                        }
                    />
                )
            }
        </>
    )
}

export default RetroBoard;
