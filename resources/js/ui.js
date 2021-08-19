//smooth_selector = '.smooth, .section > *, .history_cont > *, .busi_icons li, .section.main *:not(.dots,.dots span), .section li:not(.module_info li), .clients dl, .rnl *, dt:not(.module_info dt,.footer dt), dd:not(.module_info dd,.footer dd), .module_info_set > *, .mob_main *';
(function(){
    var ui = {
        init:function(){
            this.addEvent();
            this.jsTab();
            this.selectbox(); // custom select box
            $('.container.main').length && this.main(); 
        },
        addEvent:function(){
			$('.top_banner .btn_close').on('click', function(){console.log(111)
				$('.top_banner').animate({height: 0}, 500, function(){
					$('.top_banner').hide()
				});
			});
        },
        jsTab:function(){
            $(document).on('click', '[data-click="tab"]', function(e){
                e.preventDefault();
                var thisTab = $(this),
                    thisContents = $('#' + $(this).attr('href'));

                thisTab.parent().addClass('active').siblings().removeClass('active');
                thisContents.addClass('active').siblings().removeClass('active');
            });
        },
		selectbox:function(){
            var thisSelect
            $(document).on('click', '.fs_selected', function(){console.log(111)
                thisSelect = $(this).parent();
                if(thisSelect.hasClass('readonly')){
                    return false;
                }
                if($('.form_selectbox.open').not($(this).parent()).length){
                    $('.form_selectbox.open').removeClass('open')
                }
                thisSelect.toggleClass('open')
            })
            $(document).on('click', '.fs_list li button', function(){console.log(111)
                thisSelect.find('.fs_selected').text($(this).text()).attr('data-selected-value', $(this).attr('data-value')).css('color','#333');
                thisSelect.removeClass('open')
            })
        },
		main:function(){
			var swiper = new Swiper('.swiper-container', {
				loop: true,
				pagination: {
					el: ".swiper-pagination",
					type: "fraction",
				},
				navigation: {
					nextEl: ".swiper-button-next",
					prevEl: ".swiper-button-prev",
				},
			});
            $('.swiper-button-next').on('click', function(){
				var num = $(this).parent().find('.swiper-pagination-current').text();
				var total = $(this).parent().find('.swiper-pagination-total').text();
				num = parseInt(num) + 1;
				if(num > total){
					num = 1;
				}
				
				$('.bigimg').append('<img class="next" src="../../resources/image/main/insight_sl0'+ num +'.png" alt="">')
				$('.bigimg img').animate({
					right: '0px'
				}, 250);
            });
			$('.swiper-button-prev').on('click', function(){
				var num = $(this).parent().find('.swiper-pagination-current').text();
				var total = $(this).parent().find('.swiper-pagination-total').text();
				num = parseInt(num) - 1;
				if(num < 1){
					num = total;
				}
				$('.bigimg').append('<img class="prev" src="../../resources/image/main/insight_sl0'+ num +'.png" alt="">')
				$('.bigimg img').animate({
					left: '0px'
				}, 500);
				
            });
        },
        
    }

    var hcLayer = {
        init:function(){
            this.$btn_ly = $('.btn_ly');
            this.$btn_ly2 = $('.btn_ly2');
            this.$btn_ly_close = $('[data-dismiss="modal"]');
            this.addEvent();
        },
        addEvent:function(){
            var _this = $(this);
            this.$btn_ly.on('click', function(){
                var $target = $(this).attr('class').split(' ')[1];
                hcLayer.show($target);
            });
            this.$btn_ly2.on('click', function(){
                $('.layer').hide()
                $(this).siblings('.layer').show()
            });
            this.$btn_ly_close.on('click', function(){
                var thisLayer = $(this).closest('.layer');
                hcLayer.hideEvent(thisLayer);
                if($(this).attr('data-focus-prev')){
                    $('.' + $(this).attr('data-focus-prev')).focus();
                }else{
                    $('.' + thisLayer.attr('id')).focus();
                }
            });
        },
        show:function(target){
            var showLayer = $('#' + target),
            showLayerLeft = ($(window).width() - showLayer.outerWidth(true)) / 2,
            showLayerTop = ($(window).height() - showLayer.outerHeight(true)) / 2;
            if($(window).height() <= showLayer.outerHeight(true)){
                showLayerTop = 0;
            }
            $('.layer').hide();
            $('.dim').hide();
            
            showLayer.css({'left':showLayerLeft, 'top': $(window).scrollTop() + showLayerTop}).attr("tabindex", 0).show().focus();
            $('body').append('<span class="dim"></span>');
        },
        hide:function(target){
            var hideLayer = $('#' + target);
            this.hideEvent(hideLayer);
        },
        hideEvent:function(target){
            target.attr("tabindex", -1).hide().fadeOut(0);
            $('.dim').hide();
        }
    }

    ui.init();
    hcLayer.init();
}());


// ===============
//smooth_selector = '.smooth, .section > *, .history_cont > *, .busi_icons li, .section.main *:not(.dots,.dots span), .section li:not(.module_info li), .clients dl, .rnl *, dt:not(.module_info dt,.footer dt), dd:not(.module_info dd,.footer dd), .module_info_set > *, .mob_main *';
smooth_selector = '.section';

$(function(){
	setTimeout(function(){
		$('html,body').scrollTop(0);
	},100);
	//txt_show();
	// clock();
	// setInterval(clock,1000);
	// gnb();
	// bnw();
	smooth();
	// resize();
	// $(window).resize(resize);

	var url = document.location.href;
	if(url.match('/eng/')){
		$('<link rel="stylesheet" href="/renewer/resources/css/eng.css">').appendTo($('head'));
	}

	

	$('.action_emblem').animate({
		right:'205px',
		opacity:'1'
	},1000,'easeOutBack',function(){
		action_emblem();
		setInterval(function(){
			action_emblem();
		},12000);
	});

	
	$(smooth_selector).each(function(){
		if($(this).offset().top > $(window).height() - 50){
			$(this).css({
				opacity:'0',
				transform:'translateY(50px)'
			});
		}
	});

	var static_st = $('html,body').scrollTop();
	$(window).scroll(function(){
		var bw = $(window).width();
		var bh = $(window).height();
		var st = $('html,body').scrollTop();
		smooth();
		if(st > bh / 2){
			$('.footer .top').stop(true,true).css('display','block');
			//$('.footer .rb').stop(true).animate({height:'140px'});
		}else{
			$('.footer .top').stop(true,true).css('display','none');
			//$('.footer .rb').stop(true).animate({height:'60px'});
		}
		bnw();

		if(bw > 768){
			if(st > 100){
				$('.gnb > ul').addClass('off');
			}else{
				//$('.gnb > ul').removeClass('off');
			}
		}else if(bw < 768){
			if($('.lnb').length){
				if(static_st > st){
					$('.lnb').css({top:'60px'});
					$('.header').css({top :'0px'});
				}else{
					if(st > 60){
						$('.lnb').css({top:'0px'});
						$('.header').css({top :'-60px'});
					}else{
						$('.lnb').css({top:60 - st});
						$('.header').css({top :- st});
					}	
				}
			}
		}

		static_st = st;

		if(bw > 768){
			var foot_top = Math.floor($('html,body').height() - (bh + 750));
			var con_h = $('html,body').height();
			if(st > foot_top){
				$('.foot_img .inner').stop().css({height :(st - foot_top) + 'px'},0);
			}else{
				$('.foot_img .inner').stop().css({height :0},0);
			}	
		}

		var foot_top = $('.footer').offset().top;
		if($('.stopper').length) var stopper_top = $('.stopper').offset().top;
		var std_t = ($('.stopper').length) ? stopper_top : foot_top;
		var std_h = std_t - ((bw / 3));
		if(st > std_h){
			$('.scroll_paging').css({
				marginTop : '-' + (st - std_h) - 100 + 'px'
			});
		}else{
			$('.scroll_paging').css({
				marginTop : '-100px'
			});
		}
	});

	// $('.footer .top').click(function(){
	// 	$('html,body').animate({scrollTop:'0'});
	// });

	// setTimeout(function(){
	// 	lines();
	// },2000);

	if($('.scroll_paging').length){
		$(window).scroll(function(){
			var st = $(window).scrollTop();
			$('.section').each(function(){
				var bh = $(window).height();
				var my_t = $(this).offset().top - 700;
				var idx = $(this).index();
				if(st > my_t){
					$('.scroll_paging li').eq(idx).addClass('on').siblings().removeClass('on');
				}
			});
		});

		$('.scroll_paging li a').click(function(){
			var idx = $(this).parent().index();
			var top = $('.section').eq(idx).offset().top;
			$('html,body').animate({scrollTop:top});
		});
	}

	// $('.history_select > a').click(function(){
	// 	$(this).addClass('on');
	// });
	// $('.history_select > div').on('click mouseleave',function(){
	// 	$(this).siblings().removeClass('on');
	// });

	// $('.footer').clone(true).appendTo($('.layer_footer'));
	// $('.layer_footer .foot_img').remove();


	// $('.lnb > a').click(function(){
	// 	$(this).next().show();
	// });
	// $('.lnb > div').click(function(){
	// 	$(this).hide();
	// });

	// $('.history_more').click(function(){
	// 	var idx = $('.history_cont dl:visible').last().index();
	// 	var max_idx = $('.history_cont dl').last().index();
	// 	$('.history_cont dl').each(function(){
	// 		var my_idx = $(this).index();
	// 		if(my_idx > idx && my_idx < (idx + 4)){
	// 			$(this).fadeIn();
	// 			if(idx > max_idx - 3){
	// 				$('.history_more').hide();
	// 			}
	// 		}
	// 	});
	// });

	// $('.gnb .menu a').click(function(){
	// 	var bw = $(window).width();
	// 	$('.all_menu_wrap').fadeIn();
	// 	$('.footer .rb').hide();
	// 	all_menu();
	// 	if(bw < 768){
	// 		$('.search,.search_set,.lang').show();
	// 		$('.lnb').hide();
	// 		$('.alls dt a,.alls dd').removeAttr('style').removeAttr('class');
	// 	}
	// });

	// $('.gnb .menu a').mouseenter(function(){
	// 	$('.gnb ul').removeClass('off');
	// });
	// $('.gnb ul').mouseleave(function(){
	// });

	// $('.alls dt a').click(function(){
	// 	var bw = $(window).width();
	// 	var dt = $(this).closest('dt');
	// 	var dd = $(this).closest('dl').find('dd');
	// 	if(bw < 768){
	// 		if($(this).hasClass('off')){
	// 			$(this).removeClass('off');
	// 			dt.css('border-width','0 0 3px');
	// 			dd.slideDown();
	// 		}else{
	// 			$(this).addClass('off');
	// 			dt.css('border-width','0');
	// 			dd.removeAttr('style');
	// 			dd.slideUp();
	// 		}
	// 	}
	// });

	// $('.alls_x').click(function(){
	// 	var bw = $(window).width();
	// 	$('.all_menu_wrap').fadeOut();
	// 	$('.footer .rb').show();
	// 	if($('.gnb ul').hasClass('off')){
	// 		$('.gnb ul').removeClass('off');
	// 	}
	// 	if(bw < 768){
	// 		$('.search,.lang').hide();
	// 		$('.lnb').show();
	// 	}
	// });

	// $('.search > a').click(function(){
	// 	$('.search_set').fadeIn();
	// });
	// $('.search_set .x').click(function(){
	// 	$('.search_set').fadeOut();
	// });

	$('.insight .left_area .dots span').click(function(){
		var idx = $(this).index();
		$(this).addClass('on').siblings().removeClass('on');
		$(this).closest('.insight').find('.swiper-pagination-bullet').eq(idx).click();
	});

	// $('.layer .menu a').click(function(){
	// 	$('.layer.on').fadeOut();
	// 	setTimeout(function(){$('.layer.on').removeClass('on')},400);
	// 	$('.gnb .menu a').click();
	// });

});

function lines(){
	$('.main_bg div').each(function(){
		var idx = $(this).index();
		$(this).delay(idx * 100).fadeIn(400).css({'transform':'rotate(' + ((idx * 5) - 7) + 'deg)'});
	});
}

function clock(){
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	var apm;
	if(h > 12){
		h = h - 12;
		apm = ' PM';
	}else{
		apm = ' AM';		
	}
	if(m < 10){
		m = '0' + m
	}
	var colon = (s % 2 == 0) ? '<span> :</span>' :'<span style="opacity:0"> :</span>';
	$('.clock').html(h + colon + m + apm);
}

function smooth(){
	$(smooth_selector).each(function(){
		var $this = $(this);
		var bh = $(window).height() - 50;
		var st = $(window).scrollTop();
		var my_top = $(this).offset().top;
		var tag = $(this).prop('tagName').toLowerCase();
		if(tag == 'li' || tag == 'dd'){
			var idx = $(this).index() * 70;
		}
		if(my_top < bh + st){

			if(tag == 'li'){
				if($this.closest('.clients,.bul_check')){
					$this.css({
						opacity:'1',
						transform:'translateY(0px)',
						transitionDuration:'1s'
					});						
				}else{
					$this.delay(idx).queue(function(){
						$this.css({
							opacity:'1',
							transform:'translateY(0px)',
							transitionDuration:'1s'
						});
					});	
				}
			}else{
				$this.css({
					opacity:'1',
					transform:'translateY(0px)',
					transitionDuration:'1s'
				});	
			}
		}
	});
}

function txt_show(){
	var bw = $(window).width();
	var ea = $('.main_txt span').length;
	$('.main_txt span').each(function(){
		var idx = $(this).index();
		if(bw > 768){
			$(this).delay(idx * 50).animate({opacity:'1',marginLeft:'0'},800,'easeOutBack',function(){
				if($(this).is(':visible') && !$(this).next().length){
					if($('.main_visual').hasClass('main')) $('.main_txt_sub').addClass('on');
				}
			});
		}else{
			$(this).delay(idx * 50).animate({opacity:'1',marginLeft:'0'},800,'easeInOutSine',function(){
				if($(this).is(':visible') && !$(this).next().length){
					if($('.main_visual').hasClass('main')) $('.main_txt_sub').addClass('on');
				}
			});
		}
	});
}

function action_emblem(){
	setTimeout(function(){
		$('.rect01').stop(true).animate({opacity:'0'},1000,'easeInOutQuad',function(){
			$(this).css({
				left:'70px',
				top:'10px'
			});
		});
		$('.rect03').stop(true).animate({opacity:'1'},1000,'easeInOutQuad');
		$('.rect02').stop(true).animate({
			right:'200px',
			opacity:'0'
		},1000,'easeInOutQuad',function(){
			$(this).css({
				right:'126px',
				zIndex:'1'
			});
		});
		$('.rect06').stop(true).animate({
			top:'0px',
			backgroundPositionY:'-57px'
		},1000,'easeInOutQuad',function(){
			setTimeout(function(){
				$('.rect03').stop(true).animate({
					opacity:'0',
					left:'60px'
				},1000,'easeInOutQuad',function(){
					$(this).css('left','0');
				});
				$('.rect04').stop(true).animate({
					opacity:'1',
					left:'60px'
				},1000,'easeInOutQuad');
				$('.rect06').stop(true).animate({
					left:'49px',
					top:'111px',
					backgroundPositionY:'-114px',
					zIndex:'1'
				},1000,'easeInOutQuad',function(){
					setTimeout(function(){
						$('.rect04').stop(true).animate({opacity:'0'},1000,'easeInOutQuad',function(){
							$(this).css('left','0');
						});
						$('.rect06').stop(true).animate({opacity:'0'},1000,'easeInOutQuad');
						$('.rect02').stop(true).animate({opacity:'1'},1000,'easeInOutQuad');
						$('.rect05').stop(true).animate({
							opacity:'1',
							left:'70px',
							top:'10px'
						},1000,'easeInOutQuad',function(){
							setTimeout(function(){
								$('.rect06').stop(true).animate({
									opacity:'1',
									top:'111px',
									left:'83px',
									backgroundPositionY:'0'
								},1000,'easeInOutQuad');
								$('.rect02').stop(true).animate({
									right:'0px'
								},1000,'easeInOutQuad');
								$('.rect05').stop(true).animate({
									left:'0px',
									top:'0px',
									opacity:'0'
								},1000,'easeInOutQuad',function(){
									$(this).css({
										left:'60px',
										top:'0px'
									});
								});
								$('.rect01').stop(true).animate({
									opacity:'1',
									left:'0px',
									top:'0px'
								},1000,'easeInOutQuad');
							},2000);
						});
					},2000);
				});
			},2000);
		});
	},2000);
}

function resize(){
	var bw = $(window).width();
	var bh = $(window).height();
	var left = (bw - 1920) / 2;
	

	if(bw < 1920){
		$('.gnb ul').addClass('off');
	}else{
		$('.gnb ul').removeClass('off');
	}

	console.log(bw);

	var lth = $('.layer_top').height();
	$('.layer_cont').each(function(){
		if(!$(this).closest('.layer').hasClass('hunel')){
			$(this).css({height:bh - lth});	
		}
	});

	var lm = (bw - 940) / 2;

	if(bw > 940){
		$('.layer_body .gray_bg').css({
			width:bw,
			marginLeft:- ((bw - 940) / 2)
		});
	}

	if(bw > 936){
		var ww = $('.ticon_ul.in_jade').width();
		$('.ticon_ul.in_jade').css({
			marginLeft :- ((ww - 936) / 2)
		});
	}else if(bw < 936){
		$('.ticon_ul.in_jade').css({
			marginLeft :'-50px'
		});
	}

	$('.career .main_visual .bg, .career .sect_index').css('height',bh);

	if(bw > 768) $('.header').removeAttr('style');

	all_menu();

}

function gnb(){
	$('.gnb > ul > li > a').mouseenter(function(){
		$('.gnb > ul > li > div').stop(true,true);
		$(this).next().slideDown().parent().siblings().children('div').slideUp();
	});
	$('.gnb > ul').mouseleave(function(){
		$(this).find('div').slideUp();
		//$(this).find('li:not(.on) div').slideUp();
		//$(this).find('li.on div').slideDown();
	});
}

function bnw(){
	$('.dark').each(function(){
		var st = $(window).scrollTop();
		var top = $(this).offset().top;
		var h = $(this).outerHeight(true);
		var half = h / 2;
		if(st >= top - half && st < top + half){
			$('.header,.search,.lang,.scroll_paging').addClass('white');
			black();
		}else{
			$('.header,.search,.lang,.scroll_paging').removeClass('white');
			white();
		}	
	});
}

function black(){
	//$('html').addClass('night');
	$('img').each(function(){
		var src = $(this).attr('src');
		if(src.match('_b.')){
			$(this).attr('src',$(this).attr('src').replace('_b.','_w.'));
		}
	});
}

function white(){
	//$('html').removeClass('night');
	$('img').each(function(){
		var src = $(this).attr('src');
		if(src.match('_w.')){
			$(this).attr('src',$(this).attr('src').replace('_w.','_b.'));
		}
	});
}

function all_menu(){
	var bw = $(window).width();
	var bh = $(window).height();
	$('.all_menu_wrap').css({
		height :bh
	});

	if(bw < 768){
		$('.alls').css({
			height :bh - 170,
			overflowY :'auto'
		});
	}else{
		$('.alls').removeAttr('style');
	}
}