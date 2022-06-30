import { useRouter } from 'next/router';
import React from 'react';

const store = React.createContext();

export function ServiceProvider({ children }) {
    const router = useRouter()
    const { token } = router.query

    const doCodeCheck = async (passCode) => {
        const data = await fetch(`/api/retros/slug?service=doCodeCheck&passCode=${passCode}`).then(response => response.json());
        return data;
    }

    const postRetro = async (payload) => {
        return new Promise(async (resolve, reject) => {
            const data = await postData('POST', `/api/retros`, payload);
            handleTokenStatus(data, resolve);
        })
    }
    const putRetro = async (payload) => {
        return new Promise(async (resolve, reject) => {
            const data = await postData('PUT', `/api/retros`, payload);
            handleTokenStatus(data, resolve);
        })
    }

    const getBoardRecords = async (retrosId, categoryId) => {
        const url = `/api/board?retrosId=${retrosId}${categoryId ? '&categoryId='+categoryId : ''}`
        const data = await fetch(url).then(response => response.json());
        return data;
    }

    const mapAllCategoryToBoard = async (retrosId, allCategory) => {
        return new Promise(async (resolve, reject) => {
            const allCategoryBoardRecs = await getBoardRecords(retrosId);
            const response = []
            allCategory.forEach((item) => {
                const records = allCategoryBoardRecs.filter((rec) => rec.categoryId === item.id)
                let draftRecords = []
                if (item.records) {
                    draftRecords = item.records.filter((rec) => !rec.id)
                }
                response.push({...item, records: [...records, ...draftRecords]})
            });
            resolve(response)
        })
        
    }

    const mapCategoryToBoard = async (retrosId, category) => {
        const categoryBoards = await getBoardRecords(retrosId, category.id);
        const records = [];
        categoryBoards.forEach(rec => {
            records.push({...rec, ups: [], downs: []})
        })
        category.records.forEach(rec => {
            if (!rec.id) {
                records.push({...rec}) 
            }
        })
        return {...category, records};
    }

    const pushBoardRecord = async (payload) => {
        return new Promise(async (resolve, reject) => {
            const data = await postData('POST', `/api/board`, payload);
            resolve(data)
        })
    }

    const updateBoardRecord = async (payload) => {
        return new Promise(async (resolve, reject) => {
            const data = await postData('PUT', `/api/board`, payload);
            resolve(data)
        })
    }

    const postUsers = async (payload) => {
        const user = await postData('POST', `/api/users`, payload);
        router.push(`/retro/${user.id}/${token}`)
    }

    const joinRetoBoard = (user) => {
        router.push(`/retro/${user.id}/${token}`)
    }

    const handleTokenStatus = (data, callback) => {
        if (data && data.token) {
            router.push(`/board/${data.token}`)
        } else {
            callback(data)
        }
    }

    async function postData(method, url = '', data = {}) {
        const response = await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }

    return (
        <store.Provider value={{
            doCodeCheck,
            postRetro,
            putRetro,
            postUsers,
            joinRetoBoard,
            getBoardRecords,
            pushBoardRecord,
            updateBoardRecord,
            mapAllCategoryToBoard,
            mapCategoryToBoard
        }}>
            {children}
        </store.Provider>
    )
};

export default store;