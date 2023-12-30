import React, {useEffect, useState} from 'react';
import styles from "./NewsList.module.scss"
import {baseUrl} from "../../../redux/action/fetchTools";
import DataLoader from "../../layout/DataLoader/DataLoader";
import {getNews} from "../../../redux/action/news";
import {newsPagePath} from "../../../router/path";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";



function NewsList({data,loading,onClick}) {
    const dispatch = useDispatch()
    const {hash} = useLocation()
    const navigate = useNavigate()

    const filteredData = data.filter(item => item.type === hash.slice(1))

    useEffect(() => {
        dispatch(getNews())

        if(!hash) {
            navigate(`${newsPagePath}#free`)
        }
    }, []);

    return (
        <div className={styles["newsList"]}>
            <div className={`${styles["newsList__container"]} container`}>
                {
                    filteredData.filter(item => item.type === hash.slice(1)).map(({id,title,tag,picture}) => (
                        <div
                            onClick={() => onClick(id)}
                            className={styles["newsList__item"]}
                            key={id}
                        >
                            <img src={`${baseUrl}/${picture}`} alt="news" className={styles["newsList__itemImg"]}/>
                            <h5 className={`${styles["newsList__itemTitle"]} subtitleTxt`}>{tag}</h5>
                            <h4 className={styles["newsList__itemText"]}>{title}</h4>
                        </div>
                    ))
                }
                <DataLoader loading={loading} isEmpty={!filteredData.length}/>
            </div>
        </div>
    );
}

export default NewsList;