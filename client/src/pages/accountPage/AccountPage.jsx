import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";
import s from '../accountPage/AccountPage.module.scss';
import AccountDetails from "../../components/account/accountDetails/AccountDetails";
import AccountSettings from "../../components/account/accountSettings/AccountSettings";

const AccountPage = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const menuList = [
        {component: <AccountDetails/>, name: 'Профиль', icon: ''},
        {component: <AccountSettings/>, name: 'Настройки аккаунта', icon: ''},
        {component: '', name: 'История покупок', icon: ''},
    ];

    const [activeComponent, setActiveComponent] = useState(<AccountDetails/>);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Профиль');

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        navigate(HOME_ROUTE);
        localStorage.clear();
    }

    useEffect(() => {
        setSelectedMenuItem('Профиль');
    }, [])


    const handleClick = (item) => {
        setActiveComponent(item.component);
        setSelectedMenuItem(item.name);
    }

    return (
        <>
            <div className='container'>
                <h2>Мой аккаунт</h2>
                <div className={s.account}>
                    <div className={s.menu}>
                        {
                            menuList.map((item, i) =>
                                <div className={selectedMenuItem === item.name ?
                                    [s.menuItem, s.selected].join(' ') :
                                    s.menuItem}
                                     key={i}
                                     onClick={() => handleClick(item)}
                                >
                                    <img src={item.icon} alt=''/>
                                    <span>{item.name}</span>
                                </div>
                            )
                        }
                    </div>

                    <div className={s.accountInfoBlock}>
                        <h3 className={s.accountInfoBlockHeader}>{selectedMenuItem}</h3>
                        {activeComponent}
                    </div>
                </div>
                <button className='btn btnAnimation'
                        style={{float: 'right'}}
                        onClick={() => logOut()}>
                    Выйти
                </button>
            </div>
        </>
    );
});

export default AccountPage;