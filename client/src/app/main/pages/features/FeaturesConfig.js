import React from 'react';

export const FeaturesConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/features',
            component: React.lazy(() => import('./Features'))
        }
    ]
};
