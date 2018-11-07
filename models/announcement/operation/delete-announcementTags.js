import associations from 'models/announcement/operation/associations.js';

export default async ( { announcementId, tagId, } = {} ) => {
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
