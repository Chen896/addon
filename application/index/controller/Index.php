<?php
namespace app\index\controller;
use app\common\controller\Home;

class Index extends Home
{

    public function index($id){
        # $sid = input('get.id');  # url()函数路由静态化，不能用 input() 获取$_GET参数2016-12-28

        $data = array();
        $this->assign($data);
        $this->setMeta("技术文章");

        return $this->fetch();
    }

}