var graphQLServer = 'http://graph.sonnylab.com/graphql';

function highlightQuery (query, errors) {
    var locations = errors.map(function (e) { return e.locations })
        .reduce(function (a, b) {
            return a.concat(b)
        }, [])

    var queryHighlight = ''

    query.split('\n').forEach(function (row, index) {
        var line = index + 1
        var lineErrors = locations.filter(function (loc) { return loc.line === line })

        queryHighlight += row + '\n'

        if (lineErrors.length) {
            var errorHighlight = []

            lineErrors.forEach(function (line) {
                for (var i = 0; i < 8; i++) {
                    errorHighlight[line.column + i] = '~'
                }
            })

            for (var i = 0; i < errorHighlight.length; i++) {
                queryHighlight += errorHighlight[i] || ' '
            }
            queryHighlight += '\n'
        }
    })

    return queryHighlight
}

var GraphQLClient = function (params) {
    if (!params) params = {};
    if (!params.url) params.url = graphQLServer;

    return {
        query: function (query, variables) {
            var headers = new Headers()
            headers.append('Content-Type', 'application/json')

            return fetch(params.url, {
                method: 'POST',
                body: JSON.stringify({
                    query: query,
                    variables: variables
                }),
                headers: headers,
                credentials: params.credentials
            }).then(function (res) {
                return res.json()
            }).then(function (data) {
                if (data.errors && data.errors.length) {
                    throw new Error(data.errors.map(function (e) { return e.message }).join('\n') + '\n' + highlightQuery(query, data.errors))
                }
                return data
            })
        }
    }
}

module.exports = GraphQLClient;