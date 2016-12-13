<?php
namespace app\addons\controller;
use app\common\controller\Addons;

class Ace extends Addons
{

    // Ace后台模版
    public function index(){
        $menu = array(
                    array('name'=>'控制台', 'url'=>url('Bootstrap/formdemo'), 'icon'=>'icon-dashboard'),
                    array('name'=>'Bootstrap', 'url'=>'#', 'icon'=>'icon-desktop', 'child'=>array(
                        array('name'=>'表格', 'url'=>'#', 'icon'=>'icon-list', 'child'=>array(
                                array('name'=>'表格', 'url'=>url('Bootstrap/table'), 'icon'=>'icon-leaf'),
                                array('name'=>'排版类', 'url'=>url('Bootstrap/table2'), 'icon'=>'icon-leaf'),
                                array('name'=>'辅助类', 'url'=>url('Bootstrap/table3'), 'icon'=>'icon-leaf'),
                                array('name'=>'按钮-图片', 'url'=>url('Bootstrap/button'), 'icon'=>'icon-leaf'),
                                array('name'=>'表格Demo', 'url'=>url('Bootstrap/tabledemo'), 'icon'=>'icon-leaf'),
                            )),
                        array('name'=>'表单', 'url'=>'#', 'icon'=>'icon-edit', 'child'=>array(
                                array('name'=>'表单Demo', 'url'=>url('Bootstrap/formdemo'), 'icon'=>'icon-leaf'),
                                array('name'=>'内联表单', 'url'=>url('Bootstrap/forminline'), 'icon'=>'icon-leaf'),
                                array('name'=>'水平表单', 'url'=>url('Bootstrap/formlevel'), 'icon'=>'icon-leaf'),
                                array('name'=>'表单控件', 'url'=>url('Bootstrap/formwidget'), 'icon'=>'icon-leaf'),
                                array('name'=>'表单状态', 'url'=>url('Bootstrap/formstatus'), 'icon'=>'icon-leaf'),
                                array('name'=>'垂直表单', 'url'=>url('Bootstrap/formvertical'), 'icon'=>'icon-leaf'),
                            )),
                        array('name'=>'布局组件', 'url'=>'#', 'icon'=>'icon-edit', 'child'=>array(
                                array('name'=>'网格系统', 'url'=>url('Bootstrap/grid'), 'icon'=>'icon-leaf'),
                                array('name'=>'字体图标', 'url'=>url('Bootstrap/layicon'), 'icon'=>'icon-leaf'),
                                array('name'=>'输入框组', 'url'=>url('Bootstrap/layinput'), 'icon'=>'icon-leaf'),
                                array('name'=>'导航', 'url'=>url('Bootstrap/laynav'), 'icon'=>'icon-leaf'),
                                array('name'=>'列表组', 'url'=>url('Bootstrap/laylist'), 'icon'=>'icon-leaf'),
                                array('name'=>'面板', 'url'=>url('Bootstrap/laypanel'), 'icon'=>'icon-leaf'),
                            )),
                    )),

                    array('name'=>'插件', 'url'=>'#', 'icon'=>'icon-table', 'child'=>array(
                        array('name'=>'文本编辑器', 'url'=>url('Addon/editor'), 'icon'=>'icon-leaf'),
                        array('name'=>'代码高亮', 'url'=>url('Addon/editorhl'), 'icon'=>'icon-leaf'),
                        array('name'=>'无限极分类', 'url'=>url('Addon/fenlei'), 'icon'=>'icon-leaf'),
                        array('name'=>'文章列表', 'url'=>url('Addon/artlist'), 'icon'=>'icon-leaf'),

                    )),

                    array('name'=>'收藏夹', 'url'=>'#', 'icon'=>'icon-table', 'child'=>array(
                        array('name'=>'手册网', 'url'=>'http://shouce.ren', 'icon'=>'icon-leaf'),
                        array('name'=>'菜鸟教程', 'url'=>'http://www.runoob.com/', 'icon'=>'icon-leaf'),
                        array('name'=>'百度', 'url'=>'http://baidu.com', 'icon'=>'icon-leaf'),
                        array('name'=>'一块乐', 'url'=>'http://12345.net', 'icon'=>'icon-pencil'),
                    )),

                );
        //dump($menu);

        $this->assign('menu', $menu);
        return $this->fetch();
    }

}