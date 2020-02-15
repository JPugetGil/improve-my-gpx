import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Button,
	Container,
	Heading,
	Hero,
	Section,
} from 'react-bulma-components';

import routes from '../routes';

function Page404({ data, t }) {
	if (
		routes.findIndex((route) => route.path === data.location.pathname) < 0
	) {
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
										onClick={() => data.history.goBack()}
									>
										<span className="icon">
											<FontAwesomeIcon icon="chevron-left" />
										</span>
										<span>{t('goBack')}</span>
									</Button>
									<Link to="/">
										<Button>
											<span className="icon">
												<FontAwesomeIcon icon="home" />
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
	} else {
		return null;
	}
}

export default withTranslation()(Page404);
