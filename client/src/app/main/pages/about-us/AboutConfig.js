import React from 'react';

export const AboutConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/about',
            component: React.lazy(() => import('./About'))
        }
    ]
};
