<?php
namespace app\common\model;

use think\Db;  //数据库模型

/**
 * 文章数据模型
 * @date 2016-11-24 16:28
 */
class AddonContent extends Base
{
    // protected $createTime = 'create_time';  // 添加时间
    // protected $updateTime = 'update_time';  // 修改时间

    // 1.添加文章
    public function addArticle($cid, $title, $content, $author){
        $data['cid'] = $cid;
        $data['title'] = $title;
        $data['describe'] = mb_substr(strip_tags($content), 0, 80, 'utf-8');
        $data['author'] = $author;
        $data['create_time'] = $data['update_time'] = time();

        //支持事务的功能，请确保数据表的类型为InnoDB 2016-12-07 14:32
        Db::startTrans();  // 1.启动事务
        try {
            $this->validate('AddonContent.add')->save($data);    //验证、添加
            $this->article()->save( array('content'=>$content) );
            Db::commit();  // 2.提交事务

            return true;
        } catch (\Exception $e) {
            Db::rollback();  // 3.回滚事务
            if (!$this->getError()) $this->error = "添加失败！或内容不能大于64k";

            return false;
        }

    }

    // 1.1模型--关联---一对一关联(新增、编辑文章--编辑时只能定义public ！！！)
    public function article(){
        return $this->hasOne('addon_content_data', 'aid', 'id'); // aid是id的关联外键
    }

    // 2.获取指定的文章
    public function getArticle($id){
        $prefix = config('database.prefix');  //数据库配置前缀
        $article = Db::query("SELECT * FROM {$prefix}addon_content a LEFT JOIN {$prefix}addon_content_data b ON a.`id`=b.`aid` WHERE a.`id`=$id ");  // 二维数组

        return $article[0];
    }

    // 3.编辑文章2016-12-05 16:45
    public function editArticle($id, $cid, $title, $content, $author){
        // 模型调用
        $art = self::get($id);

        // 压入数据
        // $art->cid = $cid;
        // $art->title = $title;
        // $art->describe = mb_substr(strip_tags($content), 0, 80, 'utf-8');
        // $art->author = $author;
        // $art->update_time = time();

        $data['cid'] = $cid;
        $data['title'] = $title;
        $data['describe'] = mb_substr(strip_tags($content), 0, 80, 'utf-8');
        $data['author'] = $author;
        $data['update_time'] = time();

        // 验证、添加
        if ($art->validate(true)->save($data)) {
            // 注意关联方法不需要小括号, 同时该方法只能定义public（坑！！！）
            $art->article->content = $content;
            $art->article->save();
            return true;
        }else{
            // if (!$this->getError()) $this->error = "编辑失败！";
            $this->error = $art->error ? $art->error : "编辑失败！";
            return false;
        }

    }



}