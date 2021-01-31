import { useState, useEffect } from 'react';
import { firedatabase } from './firebase';

const GetImg = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const unsub = firedatabase.collection(collection)
            .orderBy('uploaddate', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({...doc.data(), id: doc.id})
            });
            setDocs(documents);
        })

        return () => unsub();
    }, [collection])

    return { docs };
}

export default GetImg;