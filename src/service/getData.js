import fetch from '../config/fetch'


/**
 * 获取首页默认地址
 */
export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
});


/**
 * 获取首页热门城市
 */
export const hotcity = () => fetch('/v1/cities', {
    type: 'hot'
});

/**
 * 获取所有城市
 */
export const groupcity = () => fetch('/v1/cities', {
    type: 'group'
});

/**
 * 获取当前所在城市
 */
export const currentcity = number => fetch('/v1/cities/' + number);

/**
 * 获取搜索地址内容
 */
export const searchplace = (cityid, value) => fetch('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});

/**
 * 获取msite页面地址信息
 */
export const msiteAdress = geohash => fetch('/v2/pois/' + geohash);


/**
 * 获取msite页面食品分类列表
 */
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
});

/**
 * 获取msite商铺列表
 */
export const shoplist = (latitude, longitude, offset, limit, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = '';
    support_ids.forEach(item => {
        if (item.status) {
            supportStr += '&support_ids[]=' + item.id;
        }
    });
    let data = {
        latitude,
        longitude,
        offset,
        limit,
        'extras[]': 'activities',
        keyword: '',
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr
    };
    return fetch('/shopping/restaurants', data);
};

/**
 * 获取商铺信息
 */
export const shopDetails = (shopid, latitude, longitude) => fetch('/shopping/restaurant/' + shopid, {
    latitude,
    longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
}) 

/**
 * 获取shop页面菜单列表
 */
export const foodMenu = restaurant_id => fetch('/shopping/v2/menu', {
   restaurant_id 
})