import React, { useState} from 'react';
import NewsList from "../../components/NewsPage/NewsList/./NewsList";
import { useSelector} from "react-redux";
import NewsItemModal from "../../components/NewsPage/NewsItemModal/NewsItemModal";

function NewsPage() {
    const data = useSelector(state => state.news.data)
    const [selectedItemId,setSelectedItemId] = useState(null)
    const loading = useSelector(state => state.news.getLoading)

    const selectedItem = data.find(item => item.id === selectedItemId)
    const openItemModal = (id) => setSelectedItemId(id)
    const closeItemModal = () => setSelectedItemId(null)


    return (
        <div className={'gradientBg'}>
            <NewsList
                loading={loading}
                data={data}
                onClick={openItemModal}
            />
            <NewsItemModal
                item={selectedItem}
                onClose={closeItemModal}
            />
        </div>
);
}


export default NewsPage;