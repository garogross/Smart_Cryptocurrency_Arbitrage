import React, {useEffect, useState} from 'react';
import NewsList from "../../../components/NewsPage/NewsList/NewsList";
import {useDispatch, useSelector} from "react-redux";
import {createNews, editNews, getNews} from "../../../redux/action/news";
import MainBtn from "../../../components/layout/MainBtn/MainBtn";

import styles from "./AdminNewsPage.module.scss"
import AdminNewsFormModal from "../../../components/AdminNewsPage/AdminNewsFormModal/AdminNewsFormModal";

function AdminNewsPage(props) {
    const dispatch = useDispatch()
    const data = useSelector(state => state.news.data)
    const createError = useSelector(state => state.news.createError)
    const editError = useSelector(state => state.news.editError)
    const createLoading = useSelector(state => state.news.createLoading)
    const editLoading = useSelector(state => state.news.editLoading)
    const [selectedItemId, setSelectedItemId] = useState(null)
    const loading = useSelector(state => state.news.getLoading)


    useEffect(() => {
        dispatch(getNews())
    }, []);

    const selectedItem = data.find(item => item.id === selectedItemId)
    const openItemModal = (id) => setSelectedItemId(id)
    const closeItemModal = () => setSelectedItemId(null)

    const onSubmit = (formData,onClose) => {
        if(selectedItemId === "create") {
            dispatch(createNews(formData,onClose))
        } else {
            dispatch(editNews({id: selectedItemId,...formData},onClose))
        }
    }


    return (
        <div className={`${styles['adminNews']} gradientBg`}>
            <MainBtn
                onClick={() => setSelectedItemId("create")}
                className={styles['adminNews__btn']}>Добавить</MainBtn>
            <NewsList
                loading={loading}
                data={data}
                onClick={openItemModal}
            />
            {
                selectedItemId ?
                    <AdminNewsFormModal
                        item={selectedItemId && selectedItemId === "create" ? "create" : selectedItem}
                        onClose={closeItemModal}
                        title={selectedItemId === "create" ? 'Добавить' : 'Изменить'}
                        onSubmit={onSubmit}
                        error={createError || editError}
                        loading={createLoading || editLoading}
                    />
                    : null
            }

        </div>
    );
}

export default AdminNewsPage;