import React from 'react';
import './propertyList.css'

const PropertyList = () => {
    return (
        <div className="pList">
            <div className="plistItem">
                <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
                    className='pListImg'
                    alt="" />
                <div className="pListTitles">
                    <div className="h1">Hotels</div>
                    <div className="h2">7,000 hotels</div>
                </div>
            </div>
            <div className="pListItem">
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                    <div className="h1">Apartments</div>
                    <div className="h2">4,530 bnb apartments</div>
                </div>
            </div>
            <div className="pListItem">
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                    <div className="h1">Resorts</div>
                    <div className="h2">2,335 resorts</div>
                </div>
            </div>
            <div className="pListItem">
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                    <div className="h1">Villa</div>
                    <div className="h2">250 hotels</div>
                </div>
            </div>
            <div className="pListItem">
                <img
                    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
                    alt=""
                    className="pListImg"
                />
                <div className="pListTitles">
                <div className="h1">Cabin</div>
                    <div className="h2">1,240 cabins</div>
                </div>
            </div>
        </div>
    )
}

export default PropertyList
