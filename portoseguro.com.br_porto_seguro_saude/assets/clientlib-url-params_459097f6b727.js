(function () {
    function queryParameters() {
        const params = {};
        const url = window.location.search.replace('?', '');
        if (url) {
            url.split('&').map((value) => {
                const key = value.split(`=`);
                params[key[0]] = key[1];
            });
            return params;
        }
        return;
    }
    
    function changeParameters(args) {
        let queryParam = queryParameters();
        if (queryParam && args?.modifyKeyQuery) {
            queryParam = Object.fromEntries(
                Object.entries(queryParam).map(([key, value]) => {
                    if (key === args.modifyKeyQuery.from) {
                        key = args?.modifyKeyQuery.to;
                    }
                    return [key, value];
                })
            );
    
            if (!(args?.modifyKeyQuery.to in queryParam)) {
                queryParam = {
                    ...queryParam,
                    [args?.modifyKeyQuery.to]: 'site-institucional',
                };
            }
        }
        return queryParam;
    }

    const getParams = changeParameters({
        modifyKeyQuery: {
            from: 'ref',
            to: 'referencia',
            value: 'site-institucional',
        },
    });
    if(getParams !== null && getParams !== undefined) {
        localStorage.setItem('urlParams', JSON.stringify(getParams));
    }
})();