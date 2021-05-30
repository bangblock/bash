import React from 'react';
import connect from '@vkontakte/vk-connect';
import '@vkontakte/vkui/dist/vkui.css';
import './App.css';
import ConfigProvider from "@vkontakte/vkui/dist/components/ConfigProvider/ConfigProvider";

import {Root, Epic, Tabbar, TabbarItem, Alert, CellButton, ScreenSpinner} from '@vkontakte/vkui';

import Icon28InfoOutline from '@vkontakte/icons/dist/28/user_star_badge_outline';
import Icon28Newsfeed from '@vkontakte/icons/dist/28/newsfeed';
import Icon28HomeOutline from '@vkontakte/icons/dist/28/school_outline';
import Icon24Favorite from '@vkontakte/icons/dist/24/favorite';

import Test from './panels/Test';
import Parks from './panels/Parks';
import Settings from './panels/Settings';



class App extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.getUrlVars());
		this.state = {
			activeView: 'default',
			activeStory: 'test',
			historyTrans: ['default'],
			historyParks: ['default'],
			activeRoute: '',
			activePark:'',
			allowClose: true,
			popTran: null,
			parkIframe: null,
			tranIframe: null,
			popout: null,
			CellBut: <CellButton before={<Icon24Favorite />} onClick={ () => connect.send("VKWebAppAddToFavorites", {})}> Добавить в избранное</CellButton>,
			urlVars: this.getUrlVars(),
			urlObj: this.objToQueryString(this.getUrlVars()),
			translations: {
				parks: 'Полезное',
				routes: 'Тесты',
				info: 'Настройки',
				need_accept_notifications: 'Надо разрешить уведомления',
				accept_notifications: 'Разрешить',
			}
		};
		this.openAlert = this.openAlert.bind(this);
		this.closePopout = this.closePopout.bind(this);
		this.goBack=this.goBack.bind(this);
		this.goForward=this.goForward.bind(this);
		this.newRoute=this.newRoute.bind(this);
		this.newPark=this.newPark.bind(this);
		this.newIframePark=this.newIframePark.bind(this);
		this.newIframeTran=this.newIframeTran.bind(this);
		this.openAlertTran=this.openAlertTran.bind(this);
		this.closePopTran=this.closePopTran.bind(this);
		this.makeSpin=this.makeSpin.bind(this);
		this.allowBack=this.allowBack.bind(this);
	}
	allowBack(boo)
	{
		if (!boo) this.setState({allowClose:false}); else this.setState({allowClose:true});
	}
	openAlert () {
		this.setState({ popout:
				<Alert
					actions={[{
						title: 'ОК',
						autoclose: true,
						style: 'cancel'
					}]}
					onClose={this.closePopout}
				>
					<p>Сервис в списке избранных!</p>
				</Alert>
		});
	}
	makeSpin(){
		this.setState({
			popTran: <ScreenSpinner/>
		});
	}
	openAlertTran () {
		this.setState({ popTran:
				<Alert
					actions={[{
						title: 'ОК',
						autoclose: true,
						style: 'cancel'
					}]}
					onClose={this.closePopTran}
				>
					<h2>Ограничение на количество символов</h2>
					<p>Нельзя вводить больше 15 символов в поиск.</p>
				</Alert>
		});
	}
	closePopTran () {
		this.setState({ popTran: null });
	}
	newRoute(activeRoute)
	{
		this.setState({activeRoute});
	}
	newPark(activePark)
	{
		this.setState({activePark});
	}
	newIframePark(iframe)
	{
		this.setState({parkIframe: iframe})
	}
	newIframeTran(iframe)
	{
		this.setState({tranIframe: iframe})
	}
	closePopout () {
		this.setState({ popout: null });
	}

	goBack = () => {
		if (this.state.activeStory==='test')
		{
			const history = [...this.state.historyTrans];
			if (this.state.historyTrans[this.state.historyTrans.length-1] === 'default' && this.state.allowClose===false) {
				window.history.forward();
				return;
			}
			if (this.state.historyTrans[this.state.historyTrans.length-1] === 'default')
				window.history.go(-1);
			if (this.state.historyTrans[this.state.historyTrans.length-1] === 'default') return;
			history.pop();
			const activePanel = history[history.length - 1];
			if (activePanel === 'default') {
				connect.send('VKWebAppDisableSwipeBack');
				this.setState({allowClose:true})
			}
			this.setState({historyTrans: history});
		} else if (this.state.activeStory==='parks')
		{
			const history = [...this.state.historyParks];
			if (this.state.historyParks[this.state.historyParks.length-1] === 'default' && this.state.allowClose===false) {
				window.history.forward();
				console.log(window.history);
				return;
			}
			if (this.state.historyParks[this.state.historyParks.length-1] === 'default')
				window.history.go(-1);
			if (this.state.historyParks[this.state.historyParks.length-1] === 'default') return;
			history.pop();
			const activePanel = history[history.length - 1];
			if (activePanel === 'default') {
				connect.send('VKWebAppDisableSwipeBack');
				this.setState({allowClose:true})
				//window.history.forward(1);
			}
			this.setState({historyParks: history});
		}
		else {
			connect.send('VKWebAppDisableSwipeBack');
			window.history.forward();
			return;
		}
	}

	goForward = (activePanel) => {
		if (this.state.activeStory==='test') {
			const history = [...this.state.historyTrans];
			history.push(activePanel);
			window.history.pushState({panel: activePanel}, activePanel);
			if (history[history.length - 2] === 'default') {
				connect.send('VKWebAppEnableSwipeBack');
			}
			this.setState({historyTrans: history});
		} else if (this.state.activeStory==='parks') {
			const history = [...this.state.historyParks];
			history.push(activePanel);
			window.history.pushState({panel: activePanel}, activePanel);
			if (history[history.length - 2] === 'default') {
				connect.send('VKWebAppEnableSwipeBack');
			}
			this.setState({historyParks: history});
		}
	}

	getUrlVars() {
		let urlVar = window.location.search;
		let dict = {};
		let arrayVar = (urlVar.substr(1)).split('&');
		if (arrayVar[0] === '') return false;
		for (let i = 0; i < arrayVar.length; i++) {
			let valueAndKey = arrayVar[i].split('=');
			dict[valueAndKey[0]] = valueAndKey[1];
		}
		return dict;
	}

	objToQueryString(obj) {
		const keyValuePairs = [];
		for (let i = 0; i < Object.keys(obj).length; i += 1) {
			keyValuePairs.push(`${encodeURIComponent(Object.keys(obj)[i])}=${encodeURIComponent(Object.values(obj)[i])}`);
		}
		return keyValuePairs.join('&');
	}

	componentDidMount() {
		console.log(this.state.urlVars.vk_is_favorite==='1');
		connect.subscribe((event) => {
			switch (event.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					 break;
				case 'VKWebAppUpdateConfig':
					let schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = (event.detail.data.scheme ? event.detail.data.scheme : 'client_light');
					document.body.attributes.setNamedItem(schemeAttribute); break;
				case 'VKWebAppAddToFavoritesResult': console.log(event.detail.data.result); this.setState({CellBut:<CellButton disabled before={<Icon24Favorite />} >Сервис уже в списке избранных</CellButton>});
					break;
				default: console.log(event.detail.type);
					break;
			}
			console.log('new message', event.detail.type);
		});
		window.addEventListener('popstate', e => {e.preventDefault(); this.goBack(e)});
		document.addEventListener("backbutton", e => {e.preventDefault(); this.goBack(e)});
		if (this.state.urlVars.vk_is_favorite==='1') this.setState({CellBut:<CellButton disabled before={<Icon24Favorite />} >Сервис уже в списке избранных</CellButton>});
		this.setState({ popout: null });
	}

	onStoryChange = (e) => {
		this.setState({ activeStory: e.currentTarget.dataset.story });
		window.history.pushState({story: e.currentTarget.dataset.story}, e.currentTarget.dataset.story);
	};

	go = (e) => {
		this.setState({ activeView: e.currentTarget.dataset.to })
	};

	render() {
		return (
			<ConfigProvider>
			<Root activeView={this.state.activeView}>
				<Epic
					id='default'
					activeStory={this.state.activeStory}
					tabbar={
						<Tabbar>
							<TabbarItem
								onClick={ this.onStoryChange }
								selected={ this.state.activeStory === 'test' }
								data-story='test'
								text={this.state.translations.routes}
							>
								<Icon28Newsfeed />
							</TabbarItem>
							<TabbarItem
								onClick={ this.onStoryChange }
								selected={ this.state.activeStory === 'parks'}
								data-story='parks'
								text= {this.state.translations.parks}
							>
								<Icon28HomeOutline/>
							</TabbarItem>
							<TabbarItem
								onClick={ this.onStoryChange }
								selected={ this.state.activeStory === 'settings' }
								data-story='settings'
								text={this.state.translations.info}
							>
								<Icon28InfoOutline />
							</TabbarItem>
						</Tabbar>
					}>
					<Test id='test' activePanel={this.state.historyTrans[this.state.historyTrans.length-1]} allowBack={this.allowBack} history={this.state.historyTrans}
					goBack={this.goBack} goForward={this.goForward} newIframe={this.newIframeTran} popout={this.state.popTran} makeAlert={this.openAlertTran} closepopout={this.closePopTran}
							   makeSpinner={this.makeSpin} activeIframeApp={this.state.tranIframe}
							   newRoute={this.newRoute} activeRoute={this.state.activeRoute}/>
					<Parks id='parks'  activeIframe={this.state.parkIframe} activePanel={this.state.historyParks[this.state.historyParks.length-1]}
						   history={this.state.historyParks} allowBack={this.allowBack} newIframe={this.newIframePark}
					goBack={this.goBack} goForward={this.goForward} newPark={this.newPark} activePark={this.state.activePark}/>
					
					<Settings id='settings' CellBut={this.state.CellBut}  />
				</Epic>
			</Root>
			</ConfigProvider>
		);
	}
}

export default App;
