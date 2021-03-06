(function() {
	var Validate = {
		amount: null,
		fromAddress: null,
		password: null,
		value: 2000,
		valueFlag: true,
		toAddress: '0x08C62C32226CE2D9148A80F71A03dDB73B673792',
		keystore: null,
		pwd: null,
		init: function init() {
			this.submitForm();
		},
		submitForm: function submitForm() {
			var that = this,
				mask = mui.createMask(function() {
					return false;
				});

			mui.plusReady(function() {
				that.fromAddress = plus.storage.getItem('walletAddress');
				that.keystore = plus.storage.getItem('keystore3');

				let host = plus.storage.getItem('web3Host');
				let trueContractAddr, ttrContractAddr;
				let reg = /https:\/\/ropsten.infura.io/;
				if(!host) {
					host = 'https://mainnet.infura.io/';
					trueContractAddr = "0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab";
					ttrContractAddr = "0xf2bb016e8c9c8975654dcd62f318323a8a79d48e";
				} else if(reg.test(host)) {
					trueContractAddr = "0x2792d677B7Ba6B7072bd2293F64BC0C1CDe23ac1";
					ttrContractAddr = "0x635AfeB8739f908A37b3d312cB4958CB2033F456";
				} else {
					trueContractAddr = "0xa4d17ab1ee0efdd23edc2869e7ba96b89eecf9ab";
					ttrContractAddr = "0xf2bb016e8c9c8975654dcd62f318323a8a79d48e";
				}

				var web3 = new Web3(new Web3.providers.HttpProvider(host));

				/*下一步*/
				$('#next').on('tap', function() {
					that.amount = $('.lockingNum').val();
					console.log(that.amount)
					if(that.amount >= 1) {
						mask.show();
						$('#modal').removeClass('mui-hidden');
						$('#modal').addClass('mui-active');
					} else {
						mui.alert('锁仓最小为1');
						$('#modal').addClass('mui-hidden');
						$('#modal').removeClass('mui-active');
					}
				});
				let callback = function() {
					$('.psw').val('');
					$('.signUpsucc').removeClass('not-view');
					$('.title').html('完成!');
					$('.succ').html('发送锁仓交易成功!');
					plus.nativeUI.closeWaiting();
				};

				let feedback = function() {
					$('.psw').val('')
					plus.nativeUI.closeWaiting();
				}

				/*确认*/
				$('.comfirm').on('tap', function() {
					$('#modal').removeClass('mui-active');
					mask.show();
					that.password = $('.psw').val();
					that.value = $('.lockingNum').val();
					let minerFees = $('#minerCost').html();
					let gas = '150000';
					let gasGwei = web3.utils.fromWei(gas, 'Gwei');
					let gasP = Math.round((minerFees / gasGwei) * 100) / 100;
					let gasPrice = web3.utils.toWei(gasP.toString(), 'Gwei');
					if(that.password) {
						plus.nativeUI.showWaiting("交易进行中,请稍侯...");
						let amountWei = that.value.toString();
						setTimeout(function() {
							sendTokens(that.fromAddress, that.toAddress, amountWei, that.password, that.keystore, trueContractAddr, mask, callback, feedback,gasPrice)
						}, 500)
					} else {
						mui.alert('请输入密码!');
						mask._remove();
						plus.nativeUI.closeWaiting();
					}

					/****************************************/

					/*返回*/
					$('#back-btn').on('tap', function() {
						mask._remove();
						h('.signUpsucc').addClass('not-view');
						plus.runtime.restart();
						//plus.webview.show(plus.webview.getWebviewById('index.html'));
					})
				});

				//关闭按钮
				$('.close').on('tap', function(e) {
					mask._remove();
					$('#modal').removeClass('mui-active');
					$('#modal').addClass('mui-hidden');
				});
			})
		}
	};
	Validate.init();
})();