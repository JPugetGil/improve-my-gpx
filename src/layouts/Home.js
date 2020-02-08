import React, { Fragment } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button, Container, Heading, Hero, Section } from 'react-bulma-components';

function Home({ t }) {
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
						<Section>
							<Link to="/map">
								<Button>{t('homeGoToMap')}</Button>
							</Link>
						</Section>
					</Container>
				</Hero.Body>
			</Hero>
		</Fragment>
	);
}

export default withTranslation()(Home);
