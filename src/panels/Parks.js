import React from 'react';
import {
	View,
	Panel,
	PanelHeader,
	ActionSheet,
	Group,
	ActionSheetItem,
	Cell,
	Button,
	Div,
	InfoRow,
	platform,
	IOS,
	Search,
	List,
	Placeholder,
	length
} from '@vkontakte/vkui';

import Icon24MoreVertical from '@vkontakte/icons/dist/24/more_vertical';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';


import '../App.css';
import HeaderButton from "@vkontakte/vkui/dist/components/HeaderButton/HeaderButton";


const osName=platform();

const parkinfo = [
    {id: '1', name: 'Правильные и неправильные глаголы в английском языке', info: 'Главная› Грамматика Английские глаголы. Классификация глаголов английского языка. Глагол – это самостоятельная часть речи, обозначающая действие или состояние предмета или лица. В английском языке признаком глагола в неопределенной форме является частица to.'},
	{id: '2', name: 'Личные и неличные формы английского глагола', info: 'Личные формы глагола способны отражать категории времени, лица, числа и наклонения. В предложении они используются в качестве сказуемого и согласуются с подлежащим в лице и числе:' + 
	'Children ask thousands of questions. – по форме глагола можно определить настоящее время'+
	'Дети задают тысячи вопросов. '+
	'We were taught by best teachers. – по форме глагола можно определить прошедшее время и мн. ч.'+
	'Нас учили лучшие учителя.'+
	'Неличные формы глагола не изменяются по лицам и числам. Их нельзя использовать самостоятельно в качестве сказуемого, только в его составе. К неличным формам относятся инфинитив, причастие и герундий.'+
	'We must ask you to leave.'+
	'Мы должны попросить вас удалиться.'+
	'There are several ways of cooking fish.'+
	'Существует несколько способов готовить рыбу.'},
    {id: '3', name: 'Времена в английском языке', info: 'Личные формы глагола способны отражать категории времени, лица, числа и наклонения. В предложении они используются в качестве сказуемого и согласуются с подлежащим в лице и числе:' + 
	'Children ask thousands of questions. – по форме глагола можно определить настоящее время'+
	'Дети задают тысячи вопросов. '+
	'We were taught by best teachers. – по форме глагола можно определить прошедшее время и мн. ч.'+
	'Нас учили лучшие учителя.'+
	'Неличные формы глагола не изменяются по лицам и числам. Их нельзя использовать самостоятельно в качестве сказуемого, только в его составе. К неличным формам относятся инфинитив, причастие и герундий.'+
	'We must ask you to leave.'+
	'Мы должны попросить вас удалиться.'+
	'There are several ways of cooking fish.'+
	'Существует несколько способов готовить рыбу.'},
	{id: '5', name: 'Инфинитив в английском языке', info: ''},
	{id: '8', name: 'Present perfect', info: ''},
	{id: '10', name: 'Past simple', info: ''},
	{id: '11', name: '', info: ''},
];

class Parks extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			popout: null,
			activePark: null,
			activePanel: 'default',
            activeIframe: null,
		};
		this.TramPark1 = this.TramPark1.bind(this);
		this.TramPark2 = this.TramPark2.bind(this);
		this.TramPark3 = this.TramPark3.bind(this);
		this.TramPark5 = this.TramPark5.bind(this);
		this.TramPark7 = this.TramPark7.bind(this);
		this.TramPark8 = this.TramPark8.bind(this);
		this.TramPark0 = this.TramPark0.bind(this);
		this.TramPark11 = this.TramPark11.bind(this);
		this.ClosePopout = this.ClosePopout.bind(this);
	}
    get infobase () {
        return parkinfo.filter(({id})=> id===this.props.activePark);
    }
    ClosePopout()
	{
		this.props.allowBack(true);
		this.setState({ popout: null })
	}

	TramPark1 () {
		this.props.newPark('2');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}
	TramPark2 () {
		this.props.newPark('1');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}
	TramPark3 () {
		this.props.newPark('3');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}
	TramPark5 () {
		this.props.newPark('5');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}
	TramPark7 () {
		this.props.newPark('7');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}
	TramPark8 () {
		this.props.newPark('8');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}
	TramPark0 () {
		this.props.newPark('10');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}

	TramPark11 () {
		this.props.newPark('11');
		this.props.allowBack(false);
		this.props.goForward('park-history');
	}
	render() {
		return (
			<View id={this.props.id} activePanel={this.props.activePanel} popout={this.state.popout} onSwipeBack={this.props.goBack} history={this.props.history}>
				<Panel id='default'>
					<PanelHeader>
						Информация для повышения знаний
					</PanelHeader>
					<Group className='park_info'>
						<Cell size="l">
							Английские глаголы<hr/>
							<InfoRow title='Описание'>
							Классификация глаголов английского языка
							</InfoRow>
							<Button size="xl" level="secondary" className="MoreBut" onClick={this.TramPark2}>Изучить</Button>
						</Cell>

					</Group>
					<Group className='park_info'>
						<Cell

							size="l"
						>
							Неправильные английские глаголы<hr/>
							<InfoRow title='Описание'>
							В отличие от большинства глаголов английского языка, неправильные английские глаголы...
							</InfoRow>
							<Button size="xl" level="secondary" className="MoreBut" onClick={this.TramPark3}>Изучить</Button>
						</Cell>
					</Group>
					<Group className='park_info'>
						<Cell

							size="l"
						>
							Лицо и число английского глагола<hr/>
							<InfoRow title='Описание'>
							Английский глагол имеет два числа (единственное и множественное)...
							</InfoRow>
							<Button size="xl" level="secondary" className="MoreBut" onClick={this.TramPark2}>Изучить</Button>
						</Cell>
					</Group>
					<Group className='park_info'>
						<Cell

							size="l"
						>
							Переходные и непереходные английские глаголы<hr/>
							<InfoRow title='Описание'>
							Глаголы в английском языке, также, как и в русском, делятся на переходные и непереходные...
							</InfoRow>
							<Button size="xl" level="secondary" className="MoreBut" onClick={this.TramPark5}>Изучить</Button>
						</Cell>
					</Group>
					<Group className='park_info'>
						<Cell

							size="l"
						>
							Личные и неличные формы английского глагола <hr/>
							<InfoRow title='Описание'>
							Формы английского глагола делятся на личные и неличные...
							</InfoRow>
							<Button size="xl" level="secondary" className="MoreBut" onClick={this.TramPark7}>Изучить</Button>
						</Cell>
					</Group>
					<Group className='park_info'>
						<Cell

							size="l"
						>
							Инфинитив в английском языке<hr/>
							<InfoRow title='Описание'>
							Инфинитив в английском языке представляет собой неличную форму английского глагола, которая...
							</InfoRow>
							<Button size="xl" level="secondary"  className="MoreBut" onClick={this.TramPark8}>Изучить</Button>
						</Cell>
					</Group>
					<Group className='park_info'>
						<Cell

							size="l"
						>
							Present Simple - простое настоящее время <hr/>
							<InfoRow title='Описание'>
							Время Present Simple обозначает действие в настоящем в широком смысле слова...
							</InfoRow>
							<Button size="xl" level="secondary" className="MoreBut" onClick={this.TramPark0}>Изучить</Button>
						</Cell>
					</Group>
					<Group className='park_info'>
						<Cell

							size="l"
						>
							Past Simple - простое прошедшее время<hr/>
							<InfoRow title='Описание'>
							Время Past Simple используется для обозначения действия, которое...
							</InfoRow>
							<Button size="xl" level="secondary" className="MoreBut" onClick={this.TramPark11}>Изучить</Button>
						</Cell>
					</Group>
				</Panel>
				<Panel id='park-history'>
					<PanelHeader
						left={<HeaderButton onClick={ () => this.props.goBack()}>
							{osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
						</HeaderButton>}
					>
						{this.props.activePark<10? 'Тема'+this.props.activePark: this.props.activePark==10? 'История СТТП': 'История депо ООО "ТТК"' }
					</PanelHeader>
                    {this.infobase.map(infobase =>
					<Group key={infobase.id} >
						<Div>
							<h4 > {infobase.name}</h4>
							{infobase.info}
						</Div>
                        </Group>)}
				</Panel>
                <Panel id='park_map'>
                    <PanelHeader
                        left={<HeaderButton onClick={ () => this.props.goBack()}>
                            {osName === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
                        </HeaderButton>}
                    >
                        {this.props.activePark<10? 'Парк №'+this.props.activePark: this.props.activePark==10? '': '' } на карте
                    </PanelHeader>
                    <div className='mapview'>
                        {this.props.activeIframe}
                    </div>
                </Panel>
			</View>
		)
	}
}

export default Parks;

