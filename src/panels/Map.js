// import React from 'react';
// import {
// 	View,
// 	Panel,
// 	ScreenSpinner,
// 	PanelHeader, platform, IOS,
// } from '@vkontakte/vkui';
// import '../App.css';

// const osName=platform();

// class Map extends React.Component {
// 	constructor(props){
// 		super(props);
// 		this.state = {
// 			popout: <ScreenSpinner/>,
// 			activePanel:'default',
// 			activePark: null,
//             activeIframe: null,
// 		};
// 		this.HideSpinner = this.HideSpinner.bind(this);
// 	}
// 	HideSpinner()
// 	{
// 		this.setState({
// 			popout: null
// 		});
// 		console.log('ifame loaded');
// 	}
// 	render() {
// 		return (
// 			<View id={this.props.id} popout={this.state.popout} activePanel={this.state.activePanel}>
// 				<Panel id='default'>
// 					<PanelHeader>
// 						Карта маршрутов
// 					</PanelHeader>
// 					<div>
// 						<iframe
// 							onLoad={this.HideSpinner}
// 							id='theonlyone'
// 							title='theonlyone'
// 							className={osName===IOS? 'MapsCssIOS': 'MapsCssAndroid'}
// 							src = "https://yandex.ru/map-widget/v1/?um=constructor%3A773a061a84c6813492a565182b867299a5a1cd6155fa1afb0d2c78d2c2a79aca&amp;source=constructor"
// 							frameBorder = "0"/>
// 					</div>
// 				</Panel>
// 			</View>
// 		)
// 	}
// }

// export default Map;

