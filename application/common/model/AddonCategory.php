<?php
namespace app\common\model;

/**
 * 分类数据模型
 * @date 2016-11-23 15:20
 */
class AddonCategory extends Base
{
    /**
     * 添加分类模型（在controller中调用、在validate中定义验证规则）
     * @date 2016-11-23 15:23
     * @return  bool
     */
    public function addCategory($name, $path){
        $data['name'] = $name;
        $data['path'] = $path;

        if($pos = strrpos($path, '-')){
            $data['pid'] = substr($path, $pos+1);
        }else{
            $data['pid'] = $path;
        }

        //验证、添加
        // $result = $this->validate(true)->save($data);
        $result = $this->validate('addonCategory.add')->save($data);
        return $result ? $result : false;
    }

    /**
     * 无限极分类(一)（使用MySQL的concat()函数分类排序）
     * @date 2016-11-23 18:34
     */
    public function getCategory(){
        $prefix = config('database.prefix');  //数据库配置前缀
        $data = $this->query("SELECT *,CONCAT(`path`,'-',`id`) as pp FROM {$prefix}addon_category ORDER BY pp");

        foreach($data as $k=>$v){
            $data[$k]['html'] = str_repeat('├─', count(explode('-', $v['path']))-1);
        }

        return $data;
    }

    /**
     * 无限极分类(二)（缺点：循环遍历次数太多）
     * @date 2016-11-21 15:26
     */
    static public function category(&$list, $pid=0, $level=0, $html='-- '){
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



}