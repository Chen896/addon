<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitdd3f331d7b4b8a27f066443208180053
{
    public static $prefixLengthsPsr4 = array (
        't' => 
        array (
            'think\\composer\\' => 15,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'think\\composer\\' => 
        array (
            0 => __DIR__ . '/..' . '/topthink/think-installer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitdd3f331d7b4b8a27f066443208180053::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitdd3f331d7b4b8a27f066443208180053::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}