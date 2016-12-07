<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共函数

/**
 * 数据签名认证
 * @param  array  $data     被认证的数据
 * @return string           签名
 */
function data_auth_sign($data) {
    //数据类型检测
    if(!is_array($data)){
        $data = (array)$data;
    }
    ksort($data); //排序
    $code = http_build_query($data); //url编码并生成query字符串
    $sign = sha1($code); //生成签名
    return $sign;
}

/**
 * 检测用户是否登录
 * @return integer 0-未登录，大于0-当前登录用户ID
 */
function is_login(){
    $user = session('user_auth');
    if (empty($user)) {
        return 0;
    } else { // 数据签名验证(防止伪造登录)
        return session('user_auth_sign') == data_auth_sign($user) ? $user['uid'] : 0;
    }
}

/**
 * 检测当前用户是否为管理员
 * @return boolean true-管理员，false-非管理员
 */
function is_administrator($uid = null){
    $uid = is_null($uid) ? is_login() : $uid;
    return $uid && (intval($uid) === config('user_administrator'));
}

/**
 * 不区分大小写的in_array实现
 * @return  boolean
 */
function in_array_case($value,$array){
    return in_array(strtolower($value),array_map('strtolower',$array));
}

/**
 * 获取客户端IP地址
 * @param integer $type 返回类型 0 返回IP地址 1 返回IPV4地址数字
 * @param boolean $adv 是否进行高级模式获取（有可能被伪装）
 * @return mixed
 */
function get_client_ip($type = 0,$adv=false) {
    $type       =  $type ? 1 : 0;
    static $ip  =   NULL;
    if ($ip !== NULL) return $ip[$type];
    if($adv){
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $arr    =   explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            $pos    =   array_search('unknown',$arr);
            if(false !== $pos) unset($arr[$pos]);
            $ip     =   trim($arr[0]);
        }elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $ip     =   $_SERVER['HTTP_CLIENT_IP'];
        }elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $ip     =   $_SERVER['REMOTE_ADDR'];
        }
    }elseif (isset($_SERVER['REMOTE_ADDR'])) {
        $ip     =   $_SERVER['REMOTE_ADDR'];
    }
    // IP地址合法验证
    $long = sprintf("%u",ip2long($ip));
    $ip   = $long ? array($ip, $long) : array('0.0.0.0', 0);
    return $ip[$type];
}

/**
 * 时间戳格式化
 * @param int $time
 * @return string 完整的时间显示
 */
function time_format($time = NULL,$format='Y-m-d H:i'){
    $time = $time === NULL ? time() : intval($time);
    return date($format, $time);
}

/**
 * 创建目录
 */
function mk_dir($dir, $mode = 0755){
    if (is_dir($dir) || @mkdir($dir,$mode,true)) return true;
    if (!mk_dir(dirname($dir),$mode,true)) return false;
    return @mkdir($dir,$mode,true);
}

/**
 * 字符串转换为数组，主要用于把分隔符调整到第二个参数
 * @param  string $str  要分割的字符串
 * @param  string $glue 分割符
 * @return array
 */
function str2arr($str = '', $glue = ','){
    if ($str) {
        return explode($glue, $str);
    }else{
        return array();
    }
}

/**
 * 数组转换为字符串，主要用于把分隔符调整到第二个参数
 * @param  array  $arr  要连接的数组
 * @param  string $glue 分割符
 * @return string
 */
function arr2str($arr = array(), $glue = ','){
    if (empty($arr)) {
        return '';
    }else{
        return implode($glue, $arr);
    }
}

/**
 * 格式化字节大小
 * @param  number $size      字节数
 * @param  string $delimiter 数字和单位分隔符
 * @return string            格式化后的带单位的大小
 */
function format_bytes($size, $delimiter = '') {
    $units = array('B', 'KB', 'MB', 'GB', 'TB', 'PB');
    for ($i = 0; $size >= 1024 && $i < 5; $i++) $size /= 1024;
    return round($size, 2) . $delimiter . $units[$i];
}

/**
 * 设置状态属性
 */
function get_content_status($status){
    $text = array(
        '-1'  => '<span class="label label-danger">删除</span>',
        '0'   => '<span class="label label-default">禁用</span>',
        '1'   => '<span class="label label-primary">正常</span>',
        '2'   => '<span class="label label-info">待审核</span>'
    );
    return $text[$status];
}

/**
 * 发送邮件
 * @param string $to        收件人
 * @param string $subject   邮件主题
 * @param mixed $message    邮件内容
 * @return boolean          true-成功，false-失败
 */
function send_email($to, $subject, $message){
    $config = array(
        'protocol'  => 'smtp',
        'smtp_host' => config('mail_host'),
        'smtp_user' => config('mail_username'),
        'smtp_pass' => config('mail_password')
    );

    $email = new \com\Email($config);
    $email->from(config('mail_fromname'), config('web_site_title'));
    $email->to($to);

    $email->subject($subject);
    $email->message($message);

    return $email->send();
}

/**
 * 产生随机字串: 默认长度6位 字母和数字混合
 * @param string $len 长度
 * @param string $type 字串类型     1 数字 2 字母 其它 混合
 * @param string $addChars 额外字符
 * @return string
 */
function rand_string($len=6,$type='',$addChars='') {
    switch($type) {
        case 1:
            $chars= str_repeat('0123456789',3);
            break;
        case 2:
            $chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.$addChars;
            break;
        case 3:
            $chars='abcdefghijklmnopqrstuvwxyz'.$addChars;
            break;
        default :
            // 默认去掉了容易混淆的字符oOLl和数字01
            $chars='ABCDEFGHIJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz'.str_repeat('23456789', 3).$addChars;
            break;
    }

    return substr(str_shuffle($chars), 0, $len);
}