<?php
namespace app\addons\controller;
use app\common\controller\Addons;

use think\Db;  //数据库模型

class Addon extends Addons
{
    /**
     * 富文本编辑器
     */
    public function editor(){
        return $this->fetch();
    }

    /**
     * 编辑器--代码高亮
     */
    public function editorhl(){
        if(IS_POST){
            $this->assign('content', input('post.content'));
            //$this->assign('content', stripslashes($_POST['content']));
        }

        return $this->fetch();
    }

    /**
     * 添加分类
     * @date 2016-11-21 15:36
     */
    public function fenlei($name='', $sort=0, $path=0){
        $model = model('addonCategory');

        if(IS_POST){
            if($name == ''){
            //    return $this->error('请填写分类名称');
            }
            $res = $model->addCategory($name, $sort, $path);

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



}