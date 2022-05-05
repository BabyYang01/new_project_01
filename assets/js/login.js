// 入口函数
$(function () {
    $('#link_reg').on('click', function () {
        //点击注册账号的链接
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        //点击登录账号的链接
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从 layui中获取form对象  
    let form = layui.form
    let layer = layui.layer
    //通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义一个名为 pwd 的校验规则
        pwd: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 再拿到密码框中的内容
            // 进行判断，如果失败则return一个提示消息
            let pwd = $('#form_reg [name=password]').val()

            if (pwd !== value) {
                return '两次输入密码不相同'
            }
        }

    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起Ajax的POST请求
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post(
            '/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录！')
                // 模拟人的点击事件
                $('#link_login').click()


            }
        )
    })

    // 监听登录表单的提交事件(换一种提交方法)
    $('#form_login').submit(function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_login [name=username]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.post(
            '/api/login',
            // 快速获取表单中的数据
            //$(this).serialize()
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 将登录成功后先将得到的 token 字符串，保存到localStorage中(键值对的形式)
                let token = res.token
                localStorage.setItem('token',token)
                // 跳转到后台主页
                //location.href = '/index.html'
                

            }
        )
    }
    )

})

