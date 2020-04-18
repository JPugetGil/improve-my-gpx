import React, {Fragment} from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {Button, Container, Heading, Hero, Section} from 'react-bulma-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Home({props, state, t}) {
    // props contains dispatchers (you need to load them at the bottom of the file)
    console.log(props, state);
    const sectionStyle = {
        padding: '3rem 1.5rem 3rem 0rem',
    };

    return (
        <Fragment>
            <Hero color="primary" size="fullheight">
                <Hero.Body>
                    <Container>
                        <Heading>{t('welcome')}</Heading>
                        <Heading subtitle size={3}>
                            {t('homeSubtitle')}
                        </Heading>
                        <p>{t('homeDescription')}</p>
                        <Section style={sectionStyle}>
                            <Link to="/map">
                                <Button>
                                    <span>{t('homeGoToMap')}</span>
                                    <span className="icon">
										<FontAwesomeIcon icon="map"/>
									</span>
                                </Button>
                            </Link>
                        </Section>
                    </Container>
                </Hero.Body>
            </Hero>
        </Fragment>
    );
}

const mapDispatchToProps = dispatch => ({
    props: {
        toggleSidebar: () => dispatch({type: 'TOGGLESIDEBAR'}),
    }
});

const mapStateToProps = (state) => ({
    state: state
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Home));
