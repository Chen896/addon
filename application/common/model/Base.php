<?php
namespace app\common\model;

/**
* 模型基类
*/
class Base extends \think\Model{

	protected $type = array(
		'id'  => 'integer',
		'uid'  => 'integer',
	);

	/**
	 * 数据修改
	 * @return [bool] [是否成功]
	 */
	public function change(){
		$data = \think\Request::instance()->post();
		return $this->save($data, array('id'=>$data['id']));
	}
}