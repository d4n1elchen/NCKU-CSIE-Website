import associations from 'models/announcement/operation/associations.js';

export default async ( { announcementId, tagId, } = {} ) => {
    const table = await associations();

    const announcementTagData = tagId.map( id => ( {
        announcementId,
        tagId: id,
    } ) );

    // Delete all tags
    await table.announcementTag.destroy( {
        where: { announcementId, },
    } );

    // Create tags
    const data = await table.announcementTag.bulkCreate( announcementTagData )
    .then(
        announcementTags => announcementTags.map(
            announcementTag => ( {
                announcementId: announcementTag.announcementId,
                tagId:          announcementTag.tagId,
            } )
        )
    );

    table.database.close();

    return data;
};
