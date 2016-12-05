<?php
namespace app\common\model;

/**
 * 文章数据模型
 * @date 2016-11-24 16:28
 */
class AddonContent extends Base
{
    protected $createTime = 'create_time';  // 添加时间
    //protected $updateTime = 'update_time';  // 修改时间

    // 1.添加文章
    public function addArticle($cid, $title, $content, $author){
        $data['cid'] = $cid;
        $data['title'] = $title;
        $data['describe'] = mb_substr(strip_tags($content), 0, 80, 'utf-8');
        $data['author'] = $author;
        $data['create_time'] = time();

        //验证、添加
        // $result = $this->validate(true)->save($data);
        $result = $this->validate('AddonContent.add')->save($data); //场景验证
        if ($result) {
            $this->article()->save( array('content'=>$content) );
            return $result;
        }else{
            if (!$this->getError()) $this->error = "添加失败！";
            return false;
        }

    }

    // 1.1模型--关联---一对一关联(新增文章)
    protected function article(){
        return $this->hasOne('addon_content_data', 'aid', 'id'); // aid是id的关联外键
    }

    // 2.获取指定的文章
    public function getArticle($id){
        // return $this->article()->find($id);
        return $this::get($id, 'article');
    }

    // 3.编辑文章
    public function editArticle($id, $cid, $title, $content, $author){
        $data['cid'] = $cid;
        $data['title'] = $title;
        $data['describe'] = mb_substr(strip_tags($content), 0, 80, 'utf-8');
        $data['author'] = $author;
        $data['create_time'] = time();

        //验证、添加
        // $result = $this->validate(true)->save($data);
        $result = $this->validate('AddonContent.add')->save($data); //场景验证
        if ($result) {
            $this->article()->save( array('content'=>$content) );
            return $result;
        }else{
            if (!$this->getError()) $this->error = "添加失败！";
            return false;
        }

    }


}