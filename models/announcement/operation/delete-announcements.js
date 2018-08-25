const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { announcementId, } = {} ) => {
    const table = await associations();

    const result = await table.announcement.destroy( {
        where: {
            announcementId,
        },
    } )
    .then(
        rowCount => ( {
            affectedRowCount: rowCount,
        } )
    );

    table.database.close();

    return result;
};
