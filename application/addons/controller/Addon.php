<?php
namespace app\addons\controller;
use app\common\controller\Addons;

use think\Db;  //数据库模型

class Addon extends Addons
{
    /**
     * 1.富文本编辑器
     */
    public function editor(){
        return $this->fetch();
    }

    /**
     * 2.编辑器--代码高亮
     */
    public function editorhl(){
        if(IS_POST){
            $this->assign('content', input('post.content'));
            //$this->assign('content', stripslashes($_POST['content']));
        }

        return $this->fetch();
    }

    /**
     * 3.添加分类
     * @date 2016-11-21 15:36
     */
    public function fenlei($name='', $path=0){
        $model = model('addonCategory');

        if(IS_POST){
            if($name == ''){
            //    return $this->error('请填写分类名称');
            }
            $res = $model->addCategory($name, $path);

            // 获取模型的验证：错误信息方法是 $model->getError() --TODO-------------------------
            $res ? $this->success('新增成功') : $this->error($model->getError());

        }else{
            // $list = Db::name('addon_category')->select();
            // $tree = $model->category($list);
            $tree = $model->getCategory();

            $this->assign('tree', $tree);
            return $this->fetch();
        }

    }

    /**
     * 4.添加文章
     * @date 2016-11-24 15:21
     */
    public function article($cid='0', $title='', $content='', $author='Chen'){
        if(IS_POST){
            $model = model('addonContent');
            $res = $model->addArticle($cid, $title, $content, $author);

            // 获取模型的验证：错误信息方法是 $model->getError() --TODO-------------------------
            $res ? $this->success('新增成功') : $this->error($model->getError());

        }else{
            $tree = model('addonCategory')->getCategory();

            $this->assign('tree', $tree);
            return $this->fetch();
        }
    }

    /**
     * 5.编辑文章
     * @date 2016-11-25 15:20
     */
    public function article2($id='', $cid='0', $title='', $content='', $author='Chen'){
        if(IS_POST){
            $model = model('addonContent');
            $res = $model->editArticle($cid, $title, $content, $author);

            $res ? $this->success('编辑成功') : $this->error($model->getError());

        }else{
            $tree = model('addonCategory')->getCategory();
            $article = model('AddonContent')->getArticle($id);
dump($article);exit;
            $this->assign( array('tree'=>$tree, 'article'=>$article) );
            return $this->fetch();
        }
    }

    /**
     * 6.文章列表
     * @date 2016-11-25 15:31
     */
    public function artlist(){
        $list = Db::name('AddonContent')->where('1=1')->paginate(1);

        $this->assign('list', $list);
        return $this->fetch();
    }

    /**
     * 7.文章详情
     * @date 2016-11-25 15:53
     */
    public function artdetail($id){
        // $article = Db::name('AddonContentData')->where('cid='.$cid)->find();
        $article = model('AddonContent')->getArticle($id);

        $this->assign('article', $article);
        return $this->fetch();
    }


}