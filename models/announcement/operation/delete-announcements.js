import associations from 'models/announcement/operation/associations.js';

export default async ( { announcementId, } = {} ) => {
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
