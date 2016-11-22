<?php
namespace app\addons\controller;
use app\common\controller\Addons;

class Index extends Addons
{

    public function index(){

        return $this->fetch();
    }

}