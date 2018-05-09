// router for /about
const express = require( 'express' );
const teacherOp = require( '../models/teacher/operation/teacher_operation' );
const router = new express.Router();

// resolve URL about/intro
router.get( '/intro', function ( req, res ) {
    res.render( 'about/intro' );
} );

// resolve URL about/teachers
router.get( '/teachers', async function ( req, res ) {
    const t = await teacherOp.getTeacherProfile();
        res.render( 'about/teachers', {
            teachers: t,
        } ); 

} );

// deal with URLs to teachers pages
router.get( '/teacher/:id', function ( req, res ) {

    /* table.teachers.findOne( {
        where: {
            ID: req.params.id,
        },
        raw: true,
    } )
    .then( teacher => {
        res.send( teacher );
    } );*/
    res.render( 'about/teacher', {
        profileInfo:
        {
            cName: '高宏宇',
            cTitleName: [ '教授', '系主任', '醫資所所長', ],
            dept: '資訊系 / 資訊所 / 醫資所',
            lab: '智慧型知識管理實驗室',
            locate: ' (資訊系館新大樓9F 65903)',
            specialty: '資訊檢索',
            mail: 'hykao@mail.ncku.edu.tw',
            phone: '06-2757575#62546',
            web: 'http://myweb.ncku.edu.tw/~hykao/',
            education: [
                '台灣 \ 國立台灣大學 \ 電機工程 \ 博士(1999 ~ 2003)',
                '台灣 \ 國立清華大學 \ 資訊科學 \ 碩士(1994 ~ 1996)',
                '台灣 \ 國立清華大學 \ 資訊科學 \ 學士(1989 ~ 1994)', ],
            experience: [
                '國立成功大學 \ 資訊工程系 \ 教授 (2014 ~ now)',
                '國立成功大學 \ 資訊工程系 \ 副教授 (2011 ~ 2014)',
                '國立成功大學 \ 資訊工程系 \ 助理教授 (2004 ~ 2011)',
                '中央研究院 \ 資訊科學所 \ 博士後研究員 (2003 ~ 2004)',
                '中央研究院 \ 資訊科學所 \ 研究助理 (1996 ~ 2003)', ],
            award: [
                '國立成功大學電資學院輔導優良導師, 2014',
                '台灣綜合大學系統年輕學者創新競賽佳作獎, 2014',
                '國立成功大學教學傑出教師, 2011',
                'Reseach Grant of Intel...',
                'Biographical Listings ...',
                'Research Grant of Inte...',
                'Biographical Listings ...',
                '龍騰論文獎, 2003', ],
            refereedPaper: [
                '1. Y.-T. Tang, H.-Y. K...',
                '2. C.-H. Wei, H.-Y. Ka...',
                '3. C.-H. Wei, H.-Y. Ka...', ],
            conferencePaper: [
                '1. Y.-F. Lin and H.-Y....',
                '2. L.-C. Lai and H.-Y....',
                '3. C.-H. Wei, H.-Y. Ka...', ],
            student: [
                '蔡毓娟(博3)', '湯鎰聰(博2)', '林致祿(博2)', '魏至軒(博1)',
            ],
        },
    } );
} );

// resolve URL about/members
router.get( '/members', function ( req, res ) {
    res.render( 'about/members' );
} );

// resolve URL about/honor
router.get( '/honor', function ( req, res ) {
    res.render( 'about/honor' );
} );

// resolve URL about/location
router.get( '/location', function ( req, res ) {
    res.render( 'about/location' );
} );

module.exports = router;
