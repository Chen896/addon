<?php
namespace app\api\controller;

use think\Db;
use app\api\model\Area;

class Index
{
    public function index()
    {
        //$data = model('area')->select();
        $data = Db::name('area')->where('parentid','=',0)->field('areaid,areaname,child')->select();
        $shi = Db::name('area')->where('parentid','<>',0)->group('parentid')->field('areaid,areaname')->select();

        $arr = array(
            array('areaid'=>'', 'areaname'=>'江浙沪', 'name'=>array('江苏','浙江','上海')),
            array('areaid'=>'', 'areaname'=>'珠三角', 'name'=>array('广州','深圳','珠海','佛山','惠州','肇庆','江门','中山','东莞')),
            array('areaid'=>'', 'areaname'=>'京津冀', 'name'=>array('北京','天津','河北')),
            array('areaid'=>'', 'areaname'=>'东三省', 'name'=>array('黑龙江','吉林','辽宁')),
            array('areaid'=>'', 'areaname'=>'港澳台', 'name'=>array('香港','澳门','台湾'))
        );

        $city = $shen = array();
        foreach($data as $val){
            if($val['child']){
                $shen[]=$val;
            }else{
                if(!in_array($val['areaname'], $arr[4]['name'])) $city[]=$val;
            }
            foreach($arr as $k=>$v){
                if(in_array($val['areaname'], $v['name'])) $arr[$k]['areaid'] .= ','.$val['areaid'];
            }
        }

        $zsj = Db::query("SELECT `areaid` FROM dt_area WHERE `areaname` in('广州市','深圳市','珠海市','佛山市','惠州市','肇庆市','江门市','中山市','东莞市') ");
        foreach($zsj as $j){
            $arr[1]['areaid'] .= ','.$j['areaid'];
        }
        $city = array_merge($city, $arr);

        foreach($city as $val){
            echo '<a href="'.$val['areaid'].'">'.str_replace('市','',$val['areaname']).'</a> ';
        }

        echo '<p>--------------------------></p>';
        foreach($shen as $val){
            echo '<a href="'.$val['areaid'].'">'.str_replace('市','',$val['areaname']).'</a> ';
        }

        echo '<p>--------------------------></p>';

        foreach($shi as $val){
            echo '<a href="'.$val['areaid'].'">'.str_replace('市','',$val['areaname']).'</a> ';
        }
    }
}
