<?php
namespace app\common\validate;

/**
 * 文章模型数据验证
 * @date 2016-11-24 17:35
 */
class AddonContent extends Base
{
    /**
     * 验证规则（在model中调用）
     * @date 2016-11-24 17:36
     */
    protected $rule = [
        ['cid', 'require', '请选择所属分类'],
        ['title', 'require|min:5', '文章标题不能为空|标题不能短于5个字符'],
        // ['content', 'require|min:25', '文章内容不能为空|内容不能短于25个字符'], //关联表的字段
        ['describe', 'require|min:25', '文章内容不能为空|内容不能短于25个字符'],
    ];

    // 验证场景（$this->validate('addonContent.add');）
    protected $scene = [
        'add' => ['cid', 'title', 'describe'],
        'edit'=> ['describe'],
    ];

}