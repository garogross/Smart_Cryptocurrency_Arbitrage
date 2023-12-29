import React from 'react';
import styles from "./NewsList.module.scss"
import {baseUrl} from "../../../redux/action/fetchTools";
import DataLoader from "../../layout/DataLoader/DataLoader";


function NewsList({data,loading,onClick}) {


    return (
        <div className={styles["newsList"]}>
            <div className={`${styles["newsList__container"]} container`}>
                {
                    data.map(({id,title,tag,picture}) => (
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
                <DataLoader loading={loading} isEmpty={!data.length}/>
            </div>
        </div>
    );
}

export default NewsList;