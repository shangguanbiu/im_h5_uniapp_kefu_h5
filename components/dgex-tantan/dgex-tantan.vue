<template>
	<view class="tantan-slide" :style="{
		width: winWidth + 'px',
		height: winHeigh + 'px',
	}">
		<view class="tantan-slide-footer">
			<view class="tantan-slide-footer-btn" @click="footerBtnClick('dislike')">
				<view class="tantan-slide-footer-icon" :style="{
					backgroundColor: '#f8ba35',
					opacity: dislike,
					zIndex: 1
				}">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/dgex-tantan/close_white.png">
					</image>
				</view>
				<view class="tantan-slide-footer-icon">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/dgex-tantan/close.png"></image>
				</view>
			</view>
			<view class="tantan-slide-footer-btn" @click="footerBtnClick('love')">
				<view class="tantan-slide-footer-icon" :style="{
					backgroundColor: '#fa547c',
					opacity: love,
					zIndex: 1
				}">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/dgex-tantan/like_white.png">
					</image>
				</view>
				<view class="tantan-slide-footer-icon">
					<image style="width: 50rpx;height: 50rpx;" src="../../static/dgex-tantan/like.png"></image>
				</view>
			</view>
		</view>
		<view @touchstart.capture="touchStart($event,currentIndex)"
			@touchmove.stop.capture="touchMove($event,currentIndex)" @touchend.capture="touchEnd(currentIndex)"
			class="tantan-slide-box">
			<template v-for="(item, index) in list">
				<view class="tantan-slide-box-item" :key="index" v-if="currentIndex + visible >= index"
					@click.stop="clickImage" :style="[cardTransform(item, index)]">
					<!-- 加载图片会闪屏 双if避免 -->
					<template v-if="currentIndex + visible >= index && currentIndex <= index">
						<view class="tantan-slide-direction" :animation="currentIndex === index ? animationData : ''">
							<image class="tantan-slide-img" mode="aspectFill" :src="item.nearby_img"></image>
							<view class="tantan-slide-box-item-bg">
								<view class="tantan-slide-box-info">
									<view class="title" v-if="item.realname" v-text="item.realname"></view>
									<view class="desc" @tap="see_more">

										<view class="talk_sex p_type1" style=" height: 20px;" v-if="item.sex==0">
											<view class="sex_ico">
												<image src="@/static/image/nv_b.png" style="width: 100%;"
													mode='widthFix'></image>
											</view>
											<view style="font-weight: normal; font-size: 13px;">{{item.ages}}</view>
										</view>
										<view class="talk_sex p_type2" style="height: 20px;" v-if="item.sex==1">
											<view class="sex_ico">
												<image src="@/static/image/nan_b.png" style="width: 100%;"
													mode='widthFix'></image>
											</view>
											<view style="font-weight: normal; font-size: 13px;">{{item.ages}}</view>
										</view>

										<view>{{item.isfar+'km·'+$t('nearby.actie_times')+item.istime+$t('nearby.actie_time')}}</view>
										<view class="about_more">{{$t('nearby.detail')}} <view class="cuIcon-unfold"></view>
										</view>
									</view>

									<view class="tags" v-if="item.tags">
										<text class="tag" v-for="(item1, index1) in item.tags.split(',')" :key="index1"
											v-text="item1"></text>
									</view>
								</view>
							</view>
						</view>
						<view v-if="index === currentIndex">
							<view class="tantan-slide-box-icon tantan-slide-box-dislike" :style="{
									opacity: dislike * 1.5,
									transform: 'scale('+ (dislike + 1 > 2 ? 2 : dislike + 1 )  +')',
								}">
								<image style="width: 30rpx;height: 30rpx;" src="../../static/dgex-tantan/close.png">
								</image>
							</view>
							<view class="tantan-slide-box-icon tantan-slide-box-love" :style="{
									opacity: love * 1.5,
									transform: 'scale('+ (love + 1 > 2 ? 2 : love + 1 )  +')',
								}">
								<image style="width: 30rpx;height: 30rpx;" src="../../static/dgex-tantan/like.png">
								</image>
							</view>
						</view>
					</template>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	import {
		useloginStore
	} from '@/store/login'
	import pinia from '@/store/index'
	const loginStore = useloginStore(pinia)
	export default {
		name: "slide",
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				winWidth: 0,
				winHeigh: 0,
				/*记录x y轴*/
				x: {
					start: 0,
					move: 0,
					end: 0
				},
				y: {
					start: 0,
					move: 0,
					end: 0
				},
				visible: 3,
				/*下标*/
				currentIndex: 0,
				/*滑动*/
				swipering: false,
				/*滑动中*/
				slideing: false,
				love: 0,
				dislike: 0,
				direction: '',
				animationData: {},
				if_like: false,
				userinfo: {},
				ifover: false,
				have_num: 3,
				fromUser: '',
			}
		},
		mounted() {
			const res = uni.getSystemInfoSync()
			this.winWidth = res.windowWidth
			this.winHeigh = res.windowHeight - 110
			this.fromUser = uni.getStorageSync('userInfo')

		},
		methods: {
			see_more() {
				this.list[this.currentIndex]
				this.$emit('see_more', {
					currentItem: this.list[this.currentIndex],
				})

			},
			cardTransform(item, index) {
				let css = {
					'zIndex': this.list.length - index,
					'opacity': this.currentIndex + this.visible - 1 >= index && this.currentIndex <= index ? 1 : 0,
					'transform': 'rotate(' + ((item.x || 0) / 30) + 'deg) translate3d(' + (item.x || 0) + 'px,' + (item
						.y || 0) + 'px, ' + (this.currentIndex - index) * 50 + 'px)'
				};
				// css.transform += this.currentIndex && this.currentIndex === index ? `rotate(0,${this.direction === 'left' ? '-10':'10'}deg)` : ''
				if (index === this.currentIndex) {
					if (this.slideing) {
						css["transitionDuration"] = `${!this.swipering ? 1000 : 0}ms`;
					} else {
						css["transitionDuration"] = `${!this.swipering ? 300 : 0}ms`;
					}
				}
				return css
			},
			touchStart(e, index) {


				if (this.slideing) return;
				if (typeof this.list[index].x === 'undefined' && typeof this.list[index].y === 'undefined') {
					this.$set(this.list[index], 'y', 0)
					this.$set(this.list[index], 'x', 0)
				}
				this.swipering = true;
				this.x.start = e.touches[0].pageX;
				this.y.start = e.touches[0].pageY;
			},
			touchMove(e, index) {

				if (this.fromUser.sex == 0) {
					this.ifover = true
					return;
				}


				if (this.slideing) return
				// 滑动状态/最后一个就不滑动
				if (this.list.length == index + 4) {
					this.$emit('onChange', {
						currentIndex: this.currentIndex,
						currentItem: [],
						type: 'reset'
					})
					return;
				}
				
				this.x.move = e.touches[0].pageX;
				this.y.move = e.touches[0].pageY;
				
				this.list[index].x = this.x.move - this.x.start
				this.list[index].y = this.y.move - this.y.start
				if (Number.parseInt(this.list[index].x) > 0) {
					this.love = Number.parseInt(this.list[index].x) / (100 * 2)
					this.if_like = true
				
				} else {
					this.dislike = Math.abs(Number.parseInt(this.list[index].x) / (100 * 2))
					this.if_like = false
				
				}
				
			},
			async get_userinfo() {
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				const res = await this.$myRuquest({
					url: '/api/front/index/getImUserInfo',
					method: "POST",
					data: {
						user_id: userInfo.user_id
					},
				})
				if (res.code == 200) {

					this.fromUser = res.data
					let data = JSON.parse(JSON.stringify(res.data))
					loginStore.login(data)

				}
			},
			async count_number(type) {
				let userInfo = JSON.parse(JSON.stringify(loginStore.userInfo))
				const res = await this.$myRuquest({
					url: '/api/front/index/changeImUserData',
					method: "POST",
					data: {
						user_id: userInfo.user_id,
						column: type
					},
				})
				if (res.code == 200) {

					this.get_userinfo()


				}
			},

			touchEnd(index) {

				if (this.if_like == true) {
					if (this.fromUser.iszan == 0) {
						this.ifover = true
						this.$emit('openpop')
						return;
					}
					this.count_number('iszan')
					this.$emit('bet_like', this.list[index])
				}

				//获取当天滑动的次数

				//滑动次数为0情况执行
				//

				if (this.slideing) return
				this.swipering = false;
				if (this.list.length == index + 1) {
					return;
				}
				if (
					this.list[index].x > 0 &&
					this.list[index].x > this.winWidth / 2 - this.winWidth / 5
				) {
					this.touchEndNext(index);
				} else if (
					this.list[index].x < 0 &&
					this.list[index].x < -this.winWidth / 2 + this.winWidth / 5
				) {
					this.touchEndNext(index);
				} else {
					this.list[index].x = 0;
					this.list[index].y = 0;
					this.slideing = false;
					this.love = 0;
					this.dislike = 0;
				}

			},
			touchEndNext(index) {
				this.slideing = true;
				this.list[index].x = this.list[index].x * 5;
				this.list[index].y = this.list[index].y * 5;
				this.touchEndDone()
			},
			touchEndDone() {
				return new Promise((resolve) => {
					setTimeout(() => {
						this.slideing = false
						this.$emit('onChange', {
							currentIndex: this.currentIndex,
							currentItem: this.list[this.currentIndex],
							type: this.love !== 0 ? 'love' : 'dislike'
						})
						this.currentIndex++
						this.x.move = 0
						this.y.move = 0
						this.slideing = false
						this.btnClickType = false
						this.love = 0
						this.dislike = 0
						resolve()
					}, 300);
				})
			},
			footerBtnClick(type) {
				
				if (this.btnClickType) {
					return
				}
				this.btnClickType = true
				let w = 0
				if (type === 'love') {
					//1111111
					if (this.if_like == true) {
						if (this.fromUser.iszan == 0) {
							this.ifover = true
							this.$emit('openpop')
							return;
						}
						this.count_number('iszan')
						this.$emit('bet_like', this.list[index])
					}
					
					
					w = this.winWidth * 1.5
					this.love = 1
				} else if (type === 'dislike') {
					w = -this.winWidth * 1.5
					this.dislike = 1
				}
				this.$set(this.list[this.currentIndex], 'x', w)
				this.touchEndDone()
			},
			clickImage(e) {
				this.direction = this.winWidth / 2 > e.detail.x ? 'left' : 'right';
				/*#ifdef APP-PLUS || H5*/

				let animation = uni.createAnimation({
					duration: 200,
					timingFunction: 'ease',
				})

				this.animation = animation

				this.animation.rotateY(this.direction === 'left' ? -10 : 10).step().rotateY(this.direction === 'left' ? 5 :
					-5).step()
				this.animationData = animation.export()

				setTimeout(function() {
					this.animation.rotateY(0).step()
					this.animationData = animation.export()
				}.bind(this), 300)
				/*#endif*/
				this.$emit('onClickImage', {
					type: 'click',
					currentIndex: this.currentIndex,
					currentItem: this.list[this.currentIndex],
				})
			}
		}
	};
</script>
<style>
	.about_more {
		display: flex;
		font-size: 13px;
		background: rgb(160 157 157 / 31%);
		padding: 3px 5px;
		border-radius: 5px;
	}

	.tantan-slide {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		border-radius: 1.25rem
	}

	.tantan-slide-box {
		position: relative;
		width: 95%;
		height: 110%;
		perspective: 2100rpx;
		perspective-origin: 50% -30%;
		transform-style: preserve-3d;
		margin: auto;
		padding-top: 20px;

	}

	.tantan-slide-box-item {
		transform-style: preserve-3d;
		display: flex;
		width: 100%;
		height: 100%;
		border-radius: 24rpx;
		position: absolute;
		opacity: 0;
		transform: translate3d(0px, 0px, 0px) rotate(0deg);
		transition: 300ms;
		color: #fff;
	}

	.tantan-slide-box-item.on {
		display: block;
	}

	.tantan-slide-box-item-bg {
		height: 420rpx;
		background-image: linear-gradient(to bottom, transparent, #000000 65%);
		position: absolute;
		left: 0;
		right: 0;
		bottom: 10%;
		margin: auto;
		z-index: 1;
		border-bottom-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
	}

	.tantan-slide-box-icon {
		position: absolute;
		width: 70rpx;
		height: 70rpx;
		top: 45rpx;
		border-radius: 100%;
		background-color: #fff;
		z-index: 1;
		opacity: 0;
		transition: 100ms;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tantan-slide-box-love {
		left: 50rpx;
	}

	.tantan-slide-box-dislike {
		right: 50rpx;
	}

	.tantan-slide-footer {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.5%;
		margin: auto;
		z-index: 1023;
		padding: 30rpx 0;
		display: flex;
		justify-content: center;
	}

	.tantan-slide-footer-btn {
		height: 96rpx;
		width: 180rpx;
		margin: 0 16rpx;
		border-radius: 50rpx;
		display: flex;
		justify-content: center;
		align-content: center;
		position: relative;
		transition: 100ms;
	}

	.tantan-slide-footer-btn:active {
		transform: scale(0.9);
	}

	.tantan-slide-footer-icon {
		width: 100%;
		height: 100%;
		border-radius: 50rpx;
		transition: 200ms;
		background-color: rgba(158, 158, 158, 0.3);
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
	}

	.tantan-slide-img {
		position: relative;
		will-change: transform;
		width: 100%;
		height: 100%;
		border-radius: 40rpx;
	}

	.tantan-slide-img.on {
		transform: scale(1);
		width: 50rpx;
		height: 50rpx;
	}

	.tantan-slide-box-info {
		padding: 0 32rpx;
		color: #ffffff;
	}

	.tantan-slide-box-info .title {
		font-size: 58rpx;
		line-height: 1.2;
		text-shadow: 0 0 10rpx rgb(0, 0, 0, 0.5);
	}

	.tantan-slide-box-info .desc {
		font-size: 32rpx;
		line-height: 1.2;
		margin-top: 30rpx;
		text-shadow: 0 0 10rpx rgb(0, 0, 0, 0.5);
		display: flex;
		justify-content: space-between;
	}

	.tantan-slide-box-info .tags {
		margin-top: 24rpx;
	}

	.tantan-slide-box-info .tag {
		height: 48rpx;
		font-size: 24rpx;
		padding: 0 16rpx;
		line-height: 48rpx;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 10rpx;
	}

	.tantan-slide-direction {
		width: 100%;
		height: 90%;

	}
</style>