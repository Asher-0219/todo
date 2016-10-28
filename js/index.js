$(function () {
    var v = null;
    var todos = [];
    var list = $('.list');
    var input = $('.shuchu input');
    var left = null;
    //添加数据
    if (localStorage.todo_data) {
        todos = JSON.parse(localStorage.todo_data);
        rander();
    } else {
        localStorage.todo_data = JSON.stringify(todos);
    }
    function add(todos) {
        todos.push({
            title: v,
            state: "0",
            isDel: "0"
        });
        localStorage.todo_data = JSON.stringify(todos);
        rander();
    }

    //创建一个li
    function rander() {
        list.empty();
        $(todos).each(function (i, v) {
            $('<li><div class="input-box"><input type="text"><i></i></div></input><span class="title">' + v.title + '</span><i class="icon-font icon-iconfontcha delete"></i></li>').addClass(function () {
                if (v.state) {
                    return "done";
                }
            }).appendTo(list);
        })
    }

//日期
    var time = new Date();
    var yue = time.getMonth() + 1;
    var ri = time.getDate();
    var zhou = time.getDay();
    var show_day=new Array('日','一','二','三','四','五','六');
    $('.time').text(yue + "月" + ri + "日" + "(" + "周" + show_day[zhou] + ")");
    //添加一条信息
    $('.yuan').on('touchstart', function () {
        $(this).removeClass('active act');
        $('.shuchu').removeClass('active act');
        input.val(input.val()).trigger('focus');
        $('.shuchu').addClass('active');
        $(this).addClass('active');
    });
    $('.icon-fanhui').on('touchstart', function () {
        $('.shuchu').addClass('act');
        $('.yuan').removeClass('active').addClass('act');
        if ($('.content').has('.list')) {
            $('.content img').remove();
            $('.content').css('background', '#fff');
            $('.content .content-text').remove();
        }
        v = input.val();
        if (v == "") {
            return;
        }
        input.val("");
        add(todos);
    })

    //滑动删除

    list.on('touchstart', 'li', function (e) {
        left = e.originalEvent.changedTouches[0].pageX;
    });
    list.on('touchmove', 'li', function (e) {
        var i = $(this).index();
        var n = e.originalEvent.changedTouches[0].pageX;
        var x = n - left;
        $(this).find('.bg').width(x);
        $(this).css('transform', 'translate3d(' + x + 'px,0,0)');
        if (x < 0) {
            list.css('background', '#ffb60c')
        } else {
            list.css('background', 'green')
        }
        if (x < 100) {
        }
        if (x > 100) {
            $(this).addClass('del').delay(800).queue(function () {
                $(this).removeClass('del').remove().dequeue();
            });
            todos.splice(i, 1);
            localStorage.todo_data = JSON.stringify(todos);
        }
    });
    list.on('touchend', 'li', function (e) {
        $(this).css('transform', 'translate3d(0,0,0)');
        $(this).css('transition', 'transform 0.8s ease');
        $(this).delay(800).queue(function () {
            $(this).css('transition', 'none').dequeue()
        })
    });
    list.on('click', '.delete', function (e) {
        var i = $(this).closest('li').index();
        $(this).closest('li').addClass('dele').queue(function () {
            $(this).removeClass('dele').remove().dequeue();
        });
        todos.splice(i, 1);
        localStorage.todo_data = JSON.stringify(todos);
        e.stopPropagation();
        if (todos.length !== 0) {
            $('.content').css('background', '#fff');
            $('.content .content-text').css('display', 'none');
        } else {
            $('.content').css('background', '#f45b4c');
            $('.content .content-text').css('display', 'block');
        }
    })
    $('.icon-comiiscaidan').on('touchstart', function () {
        $('.menu').removeClass('active act');
        $('.menu').addClass('active');
        $('.box').css('background', 'rgba(0,0,0,0.4)')
        $('.box').css('zIndex', '3')
    })
    $('.menu-list li').on('touchstart', function () {
        $('.menu-list li').removeClass('active');
        $(this).addClass('active').delay(300).queue(function () {
            $('.box').css('background', 'rgba(0,0,0,0)')
            $('.box').css('zIndex', '0')
            $('.menu').addClass('act')
            $(this).dequeue();
        });
    })

    $('.icon-gengduo').on('touchstart', function () {
        $('.finish').addClass('active');
    })
    $('.content').on('touchstart', function () {
        $('.finish').removeClass('active');
    })
    $('.finish').on('touchstart', function () {
        $('.finish').removeClass('active');
        $('.tongzhi').addClass('active');
        $('.box').css('background', 'rgba(0,0,0,0.4)')
        $('.box').css('zIndex', '3')
    })
    $('.box').on('touchstart', function () {
        $('.menu').addClass('act');
        $('.tongzhi').removeClass('active');
        $('.box').css('background', 'rgba(0,0,0,0)')
        $('.box').css('zIndex', '0')
    })

    list.on('click', 'li', function () {
        $(this).find('div').addClass('active');
        $(this).find('span').css('display', 'none');
        $(this).find('i').css('display', 'none');
    })

    $('.input-box input').on('blur', function () {
        var vv = $(this).val();
        $(this).parent().next().css('display', 'block').text(vv);
        var index = $(this).closest('li').index();
        todos[index].title = vv;
        localStorage.todo_data = JSON.stringify(todos);
        $(this).parent().next().next().css('display', 'block');
        $(this).parent().removeClass('active');
        $(this).val('');
    })
    //时间
})