import React from 'react';
import { useFormikContext } from 'formik';

const JoinForm = () => {
    const { dirty, values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormikContext();

    return (
        <>
            <div className="grid grid-rows-1 grid-cols-1 gap-2 md:grid-rows-1 md:grid-cols-2 form-control">
                <div className='flex flex-col'>
                    <label className='m-1'>First Name</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        className="input input-bordered w-full m-2"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                    />
                    {
                        errors && errors.firstName && touched.firstName && (

                            <div className="ml-2 p-4 text-red-700 border-l-4 border-red-700 bg-red-50" role="alert">
                                <h3 className="text-sm font-medium">{errors.firstName}</h3>
                            </div>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label className='m-1'>Last Name</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        className="input input-bordered w-full m-2"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                    />
                    {
                        errors && errors.lastName && touched.lastName && (

                            <div className="ml-2 p-4 text-red-700 border-l-4 border-red-700 bg-red-50" role="alert">
                                <h3 className="text-sm font-medium">{errors.lastName}</h3>
                            </div>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label className='m-1'>Email</label>
                    <input
                        type="text"
                        placeholder="Email"
                        className="input input-bordered w-full m-2"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {
                        errors && errors.email && touched.email && (

                            <div className="ml-2 p-4 text-red-700 border-l-4 border-red-700 bg-red-50" role="alert">
                                <h3 className="text-sm font-medium">{errors.email}</h3>
                            </div>
                        )
                    }
                </div>
                <div className='flex flex-col'>
                    <label className='m-1'>Select Color</label>
                    <select
                        className="select w-full input-bordered m-2"
                        name="color"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.color}
                    >
                        <option selected>Pick your favorite Color</option>
                        <option className='text-red-500' value="bg-red-500">Red</option>
                        <option className='text-green-500' value="bg-green-500">Green</option>
                        <option className='text-blue-500' value="bg-blue-500">Blue</option>
                        <option className='text-violet-500' value="bg-violet-500">Violet</option>
                        <option className='text-teal-500' value="bg-teal-500">Teal</option>
                        <option className='text-purple-500' value="bg-purple-500">Purple</option>
                    </select>
                    {
                        Object.keys(touched).length === 3 && !values.color && (

                            <div className="ml-2 p-4 text-red-700 border-l-4 border-red-700 bg-red-50" role="alert">
                                <h3 className="text-sm font-medium">{errors.color}</h3>
                            </div>
                        )
                    }
                </div>
                <div className="card-actions justify-end mt-4 w-full">
                    <button
                        className="btn btn-primary btn-sm w-fit"
                        disabled={Object.keys(errors).length > 0 || !dirty}
                        onClick={handleSubmit}
                    >
                        Join Retro
                    </button>
                </div>
            </div>
        </>
    )
}

export default JoinForm;
