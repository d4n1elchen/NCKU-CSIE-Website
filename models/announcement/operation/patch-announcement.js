import associations from 'models/announcement/operation/associations.js';
import languageSettings from 'settings/language/config.js';

export default async ( { announcementId, structuredData, } = {} ) => {
    const table = await associations();

    // Initialize result object
    const result = {};
    result.i18n = {};
    result.i18n.affectedCount = {};

    // Update i18n
    languageSettings.support.forEach( async ( lang ) => {
        if ( lang in structuredData ) {
            const i18nData = {
                title:    structuredData[ lang ].title,
                content:  structuredData[ lang ].content,
            };
            result.i18n.affectedCount[ lang ] = await table.announcementI18n.update( i18nData, {
                where: {
                    language: lang,
                    announcementId,
                },
            } );
        }
    } );

    // Construct announcement data
    const announcementData = {};

    if ( 'author' in structuredData )
        announcementData.author = structuredData.author;

    if ( 'isPinned' in structuredData )
        announcementData.isPinned = structuredData.isPinned;

    if ( 'isPublished' in structuredData )
        announcementData.isPublished = structuredData.isPublished;

    result.affectedCount = await table.announcement.update( structuredData, {
        include: [
            {
                model:      table.announcementI18n,
                as:         'announcementI18n',
            },
        ],
        where: {
            announcementId,
        },
    } );

    // Update tags if exist
    if ( 'tags' in structuredData ) {
        // Construct tag data
        const announcementTagData = structuredData.tags.map( id => ( {
            announcementId,
            tagId: id,
        } ) );

        // Delete all tags
        await table.announcementTag.destroy( {
            where: { announcementId, },
        } );

        // Create tags
        result.announcementTag = await table.announcementTag.bulkCreate( announcementTagData )
        .then(
            announcementTags => announcementTags.map(
                announcementTag => announcementTag.tagId
            )
        );
    }

    table.database.close();

    return result;
};
