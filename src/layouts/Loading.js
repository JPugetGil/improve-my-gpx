import React, { Fragment } from 'react'
import { withTranslation } from 'react-i18next'

import { Container, Heading, Hero } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Loading ({ state, t }) {

    return (
        <Fragment>
            <Hero size="fullheight" color="primary">
                <Hero.Body>
                    <Container>
                        <Heading>
                            <FontAwesomeIcon icon="map"/>
                        </Heading>
                        <Heading>
                            {t('loading')}
                        </Heading>
                    </Container>
                </Hero.Body>
            </Hero>
        </Fragment>
    )
}

export default withTranslation()(Loading)
