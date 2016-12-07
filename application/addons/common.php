<?php
// Addons模块的公共函数2016-12-06 11:07

/**
 * 数据签名认证
 * @param  array  $data     被认证的数据
 * @return string           签名
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