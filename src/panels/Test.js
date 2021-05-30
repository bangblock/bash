import React from 'react';
import {
	View, Panel, PanelHeader, ModalRoot, ModalPage, ModalPageHeader, Group, Alert, Placeholder, Snackbar,
	HeaderButton, IOS, ANDROID, platform, Separator , ScreenSpinner, InfoRow, Button, Cell, Avatar, Search, List, Div
} from '@vkontakte/vkui';

import '../App.css';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon16Place from '@vkontakte/icons/dist/16/place';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24DoNotDisturb from '@vkontakte/icons/dist/24/do_not_disturb';
import Icon24Bug from '@vkontakte/icons/dist/24/bug';

const routes = [
	{id: 998, name: "Тест по английскому - Английский 11 класс",time: '10:00', information: 'Пройдите адаптивный тест по английскому  языку, разработанный' + 
	' Оксфордским университетом и получите международный сертификат'},
	{id: 999, name: "Оксфордский тест", time: '10:00', information: 'Трамвайный парк №7',},
	{id: 1003, name: "Тест на знание глаголов", time: '10:00', information: 'Трамвайные парк №3, №7',},
	{id: 1006, name: "Тест на знание времен в английском языке", time: '10:00', information: 'Трамвайный парк №3'},
	{id: 1007, name: "Личные и неличные формы английского глагола", time: '10:00', information: 'Трамвайный парк №7',},
	{id: 1008, name: "Инфинитив в английском языке", time: '10:00', information: 'Трамвайное депо ООО "ТТК"'},
	{id: 1009, name: "Present perfect  тест", time: '10:00', information: 'Трамвайный парк №5',},

];
const osName=platform();
const IS_PLATFORM_ANDROID = (osName === ANDROID);
const IS_PLATFORM_IOS = (osName === IOS);
const TextButton = props => (
    <div>
        Содержание
        <Button
            className="Header_button"
            onClick={props.routepic}
        >
            Пройти тест
        </Button>
    </div>
);


class Test extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activePanel:'default',
			activeModal: null,
			modalHistory: [],
			search: '',
            activeRoute:'',
			activeIframe: null,
			snackbar: null,
		};
		this.modalBack = () => {
			this.setState({activeModal: null});
			this.setState({snackbar:null});
			this.props.allowBack(true);
		};
		this.HideSpinner = this.HideSpinner.bind(this);
		this.onChange = this.onChange.bind(this);
        this.routepic = this.routepic.bind(this);
		this.openBug = this.openBug.bind(this);
	}

	HideSpinner()
	{
		this.props.closepopout();
	}
    routepic()
    {
    	this.props.makeSpinner();
		this.props.closepopout();
    }
	openRoute(id) {
		id = id || null;
		let s= new Date().toLocaleString();    												//time
		console.log(s);
		let newstr = s.slice(s.indexOf(",")+2);
		console.log(newstr>'00:20:00' && newstr<'05:00:00');  //snackbar вылазит 
		if (newstr>'00:20:00' && newstr<'05:00:00') this.setState({snackbar:    //this.routes.{this.state.activeRoute}.time
				<Snackbar before={<Avatar size={24} style={{backgroundColor: 'var(--accent)'}}><Icon24DoNotDisturb fill="#fff" width={14} height={14} /></Avatar>}>Маршут сейчас не работает! </Snackbar>});
		let activePanel='route_info';
		this.props.goForward(activePanel);
		this.props.newRoute(id);
	};
	onChange (search) { if (search.length>15){this.props.makeAlert()}
	else
		{
		//	if (search[search.length-1]===' ')   search=search.trimRight()+' ';
			this.setState({ search });
		}
	}

	get thematics () {
		let search = this.state.search.toLowerCase().trim();
		return routes.filter(({name}) => name.toLowerCase().indexOf(search) > -1);
	}

	get infobase () {
		return routes.filter(({id})=> id===this.props.activeRoute);
	}

	openBug(){
		this.setState({activeModal:'Bugreport'});
		this.props.allowBack(false);
		window.history.pushState({modal: "bug"}, "bug-modal");
	}

	render()
	{
		const modal=(
			<ModalRoot activeModal={this.state.activeModal} >
				<ModalPage
					className='modal-page'
					id={'Bugreport'}
					onClose={this.modalBack}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
							right={IS_PLATFORM_IOS && <HeaderButton onClick={this.modalBack}>Готово</HeaderButton>}
						>
							<Div className='ModalText'>Сообщить о проблеме</Div>
						</ModalPageHeader>
					}
				>
					<Div>
					<Group>
						<Placeholder>Чтобы сообщить об ошибке, напишите нам в личные сообщения </Placeholder>
						<Button size="l"  className='BugBut'  stretched component="a" href="https://vk.me/club187561580">Перейти в диалог</Button>
					</Group>
					</Div>
				</ModalPage>
			</ModalRoot>
		);

											//return
		return (
			<View id={this.props.id} activePanel={this.props.activePanel} modal={modal} popout={this.props.popout}
				  onSwipeBack={this.props.goBack} history={this.props.history}>
				<Panel id='default'>
					<div>
						<PanelHeader
						left={<HeaderButton onClick={() => this.openBug()} ><Icon24Bug/></HeaderButton>}
						>
							Тесты
						</PanelHeader>
						<Search value={this.state.search} onChange={this.onChange}/>
						{this.thematics.length > 0 ?
						<List>
							{this.thematics.map(thematic => <Cell key={thematic.id} onClick={() => this.openRoute(thematic.id)} >{thematic.name}</Cell>)}
						</List>:
								<Placeholder> Тест не найден. </Placeholder>
						}
					</div>
				</Panel>
				<Panel id='route_map'>
					<PanelHeader
						left={<HeaderButton onClick={ () => this.props.goBack()}>
							{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</HeaderButton>}
					>
						 {this.props.activeRoute-1000>-1? this.props.activeRoute-1000 : (this.props.activeRoute-1000===-1? 'A': 'Т1') }
					</PanelHeader>
					<div className='mapview'>
					{this.props.activeIframeApp}
					</div>
					{this.state.snackbar}
				</Panel>
				<Panel id='route_info'>
					<PanelHeader
						left={<HeaderButton onClick={ () => this.props.goBack()}>
							{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</HeaderButton>}
					>
						{this.infobase.map(infobase =>
							<div className='container'  key={infobase.id}>
								Оксфордский тест
							</div>
						)}
					</PanelHeader>
						<Group title={<TextButton routepic={this.routepic}/>}>
							<Separator />
							{this.infobase.length > 0?
								<List>
									{this.infobase.map(infobase =>
										<Cell key={infobase.id} >
											<InfoRow title='Время прохождения теста:'>
												{infobase.time}
											</InfoRow>
										</Cell>)}
									{this.infobase.map(infobase =>
										<Cell key={infobase.id} className='route-infoline'>
											<InfoRow title='Описание теста'>
												{infobase.information}
											</InfoRow>
										</Cell>
									)}
								</List>:
								<InfoRow className='zaglushka' title='Ошибка'>
									О данном маршруте нет дополнительной информации
								</InfoRow>
							}
						</Group>
				</Panel>
			</View>
		);
	}
}

export default Test;
