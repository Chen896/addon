<?php
// 模块的公共控制器
namespace app\common\controller;

class Base extends \think\Controller{

	protected $url;
	protected $request;
	protected $module;
	protected $controller;
	protected $action;

    /**
     * 控制器的方法不存在时，触发
	 * @Author   Chen
	 * @DateTime 2016-08-29
     */
    public function _empty($name){
    	header("HTTP/1.0 404 Not Found");

        echo '404页面';
    }

	/**
	 * 设置数据库中的配置、与获取request信息
	 * @Author   Chen
	 * @DateTime 2016-08-05
	 */
	public function _initialize(){
		// 读取缓存配置文件
		$config =   cache('db_config_data');

		// if(!$config){ // 从数据库中获取、并缓存
		// 	$config =   model('Config')->lists();
		// 	cache('db_config_data',$config);
		// }
		// config($config); // 合并到系统配置

		// 获取request信息
		$this->requestInfo();
	}

	/**
	 * 生成js配置文件
	 */
	public function config(){
		$public = config('view_replace_str')['__PUBLIC__'];

		$data = 'var PATH_ROOT = "'.__ROOT__.'";';
    	$data.= 'var PUBLIC = "'.$public.'";';
    	echo $data;
	}

	/**
	 * 验证码
	 * @param  integer $id 验证码ID
	 */
	public function verify($id = 1){
		$verify = new \org\Verify(array('length'=>4));
		$verify->entry($id);
	}

	/**
	 * 检测验证码
	 * @param  integer $id 验证码ID
	 * @return boolean     检测结果
	 */
	public function checkVerify($code, $id = 1){
		if ($code) {
			$verify = new \org\Verify();
			$result = $verify->check($code, $id);
			if (!$result) {
				return $this->error("验证码错误！", "");
			}
		}else{
			return $this->error("验证码为空！", "");
		}
	}

	/**
	 * request信息
	 */
	protected function requestInfo(){
		$this->request    = \think\Request::instance();	// 初始化
		$this->param = $this->request->param(); // 请求参数

		// defined('MODULE_NAME') or define('MODULE_NAME', $this->request->module());
		// defined('CONTROLLER_NAME') or define('CONTROLLER_NAME', $this->request->controller());
		// defined('ACTION_NAME') or define('ACTION_NAME', $this->request->action());
		defined('IS_POST') or define('IS_POST', $this->request->isPost());
		defined('IS_GET') or define('IS_GET', $this->request->isGet());

		$this->url = $this->request->module() . '/' . $this->request->controller() . '/' . $this->request->action();
		$this->assign('request',$this->request);
		$this->assign('param',$this->param);
	}


}
