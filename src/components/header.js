import { faClipboard, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Header = ({onRefreshBoard}) => {
    return (
        <header className="bg-gray-900">
            <div className="w-full px-4">
                <div className="flex items-center justify-between h-16 text-white">
                    <div className="md:flex md:items-center md:gap-12">
                        Quick Retro Board
                    </div>
                    <div className="hidden md:block">
                        <nav aria-labelledby="header-navigation">
                            <h2 className="sr-only" id="header-navigation">Header navigation</h2>

                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <div className='text-sm flex'>
                                        <button
                                            className="badge badge-warning gap-2"
                                            onClick={() => { navigator.clipboard.writeText(window.location.href) }}
                                        >
                                            <FontAwesomeIcon className='w-4 h-4' icon={faClipboard} />
                                            Copy & Share Retro Link
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <button
                                        className="badge badge-warning gap-2"
                                        onClick={onRefreshBoard}
                                    >
                                        <FontAwesomeIcon className='w-4 h-4' icon={faRefresh} />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header