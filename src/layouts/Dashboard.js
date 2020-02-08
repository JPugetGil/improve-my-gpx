import React, {Fragment} from 'react';
import {Container, Notification} from "react-bulma-components";
import {withTranslation} from "react-i18next";

function Dashboard({t}) {
    return (
        <Fragment>
            <Container breakpoint="fullhd">
                <Notification>
                   Welcome, <strong>name</strong>. Are you ready to <code>code</code> ?
                </Notification>
            </Container>
        </Fragment>
    )
}

export default withTranslation()(Dashboard)
