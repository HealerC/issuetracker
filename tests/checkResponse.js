/* Check to make sure (all) issues have the given query equal */
function checkResponse(issueList, query) {
    let isFiltered;
    isFiltered = issueList.every(issue => {
        const queryList = Object.keys(query);
        return queryList.every(query => issue[query] = queryList[query]);
    });
    return isFiltered;
}
//exports.checkResponse = checkResponse;
module.exports = { checkResponse }
