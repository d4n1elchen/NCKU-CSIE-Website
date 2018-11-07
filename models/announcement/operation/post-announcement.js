import associations from 'models/announcement/operation/associations.js';
import languageSettings from 'settings/language/config.js';

export default async ( {
    structuredData,
} = {} ) => {
    const table = await associations();

    // Construct i18n data
    const announcementI18n = [];
    languageSettings.support.forEach( ( lang ) => {
        if ( !( lang in structuredData ) )
            throw new Error( `Missing language for announcementI18n: ${ lang }` );
        else {
            announcementI18n.push( {
                language: lang,
                title:    structuredData[ lang ].title,
                content:  structuredData[ lang ].content,
            } );
        }
    } );

    // Construct announcementData object
    const announcementData = {
        announcementI18n,
    };

    if ( 'author' in structuredData )
        announcementData.author = structuredData.author;

    if ( 'isPinned' in structuredData )
        announcementData.isPinned = structuredData.isPinned;

    if ( 'isPublished' in structuredData )
        announcementData.isPublished = structuredData.isPublished;

    // Translate tags from array to object array
    if ( 'tags' in structuredData ) {
        announcementData.announcementTag = structuredData.tags.map( tag => ( {
            tagId: tag,
        } ) );
    }
    else
        announcementData.announcementTag = [];


    // eslint-disable-next-line no-console
    console.info( announcementData );

    const data = await table.announcement.create( announcementData, {
        include: [ {
            model: table.announcementI18n,
            as:    'announcementI18n',
        },
        {
            model:   table.announcementFile,
            as:      'announcementFile',
            include: [ {
                model: table.announcementFileI18n,
                as:    'announcementFileI18n',
            }, ],
        },
        {
            model: table.announcementTag,
            as:    'announcementTag',
        }, ],
    } )
    .then(
        announcement => ( {
            id: announcement.announcementId,
        } )
    );

    table.database.close();

    return data;
};
