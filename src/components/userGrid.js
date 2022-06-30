import React, {useContext} from 'react';
import { useFormikContext } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

import store from './../context'

const UserGrid = () => {
    const { values, handleSubmit } = useFormikContext();
    const context = useContext(store)

    return (
        <>
            <div className="grid grid-rows-1 grid-cols-1 form-control">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                values && values.users && values.users.map((rec, index) => {
                                    return (
                                        <tr key={rec.email}>
                                            <th>{index + 1}</th>
                                            <td>{rec.firstName}</td>
                                            <td>{rec.lastName}</td>
                                            <td>{rec.email}</td>
                                            <th>
                                                <button className={`btn btn-circle ${rec.color} border-none`} onClick={() => context.joinRetoBoard(rec)}>
                                                    <FontAwesomeIcon className='w-4 h-4' icon={faArrowRightToBracket} />
                                                </button>
                                            </th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default UserGrid;
