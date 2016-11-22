<?php
// 后台模块的公共控制器
namespace app\common\controller;

use app\common\model\AuthRule;
use app\common\model\AuthGroup;

class Admin extends Base{

	/**
	 * 后台模块登录状态检查、权限审核、菜单设置
	 * @Author   Chen
	 * @DateTime 2016-08-09
	 * @return  void
	 */
	public function _initialize(){
		parent::_initialize();

		if (!in_array($this->url,array('admin/index/login', 'admin/index/logout', 'admin/index/verify'))) {
			// 登录状态检查
			// if(!is_login())
			// 	$this->redirect('admin/index/login');

			// 权限审核
			// $this->checkAuth();
		}
	}

	/**
	 * 权限审核
	 * @return void
	 */
	final private function checkAuth(){
		// 是否是超级管理员
		define('IS_ROOT',   is_administrator());
		if(!IS_ROOT && config('admin_allow_ip')){
			// 检查IP地址访问
			if(!in_array(get_client_ip(), explode(',', config('admin_allow_ip')))){
				$this->error('403:禁止访问');
			}
		}

		// 检测系统权限
		if(!IS_ROOT){
			$access = $this->accessControl();
			if (false === $access) {
				$this->error('403:禁止访问');
			}elseif(null === $access){
				$dynamic = $this->checkDynamic(); // 检测分类栏目有关的各项动态权限
				if($dynamic === null){
					// 检测访问权限
					if (!$this->checkRule($this->url, array('in','1,2'))){ // 认证方式，1为实时认证；2为登录认证。
						$this->error('未授权访问!');
					}else{
						// 检测分类及内容有关的各项动态权限
						$dynamic = $this->checkDynamic();
						if(false === $dynamic){
							$this->error('未授权访问!');
						}
					}
				}elseif($dynamic === false){
					$this->error('未授权访问!');
				}
			}
		}
	}

	/**
	* 权限检测
	* @param string  $rule    检测的规则
	* @param string  $mode    check模式
	* @return boolean
	*/
	final protected function checkRule($rule, $type=AuthRule::rule_url, $mode='url'){
		static $Auth = null;
		if(!$Auth)
			$Auth = new \com\Auth();

		if(!$Auth->check($rule, session('user_auth.uid'), $type, $mode)){
			return false;
		}
		return true;
	}

	/**
	 * 检测是否是需要动态判断的权限
	 * @return boolean|null
	 *      返回true则表示当前访问有权限
	 *      返回false则表示当前访问无权限
	 *      返回null，则表示权限不明
	 */
	protected function checkDynamic(){
		if(IS_ROOT){
			return true;// 超级管理员允许访问任何页面
		}
		return null;// 非超级管理员，需checkRule
	}

	/**
	 * action访问控制,在 **登陆成功** 后执行的第一项权限检测任务
	 * @return boolean|null  返回值必须使用 `===` 进行判断
	 *   返回 **false**, 不允许任何人访问(超管除外)
	 *   返回 **true**, 允许任何管理员访问,无需执行节点权限检测
	 *   返回 **null**, 需要继续执行节点权限检测决定是否允许访问
	 */
	final protected function accessControl(){
		$allow = config('allow_visit'); // 不受限控制器
		$deny  = config('deny_visit');  // 超管专限控制器

		$check = strtolower($this->request->controller().'/'.$this->request->action());
		if ( !empty($deny)  && in_array_case($check, $deny) ) {
			return false;//非超管禁止访问deny中的方法
		}
		if ( !empty($allow) && in_array_case($check, $allow) ) {
			return true;
		}
		return null;//需要检测节点权限
	}

	/**
	 * 向模版中分配(@#_menu表)主菜单 $__menu__
	 */
	protected function setMenu(){
		// $hover_url = $this->request->module().'/'.$this->request->controller();
		// $controller = $this->url;
		$menu = $nav = $list = [];

		$map['hide'] = 1;
		$map['type'] = 'admin'; // 后台菜单

		// 主菜单
		// 权限判断： if (!IS_ROOT && !$this->checkRule($value['url'],2,null))
		$row = db('menu')->where($map)->order('sort,id')->column('id,name,pid,url,icon', 'id');
		foreach($row as $v){
			if($v['pid'] <= 0){
				$menu[$v['id']] = $v;
			}else{
				if($v['url']){ $list[] = $v; }else{ $nav[] = $v; }
			}
		}
		foreach($nav as $vv){
			$menu[$vv['pid']]['menus2'][$vv['id']] = $vv;
		}
		foreach($list as $vvv){
			$menu[$row[$vvv['pid']]['pid']]['menus2'][$vvv['pid']]['menus3'][] = $vvv;
		}

		return $menu;
	}

	/**
	 * 向模版中分配页面标题 $meta_title
	 */
	protected function setMeta($title = ''){
		$this->assign('meta_title',$title);
	}
}
