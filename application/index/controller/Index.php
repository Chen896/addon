<?php
namespace app\index\controller;
use app\common\controller\Home;

class Index extends Home
{

    public function index($id = 1){  // url 中需要定义 id
        # $sid = input('get.id');  # url()函数路由静态化，不能用 input() 获取$_GET参数2016-12-28

        $prefix = config('database.prefix');
        $path = db('Addon_category')->query(" SELECT CONCAT(`path`, '-', `id`) pp FROM {$prefix}addon_category WHERE `id`=$id ");
        $path = $path[0]['pp'];

        # 文章列表
        $where['cid'] = ['like', $path.'%'];  //字符开头
        $list = db('AddonContent')->where($where)->order('id','desc')->paginate(20, false, ['query' => $this->param]);  // 保留 get 搜索参数2016-12-30

        # 相关标签
        $label = db('AddonCategory')->where('path', $path)->select();
        if(!$label){
            $pos = strrpos($path, '-');
            $path = substr($path, 0, $pos);

            $label = db('AddonCategory')->where('path', $path)->select();
        }

        $this->assign(array('list'=>$list, 'label'=>$label));
        $this->setMeta("技术文章");

        return $this->fetch();
    }

    public function detail($id){
        $article = model('AddonContent')->getArticle($id);

        //相关文章
        $cid = $article['cid'];
        $list = db('AddonContent')->field('id,title')->where('cid', $cid)->limit(15)->select();

        $this->assign(array('article'=>$article, 'list'=>$list, 'id'=>$id));
        $this->setMeta("文章详情");

        return $this->fetch();
    }
}