import React, {useEffect, useState} from 'react';
import NewsList from "../../components/NewsPage/NewsList/./NewsList";
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../redux/action/news";
import {newsPagePath} from "../../router/path";
import {useLocation, useNavigate} from "react-router-dom";
import NewsItemModal from "../../components/NewsPage/NewsItemModal/NewsItemModal";

function NewsPage() {
    const dispatch = useDispatch()
    const {hash} = useLocation()
    const navigate = useNavigate()
    const data = useSelector(state => state.news.data)
    const [selectedItemId,setSelectedItemId] = useState(null)
    const loading = useSelector(state => state.news.getLoading)

    useEffect(() => {
        dispatch(getNews())

        if(!hash) {
            navigate(`${newsPagePath}#free`)
        }
    }, []);

    const selectedItem = data.find(item => item.id === selectedItemId)
    const openItemModal = (id) => setSelectedItemId(id)
    const closeItemModal = () => setSelectedItemId(null)

    return (
        <div className={'gradientBg'}>
            <NewsList
                loading={loading}
                data={data.filter(item => item.type === hash.slice(1))}
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