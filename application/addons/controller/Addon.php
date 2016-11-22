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
     * 无限极分类
     * @date 2016-11-21 15:26
     */
    static private function category(&$list, $pid=0, $level=0, $html='-- '){
        static $tree = array();

        foreach($list as $v){
            if($v['pid'] == $pid){
                $v['level'] = $level + 1;
                $v['html'] = str_repeat($html, $level);
                $tree[] = $v;

                self::category($list, $v['id'], $v['level']);  //递归
            }
        }

        return $tree;
    }

    /**
     * 添加分类
     * @date 2016-11-21 15:36
     */
    public function fenlei(){
        if(IS_POST){
            $data['name'] = input('post.name');
            $data['path'] = input('post.path');
            $data['sort'] = input('post.sort') ? input('post.sort') : 0;

            if($pos = strrpos($data['path'], '-')){
                $data['pid'] = substr($data['path'], $pos+1);
            }else{
                $data['pid'] = $data['path'];
            }

            $id = Db::name('addon_category')->insertGetId($data);
            $id ? $this->success('新增成功') : $this->error('新增失败');

        }else{
            $list = Db::name('addon_category')->select();
            $tree = $this->category($list);

            $this->assign('tree', $tree);
            return $this->fetch();
        }

    }



}