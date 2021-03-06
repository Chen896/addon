<?php
namespace app\admin\controller;
use app\common\controller\Admin;

class Index extends Admin
{
    public function index()
    {
        $this->setMeta('后台首页');
        return $this->fetch();
    }

    public function main()
    {
        return view();
    }

    public function login($username = '', $password = '', $verify = '')
    {
        if (IS_POST) {
            if (!$username || !$password) {
                return $this->error('用户名或者密码不能为空！','');
            }

            //验证码验证
            $this->checkVerify($verify);

            $user = model('User');
            $uid = $user->login($username,$password);

            // 禁止普通会员登录（非后台管理员）
            // TODO================================================================

            if ($uid > 0) {
                return $this->success('登录成功！',url('admin/index/index'));
            }else{
                switch($uid) {
                    case -1: $error = '用户不存在或被禁用！'; break; //系统级别禁用
                    case -2: $error = '密码错误！'; break;
                    default: $error = '未知错误！'; break; // 0-接口参数错误（调试阶段使用）
                }
                return $this->error($error,'');
            }
        }else{
            return $this->fetch();
        }
    }

    public function logout()
    {
        $user = model('User');
        $user->logout();
        $this->redirect('index/login');
    }
}
