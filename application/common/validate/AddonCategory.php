<?php
namespace app\common\validate;

/**
 * 分类模型数据验证
 * @date 2016-11-23 15:10
 */
class AddonCategory extends Base
{
    // 1.验证规则（在model中调用）
    protected $rule = array(
            'path' => 'require',
            'name' => 'require|min:2',
        );

    // 2.错误提示
    protected $message = array(
            'path.require' => '请选择分类父级',
            'name.require' => '分类名称必须',
            'name.min'     => '名称不能短于2个字符',
        );

    // 3.验证场景
    protected $scene = array(
            // 'add'  => 'path, name',   //----有bug：字段间不能空格(V5.0.0版本)----
            'add'  => 'path,name',       //可以忽略，直接 $this->validate(true)
            'edit' => 'name',            //调用 $this->validate('addonCategory.edit')
        );

}