export const changeNewsPerPage = (news_per_page = 4) => {
    /*
    payload - это неофициальное, принятое сообществом соглашение об именовании поля, 
    которое содержит фактические данные в объекте
    */
    return {
        type: 'CHANGE_NEWS_PER_PAGE',
        payload: news_per_page
    }
}

export const changeNewsPage = (news_page = 1) => {
    return {
        type: 'CHANGE_NEWS_PAGE',
        payload: news_page
    }
}

export const storePage = (pageNumber, pagePosts) => {
    return {
        type: 'STORE_PAGE',
        payload: {pageNumber: pageNumber, pagePosts: pagePosts}
    }
}

export const setNewsTotalPages = (totalPages) => {
    return {
        type: 'SET_NEWS_TOTAL_PAGES',
        payload: totalPages
    }
}