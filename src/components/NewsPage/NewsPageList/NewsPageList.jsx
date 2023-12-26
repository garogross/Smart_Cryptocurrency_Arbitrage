import React, {useEffect, useState} from 'react';
import styles from "./NewsPageList.module.scss"
import NewsItemModal from "../NewsItemModal/NewsItemModal";
import {useDispatch, useSelector} from "react-redux";
import {getNews} from "../../../redux/action/news";
import {baseUrl} from "../../../redux/action/fetchTools";
import Loader from "../../layout/Loader/Loader";
import TransitionProvider from "../../../providers/TransitionProvider";


function NewsPageList() {
    const dispatch = useDispatch()
    const data = useSelector(state => state.news.data)
    const loading = useSelector(state => state.news.getLoading)
    const [selectedItemId,setSelectedItemId] = useState(null)

    useEffect(() => {
        dispatch(getNews())
    }, []);

    const selectedItem = data.find(item => item.id === selectedItemId)
    const openItemModal = (id) => setSelectedItemId(id)
    const closeItemModal = (id) => setSelectedItemId(null)

    return (
        <div className={`${styles["newsList"]} gradientBg`}>
            <div className={`${styles["newsList__container"]} container`}>
                {
                    data.map(({id,title,body,picture}) => (
                        <div
                            onClick={() => openItemModal(id)}
                            className={styles["newsList__item"]}
                            key={id}
                        >
                            <img src={`${baseUrl}/${picture}`} alt="news" className={styles["newsList__itemImg"]}/>
                            <h5 className={`${styles["newsList__itemTitle"]} subtitleTxt`}>{title}</h5>
                            <h4 className={styles["newsList__itemText"]}>{body}</h4>
                        </div>
                    ))
                }

                <TransitionProvider
                inProp={loading}
                style={'opacity'}
                // height={'300px'}
                className={styles["newsList__loadingBlock"]}
                >
                    <Loader size={80} borderSize={8}/>
                </TransitionProvider>
            </div>
            {
                    <NewsItemModal
                        item={selectedItem}
                        onClose={closeItemModal}
                    />
            }

        </div>
    );
}

export default NewsPageList;