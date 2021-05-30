import React from 'react';
import {Footer, Group, View,  List, CellButton} from '@vkontakte/vkui';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import connect from "@vkontakte/vk-connect";

import '../App.css';
import Icon24Users from '@vkontakte/icons/dist/24/users';
import Icon24Repost from '@vkontakte/icons/dist/24/repost';
import {Icon24Info } from '@vkontakte/icons';

const Settings = props =>  (
    <View id={ props.id } activePanel='default' popout={props.popout}>
        
        <Panel id='default'>
            <PanelHeader>
                Информация об аккаунте
            </PanelHeader>
            <Group title='Меню'>
                <List>
                    <CellButton before={<Icon24Users />} component="a" href="https://vk.com/public195119672">  Открыть сообщество </CellButton>
                    {props.CellBut}
                    <CellButton before={<Icon24Repost />} onClick={ () => connect.send("VKWebAppShare", {"link": "https://vk.com/app7849117"})}> Рассказать друзьям</CellButton>
                    <CellButton before={<Icon24Info />} onClick={ () => connect.send("VKWebAppShare", {"link": "https://vk.com/app7157578"})}> Информация о прохождении тестов</CellButton>
                </List>
            </Group>
             
            <Footer>
                
            </Footer>
            <Footer>
             
            </Footer>
        </Panel>
    </View>
);

export default Settings


