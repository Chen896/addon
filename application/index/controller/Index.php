<?php
namespace app\index\controller;
use app\common\controller\Home;

//use app\common\controller\Upload;

class Index extends Home
{

    public function index(){
        $upload = request()->ip();

        $model = model('User');
        $data = array(
            'keyList' => $model->addfield
        );

        $this->assign($data);
        $this->setMeta("编辑用户");

        return $this->fetch();
    }

}