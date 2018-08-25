const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const associations = require( `${ projectRoot }/models/announcement/operation/associations` );

module.exports = async ( { announcementId, tagId, } = {} ) => {
    const table = await associations();

    const result = await table.announcementTag.destroy( {
        where: {
            announcementId,
            tagId,
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
