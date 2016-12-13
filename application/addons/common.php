<?php
// Addons模块的公共函数2016-12-06 11:07

/**
 * 获取分类名称
 * @param  string  $path    文章分类cid
 * @return string           分类名称
 */
function getCategoryName($path){
    if($pos = strrpos($path, '-')){
        $cid = substr($path, $pos+1);
    }else{
        $cid = $path;
    }

    $res = model('AddonCategory')->get($cid);
    return $res->name;
}