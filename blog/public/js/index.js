$(function(){
    var $loginBox = $('#loginBox');
    var $registerBox = $('#registerBox');

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
                console.log(data.message)
                $registerBox.find('.colWarning').html(data.message);

                if(!data.code){
                    setTimeout(function(){
                        $loginBox.show();
                        $registerBox.hide();
                    },1000)
                }
            }

        })
    })


})