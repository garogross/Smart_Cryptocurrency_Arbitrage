import React, {useState} from 'react';
import styles from "./NewsPageList.module.scss"
import {newsItemImage} from "../../../assets/images";
import NewsItemModal from "../NewsItemModal/NewsItemModal";


const data = [
    {
        id: 1,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 2,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 3,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 4,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 5,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 6,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 7,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 8,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
    {
        id: 9,
        tag: 'CEX - DEX Arbitrage Scanner',
        title: 'Поиск арбитражных возможностей между CEX и DEX',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, consequuntur cumque doloremque ea earum eius enim modi reprehenderit sit voluptatibus!',
        picture: newsItemImage
    },
]
function NewsPageList() {
    const [selectedItemId,setSelectedItemId] = useState(null)


    const selectedItem = data.find(item => item.id === selectedItemId)
    const openItemModal = (id) => setSelectedItemId(id)
    const closeItemModal = (id) => setSelectedItemId(null)

    return (
        <div className={`${styles["newsList"]} gradientBg`}>
            <div className={`${styles["newsList__container"]} container`}>
                {
                    data.map(({id,title,description,picture}) => (
                        <div
                            onClick={() => openItemModal(id)}
                            className={styles["newsList__item"]}
                            key={id}
                        >
                            <img src={picture} alt="news" className={styles["newsList__itemImg"]}/>
                            <h5 className={`${styles["newsList__itemTitle"]} subtitleTxt`}>{title}</h5>
                            <h4 className={styles["newsList__itemText"]}>{description}</h4>
                        </div>
                    ))
                }
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