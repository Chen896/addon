<?php
namespace app\common\validate;

class AddonCategory extends Base
{
    /**
     * 验证规则（在model中调用）
     * @date 2016-11-23 15:13
     */
    protected $rule = [
        ['name', 'require|min:2', '分类名称必须|名称不能短于2个字符'],
        ['name2', 'require|min:2', '分类名称2必须|名称2不能短于2个字符'],
    ];

    // 验证场景（$this->validate('addonCategory.add');）
    protected $scene = [
        'add' => ['name'],
    ];

}