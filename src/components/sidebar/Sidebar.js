import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Columns, Container, Heading, Image, Menu } from 'react-bulma-components';

import { toggleSidebar } from '../../actions/appAction';

import logo from '../../assets/images/logo.png';

import './sidebar.scss';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.sidebarRef = React.createRef();
        this.menuItems = [
            {
                to: '/map',
                icon: 'play',
                label: 'sidebar.menuItems.1',
            },
            {
                to: '/map',
                icon: 'question',
                label: 'sidebar.menuItems.2',
            },
            {
                to: '/map',
                icon: 'users',
                label: 'sidebar.menuItems.3',
            },
        ];
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
        setTimeout(() => {
            this.sidebarRef.current.querySelector('.sidebar__toggle').classList.remove('sidebar__toggle--hidden');
        }, 2000);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.props.state.rootReducers.openDrawer && !this.sidebarRef.current.contains(e.target)) {
            this.props.dispatch(toggleSidebar());
        }
    };

    render() {
        return (
            <Fragment>
                <div
                    className={'sidebar has-background-white' + (this.props.state.rootReducers.openDrawer ? ' sidebar--open' : '')}
                    ref={this.sidebarRef}
                >
                    <Button className="sidebar__toggle sidebar__toggle--hidden" color="info" onClick={() => this.props.dispatch(toggleSidebar())}>
                        <FontAwesomeIcon icon="arrow-right" />
                    </Button>

                    <Container className="logo">
                        <Columns breakpoint="mobile" className="is-vcentered">
                            <Columns.Column narrow>
                                <Image src={logo} size={64} />
                            </Columns.Column>
                            <Columns.Column>
                                <Heading size={4}>{this.props.t('siteName')}</Heading>
                            </Columns.Column>
                        </Columns>
                    </Container>

                    <Menu>
                        <Menu.List>
                            {this.menuItems.map((menuItem, index) => (
                                <Menu.List.Item to={menuItem.to} key={index}>
                                    <Fragment>
                                        <span className="menu-list-item-icon">
                                            <FontAwesomeIcon icon={menuItem.icon} />
                                        </span>
                                        <span className="menu-list-item-label">{this.props.t(menuItem.label)}</span>
                                    </Fragment>
                                </Menu.List.Item>
                            ))}
                        </Menu.List>
                    </Menu>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    state: state,
});

export default connect(mapStateToProps)(withTranslation()(Sidebar));
