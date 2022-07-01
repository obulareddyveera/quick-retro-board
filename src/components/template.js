/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Template = ({ children }) => {
    const imageUrl = "/quickRetroBoard.png"
    return (
        <>
            <div className="w-1/2 shadow-xl bg-white">
                <a href="" className="block overflow-hidden">
                    <img
                        className="object-cover w-full h-80"
                        src={`${imageUrl}?auto=format&fit=crop&w=2070&q=80`}
                        alt=""
                    />
                </a>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Template;