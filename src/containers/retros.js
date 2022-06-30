import { useRouter } from 'next/router';
import React, { useEffect, useContext } from 'react';
import Header from '../components/header';
import RetroBoard from '../components/retroBoard';

import store from './../context'

const RetrosContainer = (props) => {
    const router = useRouter();
    const context = useContext(store);
    const { category, retros, user } = props
    const [initialValues, setInitialValues] = React.useState()

    useEffect(() => {
        if (category && category.length > 0) {
            const fetchMapAllCategoryToBoard = async () => {
                const data = await context.mapAllCategoryToBoard(retros.id, category);
                setInitialValues((prevState) => {
                    return {
                        ...prevState,
                        boards: data
                    }
                })
            }
            fetchMapAllCategoryToBoard();
        }
    }, [category, retros, context, setInitialValues]);

    useEffect(() => {

        if (!retros || !retros.id) {
            router.push('/')
        } else if (!user || !user.length === 0) {
            router.push('/')
        }

    }, [retros, user, router])

    const addBoardRecord = (rec, entity) => {
        const currentUser = user[0];
        const record = {
            retroId: retros.id,
            commentText: entity.commentText,
            categoryId: rec.id,
            userId: currentUser.id
        }
        if (entity.id) {
            record.id = entity.id;
            context.updateBoardRecord(record)
        } else {
            context.pushBoardRecord(record)
        }
        context.mapCategoryToBoard(retros.id, rec)
    }

    const handleRefreshBoard = async () => {
        const data = await context.mapAllCategoryToBoard(retros.id, initialValues.boards);
        setInitialValues((prevState) => {
            return {
                ...prevState,
                boards: data
            }
        })
    }

    const udpateFieldValues = (data) => {
        setInitialValues((prevState) => {
            return {
                ...prevState,
                boards: data
            }
        })
    }


    return (
        <div className='min-w-max min-h-max w-screen h-screen'>
            <Header onRefreshBoard={handleRefreshBoard} />
            <RetroBoard 
                retrosId={retros.id} 
                initialValues={initialValues} 
                onBoardRecord={addBoardRecord} 
            />
        </div >
    )
}

export default RetrosContainer;