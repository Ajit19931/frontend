import React from 'react';
import Helmet from "react-helmet";

const MetaData = ({ tittle }) => {
    return (
        <Helmet>
            <title>{tittle}</title>
        </Helmet>
    )
}

export default MetaData