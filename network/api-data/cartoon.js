import jxRequest from '../request'
//     reqCartoonSort: data => jxRequest.get('/api/category/listCategory'+`?pageNo=${data.pageNo}&limit=${data.limit}`), //登录
export default {
    reqCartoonSort: data => jxRequest.get('/api/category/listCategory', data), //分类
    reqCartoon: data => jxRequest.get('/api/comics/list', data), //漫画数据
    reqCartoonDetails: data => jxRequest.get('/api/comics/details', data), //漫画详情
    reqCartoonChapter: data => jxRequest.get('/api/query/chapter', data), //漫画章节
    reqChapterImg: data => jxRequest.get('/api/comics/page', data), //漫画章节图片
    reqAddBooksheIf: data => jxRequest.post('/api/addToBookshelf', data), //加入书架（收藏）
    reqQueryBooksheIf: data => jxRequest.get('/api/queryBookshelf', data), //查询书架(收藏)
    reqHistory: data => jxRequest.post('/api/history', data),   //添加历史记录
    reqQueryHistory: data => jxRequest.get('/api/queryHistory', data),   //查询历史记录
    reqAddRead: data => jxRequest.post('/api/read', data),   //添加阅读量
    reqQueryRead: data => jxRequest.get('/api/queryread', data),   //排行
    reqIsCollect: data => jxRequest.get('/api/queryBookshelf/isCollect', data), //详情页是否加入书架（收藏）按钮显示
    reqDelCollect: data => jxRequest.post('/api/removeFromBookshelf', data), //移除收藏
     
}