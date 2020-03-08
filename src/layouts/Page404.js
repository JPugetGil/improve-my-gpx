import React, {Fragment} from 'react';
import {withTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Container, Heading, Hero, Section,} from 'react-bulma-components';


function Page404({t}) {
    const sectionStyle = {
        padding: '3rem 1.5rem 3rem 0rem',
    };

    return (
        <Fragment>
            <Hero color="light" size="fullheight">
                <Hero.Body>
                    <Container>
                        <Heading>{t('pageNotFoundTitle')}</Heading>
                        <p>{t('pageNotFoundContent')}</p>
                        <Section style={sectionStyle}>
                            <Button.Group>
                                <Button
                                    onClick={() => console.log("df")/*data.history.goBack()*/}
                                >
										<span className="icon">
											<FontAwesomeIcon icon="chevron-left"/>
										</span>
                                    <span>{t('goBack')}</span>
                                </Button>
                                <Link to="/">
                                    <Button>
											<span className="icon">
												<FontAwesomeIcon icon="home"/>
											</span>
                                        <span>{t('goToHome')}</span>
                                    </Button>
                                </Link>
                            </Button.Group>
                        </Section>
                    </Container>
                </Hero.Body>
            </Hero>
        </Fragment>
    );
}

export default withTranslation()(Page404);
