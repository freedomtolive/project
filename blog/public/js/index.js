$(function(){
    var $loginBox = $('#loginBox');  //登陆面板
    var $registerBox = $('#registerBox'); //注册面板
    var $userInfo = $('#userInfo'); //登陆后的面板

    //切换到注册面板
    $loginBox.find('a').click(function(){
        $loginBox.hide();
        $registerBox.show();
    })

    //切换到登录面板
    $registerBox.find('a').click(function(){
        $loginBox.show();
        $registerBox.hide();
    })

    //通过ajax发送或请求数据
    //注册
    $registerBox.find('button').click(function(){
        $.ajax({
            url:'/api/user/register',
            type:'post',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val()
            },
            dataType: 'json',
            success:function(data){
                $registerBox.find('.colWarning').html(data.message);

                //注册成功
                if(!data.code){
                    setTimeout(function(){
                        $loginBox.show();
                        $registerBox.hide();
                    },1000)
                }
            }

        })
    })

    //登陆
    $loginBox.find('button').click(function(){
        $.ajax({
            url:'/api/user/login',
            type:'post',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success:function(data){
                $loginBox.find('.colWarning').html(data.message);

                //登陆成功
                if(!data.code){
                    window.location.reload();
                }
            }
        })
    })

    //退出
    $userInfo.find('#logout').click(function(){
        $.ajax({
            url:'/api/user/logout',
            type:'get',
            success:function(data){
               if (!data.code) {
                    window.location.reload();
                }
            }
        })
    })
})