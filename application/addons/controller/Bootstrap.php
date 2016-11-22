<?php
namespace app\addons\controller;
use app\common\controller\Addons;

class Bootstrap extends Addons
{
    //1.表格
        public function table(){

            return $this->fetch();
        }

        public function table2(){

            return $this->fetch();
        }

        public function table3(){

            return $this->fetch();
        }

        public function grid(){

            return $this->fetch();
        }

        public function button(){

            return $this->fetch();
        }

        public function tabledemo(){

            return $this->fetch();
        }

    //2.表单
        public function formvertical(){

            return $this->fetch();
        }

        public function forminline(){

            return $this->fetch();
        }

        public function formlevel(){

            return $this->fetch();
        }

        public function formwidget(){

            return $this->fetch();
        }

        public function formstatus(){

            return $this->fetch();
        }

        public function formdemo(){
            if($_POST){
                dump($_POST);
                dump($_FILES);
            }

            return $this->fetch();
        }

    //3.布局组件
        public function layicon(){
            return $this->fetch();
        }

        public function layinput(){
            return $this->fetch();
        }

        public function laynav(){
            return $this->fetch();
        }

        public function laylist(){
            return $this->fetch();
        }

        public function laypanel(){
            return $this->fetch();
        }

}