<?php
namespace app\common\controller;

class Home extends Base{

	public function _initialize(){
		parent::_initialize();

		//判读是否为关闭网站
		if (\think\Config::get('web_site_close')) {
			header("Content-type:text/html;charset=utf-8");
			echo $this->fetch('common@default/public/close');exit();
		}

		$this->setSeo();
		$this->setHoverNav();
	}

	protected function setMeta($title = ''){
		$this->assign('meta_title',$title);
	}

	//当前栏目导航
	protected function setHoverNav(){
		//dump($_SERVER['PHP_SELF']);
	}

	//设置SEO
	protected function setSeo($title = '', $keywords = '', $description = ''){
		$data = array(
			'title'       => $title,
			'keywords'    => $keywords,
			'description' => $description,
		);
		//获取还没有经过变量替换的META信息
		// $meta = model('SeoRule')->getMetaOfCurrentPage($seo);
		// foreach ($seo as $key => $item) {
		// 	if (is_array($item)) {
		// 		$item = implode(',', $item);
		// 	}
		// 	$meta[$key] = str_replace("[".$key."]", $item . '|', $meta[$key]);
		// }

		// $data = array(
		// 	'title'       => $meta['title'],
		// 	'keywords'    => $meta['keywords'],
		// 	'description' => $meta['description'],
		// );
		$this->assign($data);
	}

}
